import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class JamesActiveSingleBassCap extends BaseTonestack {
  static definition() {
    return {
      id: 'jsa1',
      name: 'James Active Single Bass Cap',
      components: {
        RIN: 600,
        R1: 2200,
        R2: 2200,
        R3: 2200,
        RB: 10e3,
        RT: 10e3,
        RF: 600,
        CB: 220e-9,
        CT1: 10e-9,
        CT2: 10e-9
      },
      controls: {
        RB: Tapers.Linear,
        RT: Tapers.Linear
      },
      magnitudePlotRange: [-24, 24]
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, R3, RF, CB, CT1, CT2,
      RT: [RT2, RT1],
      RB: [RB2, RB1]
    } = this.processComponentValues(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 1078 (*, +, -)
    // Optimized operations: 194 (5.56x less)
    const t0 = R2 + RT2;
    const t1 = R1 + RIN;
    const t2 = RT1*t1;
    const t3 = R1 + R2;
    const t4 = R1 + RT2;
    const t5 = R2 + t4;
    const t6 = RB1 + RB2;
    const t7 = R3*t6;
    const t8 = R1 + RT1;
    const t9 = CT1*CT2;
    const t10 = CB*t9;
    const t11 = R1 + RB1;
    const t12 = RB2 + t0;
    const t13 = RIN*t12;
    const t14 = RB2 + RT2;
    const t15 = R2 + t1;
    const t16 = t15 + t6;
    const t17 = RB1*RB2;
    const t18 = RB1 + t1;
    const t19 = CT1*RT1;
    const t20 = CB*t6;
    const t21 = R2*RT2 + RF*t0;
    const t22 = R2*RF;
    const t23 = RF + t3;
    const t24 = R2 + RF;
    const t25 = R3*RB1;
    const t26 = R3 + RB1;
    const t27 = t26 + t8;
    const t28 = R3 + RB2;
    const t29 = R1*t28;
    const t30 = RF + RT2;
    const t31 = CB*RB1 + CB*RB2 + CT1*t27;
    const t32 = CB + CT1;
    const t33 = RB2 + t24;

    const denXRe = 0;
    const denAIm = -t10*(RB1*t0*(R1*RIN + t2) + RB2*(RB1*(R2*(RIN + RT1) + RIN*t4 + t2) + t0*(R1*RT1 + RIN*t8)) + t7*(RIN*(RT1 + t5) + RT1*t3));
    const denBRe = CB*(-CT1*(RIN*t7 + RIN*(R1*t6 + t17) + t2*t6) + CT2*(-RB1*t13 + RB1*(-R1*t14 + R2*(-R1 - RB2)) - RB2*t0*t1 - t15*t7)) - t9*(R3*RIN*(t5 + t6) + RT1*(R1*R2 + R1*t14 + R3*t16 + t12*(RB1 + RIN)) + t11*t13);
    const denCIm = -CT1*RIN*(R3 + t11) + CT2*(-R3*t16 - t12*t18) - t1*t20 - t18*t19;
    const denDRe = -t18;
    const numXRe = 0;
    const numAIm = t10*(RB1*(RB2*RF*(R2 + t8) + RT2*(R1*RB2 + t24*(RB2 + t8)) + t22*t8) + RB2*t21*t8 + t7*(RF*t8 + RT2*t23 + t22));
    const numBRe = CB*CT1*(R1*(RB2*t26 + t25) + t24*(RB1*(R3 + t8) + RB2*t27)) + CT2*(CT1*RT2*(RB2*(RT1 + t26) + t25 + t29) + R2*t30*t31 + RF*(CT1*t29 + RT2*t31 + t17*t32 + t19*t28 + t32*t7));
    const numCIm = CT1*R3*(t23 + t6) + CT1*t33*(RB1 + t8) + CT2*(R3*RF + RB2*t30 + t21) + t20*t24;
    const numDRe = t33;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}