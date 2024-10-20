import { areApproximatelyEqual, deepFreeze, preallocate2DArray } from '~/utils/js'
import { generateFrequencies } from '~/utils/utils'
import { parseComponentValue, getComponentLetter, getComponentSubscript } from '~/utils/components';
import FFT from 'fft.js';

const graphFrequencies = generateFrequencies(10, 1e5, 0.05);

export class BaseTonestack {
  static definition() {
    throw new Error('definition() must be implemented in derived classes');
  }

  constructor() {
    const def = this.constructor.definition();

    if (!def) {
      throw new Error('Derived classes must implement static definition() method');
    }

    this.id = def.id;
    this.name = def.name;
    this.description = def.description;
    this.gainOffset = 0;
    this.visible = true;
    this.magnitudePlotRange = def.magnitudePlotRange || [-48, 0];
    // By default, use class name as the schematic filename
    this.schematic = def.schematic || this.name.replace(/[\s./]+/g, '');
    this.getNotesComponent = def.getNotesComponent || (() => false);

    // Components
    let components = def.components;
    for (const name in components) {
      components[name] = parseComponentValue(components[name], name);
    }
    this.defaultComponents = deepFreeze(components);
    this.components = {};
    Object.assign(this.components, this.defaultComponents);

    // Controls and control values
    const controls = {};
    const options = {};
    const cv = {};
    for (const name in def.controls) {
      const v = def.controls[name];
      controls[name] = v.taper || v; // Can be an object including taper or plain taper
      options[name] = {
        role: v.role || PotRole.Pot,
        reverse: v.reverse || false
      };
      cv[name] = v.default || 0.5; // Default can be part of the object, otherwise 0.5
      // NB: v.default of 0 is not really supported at the moment (YAGNI)
    }
    this.controls = controls;
    this.controlOptions = options;
    this.controlValues = cv;
  }

  newInstance() {
    return new this.constructor();
  }

  clone() {
    const clone = new this.constructor();
    Object.assign(clone, this);
    
    clone.components = {};
    Object.assign(clone.components, this.components);

    clone.controls = {};
    Object.assign(clone.controls, this.controls);

    clone.controlValues = {};
    Object.assign(clone.controlValues, this.controlValues);

    return clone;
  }

  get displayLabel() {
    // label if it's set, name otherwise
    return this.label || this.name;
  }

  getComponentDisplayLetter(name) {
    return getComponentLetter(name);
  }

  getComponentDisplaySubscript(name) {
    return getComponentSubscript(name);
  }

  setComponentValue(name, value) {
    this.components[name] = parseComponentValue(value || this.defaultComponents[name], name);
  }

  hasDefaultComponentValue(name) {
    return areApproximatelyEqual(this.components[name], this.defaultComponents[name]);
  }

  isControl(name) {
    return this.controls.hasOwnProperty(name);
  }

  // Get control values with applied potentiometer tapers
  getControlTaperedValues(controlValues) {
    let res = {};

    for (const name in this.controls) {
      res[name] = this.controls[name].positionToValue(controlValues[name]);
    }

    return res;
  }

  // Get potentiometer values split in two parts according to tapers and
  // passed @param controlValues. Can be destructured like this:
  // const {
  //   RT: [RT2, RT1],
  //   RB: [RB2, RB1]
  // } = this.splitTaperedControlValues(controlValues);
  //
  splitTaperedControlValues(controlValues) {
    const c = this.getControlTaperedValues(controlValues);

    const res = {};
    for (const name in c) {
      const splitValues = splitPotValue(this.components[name], c[name]);
      if (this.controlOptions[name].reverse) {
        splitValues.reverse();
      }
      res[name] = splitValues;
    }

    return res;
  }

  // Groups the output of splitTaperedControlValues() and 'constant' component
  // values in a single object to be neatly desctructured like this:
  // const {
  //   RIN, R1, RL, C1, C2, C3,
  //   RT: [RT2, RT1],
  //   RB: [RB]
  // } = this.processComponentValues(controlValues);
  //
  processComponentValues(controlValues) {
    const res = this.splitTaperedControlValues(controlValues);

    for (const name in this.components) {
      if (!res.hasOwnProperty(name)) {
        res[name] = this.components[name];
      }
    }

    return res;
  }

