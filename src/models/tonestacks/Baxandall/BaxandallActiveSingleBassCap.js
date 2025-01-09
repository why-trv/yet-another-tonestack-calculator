import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class BaxandallActiveSingleBassCap extends BaseTonestack {
  static definition() {
    return {
      id: 'bxa1',
      name: 'Baxandall Active Single Bass Cap',
      components: {
        RIN: 600,
        RB: 100e3,
        RT: 100e3,
        RF: 600,
        R1: 22e3,
        R2: 22e3,
        R3: 22e3,
        R4: 10e3,
        R5: 10e3,
        CB: 47e-9,
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
      RIN, R1, R2, R3, R4, R5, RF, CB, CT, RT2, RT1, RB2, RB1
    } = this.extractCoefficientVariables(controlValues);

    RT2 += R5;
    RT1 += R4;

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 695 (*, +, -)
    // Optimized operations: 108 (6.44x less)
    const t0 = R2 + RT2;
    const t1 = R1 + RIN;
    const t2 = RT1*t1;
    const t3 = t0*(R1*RIN + t2);
    const t4 = R1 + R2;
    const t5 = RIN + t4;
    const t6 = RIN*RT2 + RIN*t4 + RT1*t5;
    const t7 = RB1 + RB2;
    const t8 = R3*t7;
    const t9 = CB*CT;
    const t10 = R1 + RB1;
    const t11 = RB1 + t1;
    const t12 = RT2 + t4;
    const t13 = CB*t7;
    const t14 = RT1 + RT2;
    const t15 = t4 + t7;
    const t16 = R1 + RT1;
    const t17 = RF*t16;
    const t18 = RB2*t17;
    const t19 = R2*RF;
    const t20 = RF + t4;
    const t21 = R2 + RF;
    const t22 = RB2 + t21;

    const denAIm = 0;
    const denBRe = -t9*(RB1*(RB2*t6 + t3) + RB2*t3 + t6*t8);
    const denCIm = -CT*R3*(RIN*(t12 + t7) + RT1*(t5 + t7)) - CT*(RB2 + t0)*(RIN*t10 + RT1*t11) - t13*(R1*RT2 + RIN*t12 + t2);
    const denDRe = -RIN*t15 - t11*t14;
    const numAIm = 0;
    const numBRe = t9*(R2*(RF + RT2)*(RB1*(RB2 + t16) + RB2*t16) + RB1*t18 + RT2*(RB1*(RB2*(R1 + RF) + t17) + t18) + t8*(RT2*t20 + t17 + t19));
    const numCIm = CT*(R3*(RF*(RT1 + t15) + RT2*(t20 + t7)) + (RT1 + t10)*(RB2*RF + RT2*t22 + t19)) + t13*(R1*RF + t14*t21 + t19);
    const numDRe = RF*t15 + t14*t22;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}