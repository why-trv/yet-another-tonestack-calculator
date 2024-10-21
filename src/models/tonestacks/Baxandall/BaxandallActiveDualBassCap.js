import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class BaxandallActiveDualBassCap extends BaseTonestack {
  static definition() {
    return {
      id: 'bxa2',
      name: 'Baxandall Active Dual Bass Cap',
      components: {
        RIN: 600,
        R1: 22e3,
        R2: 22e3,
        R3: 22e3,
        R4: 10e3,
        R5: 10e3,
        RB: 100e3,
        RT: 100e3,
        RF: 600,
        CB1: 47e-9,
        CB2: 47e-9,
        CT: 560e-12,
      },
      controls: {
        RB: Tapers.Linear,
        RT: Tapers.Linear
      },
      magnitudePlotRange: [-24, 24]
    };
  }

  calculateCoefficients(controlValues) {
    let {
      RIN, R1, R2, R3, R4, R5, RF, CB1, CB2, CT, RT2, RT1, RB2, RB1
    } = this.extractCoefficientVariables(controlValues);

    RT2 += R5;
    RT1 += R4;

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 1051 (*, +, -)
    // Optimized operations: 179 (5.87x less)
    const t0 = R2 + RT2;
    const t1 = R1*RIN;
    const t2 = R1 + RIN;
    const t3 = CB1*RB1;
    const t4 = CB2*RB2;
    const t5 = CT*t4;
    const t6 = t3*t5;
    const t7 = RIN*RT1;
    const t8 = R3 + t0;
    const t9 = RIN + RT1;
    const t10 = R1*t9;
    const t11 = R2*t9;
    const t12 = RT1 + RT2;
    const t13 = RB2 + t0;
    const t14 = RB2*RIN;
    const t15 = R1 + R2;
    const t16 = RB2 + t15;
    const t17 = RB1 + t2;
    const t18 = R1 + RT1;
    const t19 = RB1 + t18;
    const t20 = RB1 + t16;
    const t21 = R2*RT2;
    const t22 = R3 + t18;
    const t23 = RF + RT2;
    const t24 = R2*t23;
    const t25 = R1*RT2;
    const t26 = RF*(R1 + t12);
    const t27 = RB1*t23;
    const t28 = R1 + RB1;
    const t29 = R2*t12;
    const t30 = RB2*RT2;
    const t31 = RF*(t13 + t18);
    const t32 = t21 + t30;

    const denXRe = 0;
    const denAIm = -t6*(R3*(RIN*(R1 + t0) + RT1*(R2 + t2)) + t0*(RT1*t2 + t1));
    const denBRe = -t3*(CT*(R3*(RIN*RT2 + RT1*(RB2 + RIN) + t11 + t14) + t10*(R3 + t13) + t13*t7) + t4*(R2*RIN + t1 + t12*t2)) - t5*(R3*(RIN*t12 + t11) + RB1*t8*t9 + t0*t7 + t10*t8);
    const denCIm = -CB2*t14*(RB1 + t15) + CT*(R3*(RIN*(-t13 - t19) - RT1*t20) - t13*(R1*RT1 + RB1*RT1 + RIN*t19)) - RIN*t16*t3 - t12*(t17*t4 + t2*t3);
    const denDRe = -RIN*t20 - t12*t17;
    const numXRe = 0;
    const numAIm = t6*(R3*(RF*(t0 + t18) + RT2*t15) + t18*(RF*t0 + t21));
    const numBRe = CT*t3*(R3*(t25 + t26) + RF*RT2*t18 + t22*t24) + RB2*(CB1*CT*t22*t27 + CB2*(CT*(R3*RT2*t28 + RF*(R3*(t12 + t28) + RT2*t19) + t24*(R3 + t19)) + t3*(R2*(RF + t12) + t26)));
    const numCIm = CT*(R3*(t25 + t27 + t31 + t32) + t19*(RF*t13 + t32)) + t3*(RB2*RT1 + t29 + t30 + t31) + t4*(RF*(t0 + t19) + t29);
    const numDRe = RF*t20 + t12*(R2 + RB2 + RF);

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}