  // Extracts coefficient variables, adding <name>2 and <name>1 props for split controls
  // Can be neatly destructured like this:
  // const {
  //   RIN, R1, RL, C1, C2, C3,
  //   RT2, RT1, RT,
  //   RB2, RB1, RB
  // } = this.extractCoefficientVariables(controlValues);
  //
  extractCoefficientVariables(controlValues) {
    const res = {};
    const splitValues = this.splitTaperedControlValues(controlValues);

    for (const name in this.components) {
      if (splitValues.hasOwnProperty(name)) {
        const [value2, value1] = splitValues[name];
        res[`${name}2`] = value2;
        res[`${name}1`] = value1;
        res[name] = value2; // Redundant property with the same value as <name>2
      } else {
        res[name] = this.components[name];
      }
    }

    return res;
  }

  resetToDefaultComponents() {
    Object.assign(this.components, this.defaultComponents);
  }

  // @param response is the object to put the response into. If null, a new one
  // will be created. Presumably this allows us to avoid reallocating the 2D arrays
  calculateResponse(options = {}, controlValues = null, response = null) {
    const coeffs = this.calculateCoefficients(controlValues || this.controlValues)

    if (!response) {
      response = {};
    }

    if (options.magnitude === true || options.phase === true) {
      response = this.calculateBode(coeffs, response);
    }

    if (options.scope === true) {
      // TODO: Perhaps there's a better way to determine when to use Fourier vs. ODE
      // than checking the order of the denominator?
      const useFourier = coeffs[1].length > 5; 
      response = useFourier ? this.calculateSquareWaveResponseFourier(coeffs, options.scopeFrequency, response)
                            : this.calculateSquareWaveResponseStateSpace(coeffs, options.scopeFrequency, response);
    }

    return response;
  }

  // Given the coefficients (@param coeffs) of an LTI transfer function H(s), this function calculates
  // the magnitude and phase of H(jw), where w is the angular frequency (2*pi*f).
  // The results are written to @param response or a new objects if it's not provided.
  // @param coefs should be passed as an array of two arrays, e.g.
  // [[a0, a1, a2, a3, ...], [b0, b1, b2, b3, ...]],
  // where a* are numerator coefficients, and b* - denominator coefficients, thus
  // H(s) = (a0 + a1*s + a2*s^2 + a3*s^3 + ...) / (b0 + b1*s + b2*s^2 + b3*s^3 + ...)
  //
  // (Taken from https://github.com/jatalahd/tsc with some modifications)
  calculateBode(coeffs, response = null, frequencies = graphFrequencies) {
    // let dBMin = Number.MAX_VALUE;
    // let dBMax = Number.MIN_VALUE;
    // let degMin = Number.MAX_VALUE;
    // let degMax = Number.MIN_VALUE;
    let previousDegPositive = true;

    // Determine the number of frequencies to use for calculation.
    let n = frequencies.length;

    // Preallocate array for n pairs of [freq, value]
    const createArray = () => {
      let array = new Array(n);
      for (let j = 0; j < n; j++) {
        array[j] = new Array(2);
      }
      return array;
    };

    // Preallocate arrays
    if (!response) {
      response = {};
    }
    if (!response.magnitudes) {
      response.magnitudes = createArray();
    }
    if (!response.phases) {
      response.phases = createArray();
    }

    const magnitudes = response.magnitudes;
    const phases = response.phases;

    for (let j = 0; j < n; j++) {
      // Angular frequency w = 2*pi*f
      const freq = frequencies[j];

      const [re, im] = this.calculateComplexResponseAtFrequency(coeffs, freq);

      // Get the magnitude and phase
      const magnitude = Math.sqrt(re ** 2 + im ** 2);
      const phase = Math.atan2(im, re);

      // Record the magnitude in dB.
      // this.gain is an arbitrary offset to aid visual comparison
      const dB = 20 * Math.log10(magnitude) + this.gainOffset;
      // ECharts requires interleaved x and y, so do this right away
      // magnitudes[j] = [freq, dB];
      magnitudes[j][0] = freq;
      magnitudes[j][1] = dB;

      // Record the phase in degrees to the nearest 0.1 degrees. To minimize
      // graphing of vertical lines, for +180 or -180 degrees use the same
      // sign as the previous result.
      let deg = Math.round(phase * 1800 / Math.PI) * 0.1;
      if (Math.abs(deg) === 180) {
        deg = previousDegPositive ? 180 : -180;
      }
      previousDegPositive = (deg > 0);
      // ECharts requires interleaved x and y, so do this right away
      // phases[j] = [freq, deg];
      phases[j][0] = freq;
      phases[j][1] = deg;

      // Track the largest and smallest values in dB and degrees
      // (but we don't need it at this time)
      // if (dB < dBMin) {
      //   dBMin = dB;
      // }
      // if (dB > dBMax) {
      //   dBMax = dB;
      // }
      // if (deg < degMin) {
      //   degMin = deg;
      // }
      // if (deg > degMax) {
      //   degMax = deg;
      // }
    }

    // response.dBMin = dBMin;
    // response.dBMax = dBMax;
    // response.degMin = degMin;
    // response.degMax = degMax;

    return response;
  }

