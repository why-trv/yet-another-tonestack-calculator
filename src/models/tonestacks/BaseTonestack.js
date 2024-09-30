import { areApproximatelyEqual, deepFreeze } from '~/utils/js'
import { generateFrequencies } from '~/utils/utils'
import { parseComponentValue, getComponentLetter, getComponentSubscript } from '~/utils/components';

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
    this.schematicFilename = def.schematicFilename || this.name.toLowerCase().replace(/[\s./]+/g, '');
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
    const cv = {};
    for (const name in def.controls) {
      const v = def.controls[name];
      controls[name] = v.taper || v; // Can be an object including taper or plain taper
      cv[name] = v.default || 0.5; // Default can be part of the object, otherwise 0.5
      // NB: v.default of 0 is not really supported at the moment (YAGNI)
    }
    this.controls = controls;
    this.controlValues = cv;
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

  hasDefaultComponentValue(name) {
    return areApproximatelyEqual(this.components[name], this.defaultComponents[name]);
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
      res[name] = splitPotValue(this.components[name], c[name]);
    }

    return res;
  }

  // Groups the output of splitTaperedControlValues() and 'constant' component 
  // values in a single object to be neatly desctructured like this:
  // const {
  //   RIN, R1, RL, C1, C2, C3,
  //   RT: [RT2, RT1],
  //   RB: [RB]
  // } = this.extractValues(controlValues);
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

  resetToDefaultComponents() {
    Object.assign(this.components, this.defaultComponents);
  }

  // @param response is the object to put the response into. If null, a new one
  // will be created. Presumably this allows us to avoid reallocating the 2D arrays
  calculateResponse(controlValues = null, response = null) {
    return this.calculateBode(this.calculateCoefficients(controlValues || this.controlValues), response);
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
  calculateBode(coeffs, response = null) {
    function sumCoeffs(coeffs, w) {
      // Each term is multiplied by s=jw in increasing powers of s.
      // Even powers of s are real, while odd powers are imaginary.
      let sumRe = 0;
      let sumIm = 0;
      let multip = 1;
      coeffs.forEach((value, k) => {
        if (k % 2 != 0) {
          sumIm += multip * value;
          multip *= -w;
        } else {
          sumRe += multip * value;
          multip *= w;
        }
      });

      return {
        re: sumRe,
        im: sumIm,
      };
    }

    // let dBMin = Number.MAX_VALUE;
    // let dBMax = Number.MIN_VALUE;
    // let degMin = Number.MAX_VALUE;
    // let degMax = Number.MIN_VALUE;
    let previousDegPositive = true;

    // Determine the number of frequencies to use for calculation.
    let n = graphFrequencies.length;

    // Preallocate array for n pairs of [freq, value]
    const createArray = () => {
      let array = new Array(n);
      for (let j = 0; j < n; j++) {
        array[j] = new Array(2);
      }
      return array;
    };

    // Preallocate arrays
    if (response) {
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
      const freq = graphFrequencies[j];
      const w = 2 * Math.PI * freq;

      // Sum the real and imaginary parts of the numerator and denominator.
      const sumNum = sumCoeffs(coeffs[0], w);
      const sumDen = sumCoeffs(coeffs[1], w);

      // Rearrange the expression so that all imaginary terms are in the
      // numerator. This can be accomplished by multiplying the numerator
      // and denominator by the denominator's complex conjugate.
      //     A + jB     C - jD     (AC + BD) + j(BC - AD)
      //     ------  *  ------  =  ----------------------
      //     C + jD     C - jD           C*C + D*D
      const numeratorRe = sumNum.re * sumDen.re + sumNum.im * sumDen.im;
      const numeratorIm = sumNum.im * sumDen.re - sumNum.re * sumDen.im;
      const denominator = sumDen.re ** 2 + sumDen.im ** 2;

      // Get the magnitude and phase. The numerator is a phasor and the
      // denominator is real and positive. The magnitude may be found by
      // using the Pythagorean theorem on the phasor, then scaling by a
      // factor of 1/denominator. The scale factor is irrelevant to phase,
      // which may be found by figuring the inverse tangent of the phasor.
      const magnitude = Math.sqrt(numeratorRe ** 2 + numeratorIm ** 2) / denominator;
      const phase = Math.atan2(numeratorIm, numeratorRe);

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
}