  calculateComplexResponseAtFrequency(coeffs, f) {
    // Angular frequency w = 2*pi*f
    const w = 2 * Math.PI * f;

    // Sum the real and imaginary parts of the numerator and denominator.
    const [sumNumRe, sumNumIm] = this.sumTFCoeffs(coeffs[0], w);
    const [sumDenRe, sumDenIm] = this.sumTFCoeffs(coeffs[1], w);

    // Rearrange the expression so that all imaginary terms are in the
    // numerator. This can be accomplished by multiplying the numerator
    // and denominator by the denominator's complex conjugate.
    //     A + jB     C - jD     (AC + BD) + j(BC - AD)
    //     ------  *  ------  =  ----------------------
    //     C + jD     C - jD           C*C + D*D
    const numeratorRe = sumNumRe * sumDenRe + sumNumIm * sumDenIm;
    const numeratorIm = sumNumIm * sumDenRe - sumNumRe * sumDenIm;
    const denominator = sumDenRe ** 2 + sumDenIm ** 2;

    return [numeratorRe / denominator, numeratorIm / denominator];
  }

  sumTFCoeffs(coeffs, w) {
    // Each term is multiplied by s=jw in increasing powers of s.
    // Even powers of s are real, while odd powers are imaginary.
    let sumRe = 0;
    let sumIm = 0;
    let multip = 1;
    const len = coeffs.length;
    for (let k = 0; k < len; k++) {
      if (k & 1) {  // Odd power
        sumIm += multip * coeffs[k];
        multip *= -w;
      } else {  // Even power
        sumRe += multip * coeffs[k];
        multip *= w;
      }
    }

    return [sumRe, sumIm];
  }

  calculateSquareWaveResponseFourier(coeffs, fundamental = 100, response = null) {
    const fftSize = 16384;
    const numHarmonics = fftSize / 2;
    const numSamples = fftSize;
    const sampleRate = fftSize * fundamental;

    const fft = new FFT(fftSize);
    const frequencyDomain = fft.createComplexArray();

    // Add DC component (average of square wave is 0)
    frequencyDomain[0] = 0;
    frequencyDomain[1] = 0;

    // Fill the FFT array with complex response multiplied by square wave harmonic magnitudes.
    // An ideal square wave has only odd harmonics, so we can skip even harmonics.
    for (let j = 0; j < numHarmonics; j += 2) {
      const harmonic = j + 1;
      // Calculate square wave harmonic magnitude, attenuating higher harmonics to
      // reduce Gibbs phenomenon - this whole thing is only for plotting anyway.
      const sigma = (1 - 0.85 * j / numHarmonics);
      const gain = 4 / (Math.PI * harmonic) * sigma;

      const cpx = this.calculateComplexResponseAtFrequency(coeffs, harmonic * fundamental);
      // There is no point in converting to polar form, then converting back,
      // so apply the square wave harmonic magnitudes directly, as well a phase
      // shift of +90 degrees by multiplying by -j (i.e. -j * (a + bj) = b - aj.
      // The phase shift is to have the square wave start at 1.
      const re = cpx[1] * gain;
      const im = -cpx[0] * gain;

      frequencyDomain[harmonic * 2] = re;
      frequencyDomain[harmonic * 2 + 1] = im;
    }

    // Complete the spectrum for full output
    fft.completeSpectrum(frequencyDomain);

    // Perform IFFT
    const timeDomain = fft.createComplexArray();
    fft.inverseTransform(timeDomain, frequencyDomain);

    // Prepare response array
    if (!response || !response.scope || response.scope.length !== numSamples * 3) {
      response.scope = preallocate2DArray(numSamples * 3, 2);
    }

    const scope = response.scope;
    const repeats = 3;
    const scale = fftSize / 2 * Math.pow(10, this.gainOffset / 20);
    const timeScale = 1000 / sampleRate; // Gonna convert sample count to milliseconds

    // If we want to plot the entire response, uncomment the following
    // for (let k = 0; k < repeats; k++) {
    //   const offset = k * numSamples;
    //   for (let i = 0; i < numSamples; i++) {
    //     scope[i + offset][0] = (i + offset) * timeScale;
    //     scope[i + offset][1] = scale * timeDomain[i * 2]; // Real part of the time domain signal
    //   }
    // }

    // TODO: Decimate points first, then repeat

    // Only keep points near the edges and every 8th point in between, to improve plot performance
    // The result should match the number of points and time values in 
    // calculateSquareWaveResponseStateSpace()
    let scopeIndex = 0;
    for (let k = 0; k < repeats; k++) {
      const offset = k * numSamples;
      const step = 8;

      // Use only every `step` points, to improve plot performance
      for (let i = 0; i < numSamples; i += step) {
        scope[scopeIndex][0] = (i + offset) * timeScale; // Milliseconds
        scope[scopeIndex][1] = scale * timeDomain[i * 2]; // Real part of the time domain signal
        scopeIndex++;
      }

      if ((numSamples - 1) % step !== 0) {
        scope[scopeIndex][0] = (numSamples - 1 + offset) * timeScale; // Milliseconds
        scope[scopeIndex][1] = scale * timeDomain[(numSamples - 1) * 2]; // Real part of the time domain signal
        scopeIndex++;
      }
    }
    // Trim the scope array to the actual number of points used
    scope.length = scopeIndex;

    return response;
  }

  calculateSquareWaveResponseStateSpace(coeffs, fundamental = 100, response = null) {
    function tf2ss(num, den) {
      // Trim trailing zeros in-place      
      while (den.length > 0 && den[den.length - 1] === 0) den.pop();      

      // Pad num with zeros if necessary, to match the denominator, modifying the original array      
      while (num.length < den.length) {
        num.push(0);
      }

      const n = den.length - 1;

      const leadingDenCoeff = den[n];

      // Modify num and den in-place
      for (let i = 0; i < num.length; i++) num[i] /= leadingDenCoeff;
      for (let i = 0; i < den.length; i++) den[i] /= leadingDenCoeff;

      // Pre-allocate arrays
      const A = new Array(n);
      for (let i = 0; i < n; i++) {
        A[i] = new Array(n).fill(0);
        if (i < n - 1) A[i][i + 1] = 1;
      }
      const B = new Array(n).fill(0);
      const C = new Array(n);
      const D = [num[n]];

      for (let i = 0; i < n; i++) {
        A[n - 1][i] = -den[i];
        C[i] = num[i] - num[n] * den[i];
      }
      B[n - 1] = 1;

      return { A, B, C, D };
    }

    // NB: The code is avoiding using map, reduce, etc. to reduce memory allocations.
    function simulate(A, B, C, D, u, t) {
      const n = A.length;
      const m = t.length;
      const X = new Array(n).fill(0);
      const Y = new Array(m);
      const k1 = new Array(n);
      const k2 = new Array(n);
      const k3 = new Array(n);
      const k4 = new Array(n);
      const tempX = new Array(n);

      for (let i = 0; i < m - 1; i++) {
        const dt = t[i + 1] - t[i];

        // Runge-Kutta 4th order method
        computeDerivative(A, B, X, u[i], k1);
        for (let j = 0; j < n; j++) tempX[j] = X[j] + dt/2 * k1[j];
        computeDerivative(A, B, tempX, u[i], k2);
        for (let j = 0; j < n; j++) tempX[j] = X[j] + dt/2 * k2[j];
        computeDerivative(A, B, tempX, u[i], k3);
        for (let j = 0; j < n; j++) tempX[j] = X[j] + dt * k3[j];
        computeDerivative(A, B, tempX, u[i], k4);

        for (let j = 0; j < n; j++) {
          X[j] += dt/6 * (k1[j] + 2*k2[j] + 2*k3[j] + k4[j]);
        }
        Y[i] = computeOutput(C, D, X, u[i]);
      }
      Y[m - 1] = computeOutput(C, D, X, u[m - 1]);

      return Y;
    }

    function computeDerivative(A, B, X, u, result) {
      const n = A.length;
      for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {
          sum += A[i][j] * X[j];
        }
        result[i] = sum + B[i] * u;
      }
    }

    function computeOutput(C, D, X, u) {
      let sum = 0;
      const n = C.length;
      for (let i = 0; i < n; i++) {
        sum += C[i] * X[i];
      }
      return sum + D[0] * u;
    }

    const [num, den] = coeffs;
    const T = 1 / fundamental;
    const numCycles = 4;
    const numCyclesToSkip = 1; // Gonna skip initial cycles so that the system has time to settle
    // Because of echarts quirk (x values should be exactly same for tooltips to work properly),
    // numPointsPerCycle better be a power of 2 and the time values should match the Fourier-based
    // version of this function.
    // (See https://github.com/apache/echarts/issues/15488)
    const numPointsPerCycle = 4096;
    const totalPoints = numPointsPerCycle * numCycles;
    const numPointsToSkip = numPointsPerCycle * numCyclesToSkip;

    // TODO: We don't really have to run simulation for that many cycles, can just take a
    // stable one and repeat it.

    const t = Array.from({ length: totalPoints }, (_, i) => i * (T / numPointsPerCycle));

    const u = t.map(time => {
      const x = fundamental * time;
      return 2 * (2 * Math.floor(x) - Math.floor(2 * x)) + 1;
    });

    const { A, B, C, D } = tf2ss(num, den);
    const y = simulate(A, B, C, D, u, t);

    // Prepare response array
    if (!response || !response.scope || response.scope.length !== totalPoints - numPointsToSkip) {
      response.scope = preallocate2DArray(totalPoints - numPointsToSkip, 2);
    }

    const sToMs = 1000;
    const scope = response.scope;
    const gain = Math.pow(10, this.gainOffset / 20);
    const timeOffset = t[numPointsToSkip] * sToMs;

    // If we want to plot the entire response, uncomment the following
    // for (let i = numPointsToSkip; i < totalPoints; i++) {
    //   scope[i - numPointsToSkip][0] = t[i] * 1000 - timeOffset;
    //   scope[i - numPointsToSkip][1] = y[i] * gain;
    // }

    // Use only every `step` points, to improve plot performance
    const step = 2;
    let scopeIndex = 0;
    for (let i = numPointsToSkip; i < totalPoints; i += step) {
      scope[scopeIndex][0] = t[i] * sToMs - timeOffset; // Milliseconds
      scope[scopeIndex][1] = y[i] * gain;
      scopeIndex++;
    }
    // Add the last point if it hasn't been added yet (not a multiple of `step`)
    if ((totalPoints - 1) % step !== 0) {
      scope[scopeIndex][0] = t[totalPoints - 1] * sToMs - timeOffset; // Milliseconds
      scope[scopeIndex][1] = y[totalPoints - 1] * gain;
      scopeIndex++;
    }

    // Trim the scope array to the actual number of points used
    scope.length = scopeIndex;

    return response;
  }
}