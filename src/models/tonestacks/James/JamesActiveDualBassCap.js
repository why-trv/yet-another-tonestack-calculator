import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class JamesActiveDualBassCap extends BaseTonestack {
  static definition() {
    return {
      id: 'jsa2',
      name: 'James Active Dual Bass Cap',
      components: {
        RIN: 600,
        R1: 2200,
        R2: 2200,
        R3: 2200,
        RB: 10e3,
        RT: 10e3,
        RF: 600,
        CB1: 220e-9,
        CB2: 220e-9,
        CT1: 10e-9,
        CT2: 10e-9,
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
      RIN, R1, R2, R3, RF, CB1, CB2, CT1, CT2, RT2, RT1, RB2, RB1      
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 1584 (*, +, -)
    // Optimized operations: 224 (7.07x less)
    const t0 = R2 + RT2;
    const t1 = R1 + RT1;
    const t2 = R1 + R2;
    const t3 = RT1 + RT2;
    const t4 = CB2*RB2;
    const t5 = CT1*RB1;
    const t6 = CB1*CT2*t5;
    const t7 = t4*t6;
    const t8 = RB2 + t0;
    const t9 = R1 + RIN;
    const t10 = RT1*t9;
    const t11 = R1*RIN + t10;
    const t12 = RIN + t2;
    const t13 = RB2 + t12;
    const t14 = RIN*RT2 + RIN*t2;
    const t15 = R3*(RB2*RIN + RT1*t13 + t14) + t11*t8;
    const t16 = R1 + R3;
    const t17 = CT1*(RIN*t16 + t10);
    const t18 = R2 + R3;
    const t19 = R1*R2 + R3*t2 + RIN*t18 + RT2*t9;
    const t20 = CT2*t19 + t17;
    const t21 = CB1*RB1;
    const t22 = R3 + t0;
    const t23 = RB1*(RIN + RT1);
    const t24 = CT1*CT2;
    const t25 = RB1 + t9;
    const t26 = R3 + t1;
    const t27 = R2 + RF;
    const t28 = RB2 + t27;
    const t29 = RF*(R2 + RB2) + RT2*t28;
    const t30 = R1*RF;
    const t31 = CT1*t1;
    const t32 = R2*RF + RT2*t27;
    const t33 = CT2*t32;
    const t34 = CT1*R1 + CT1*R2 + RF*(CT1 + CT2);
    const t35 = RB1 + t1;
    const t36 = RB1 + t2;
    const t37 = RB1 + RT1;
    const t38 = R3*RB1;
    const t39 = RB2 + t36;
    const t40 = R3 + t37;
    const t41 = RB2 + RF;

    const denXRe = -t7*(R3*(RIN*(t2 + t3) + RT1*t2) + t0*(R1*RT1 + RIN*t1));
    const denAIm = -t15*t6 - t4*(t20*t21 + t24*(R3*(RT1*t12 + t14) + t0*t11 + t22*t23));
    const denBRe = -t21*(CT2*(RB2*(RIN + t16) + t19) + t17 + t4*t9) - t24*(t15 + t23*(RB2 + t22)) - t4*(RB1*(CT1*RIN + CT1*RT1 + CT2*t22) + t20);
    const denCIm = -CT1*(R3*RIN + RIN*(R1 + RB1) + RT1*t25) + CT2*(R3*(-RB1 - t13) - t25*t8) - t21*t9 - t25*t4;
    const denDRe = -t25;
    const numXRe = t7*(RF*(R2*t26 + R3*t1) + RT2*(R1*R3 + t26*t27));
    const numAIm = t4*(t21*(R3*t34 + t27*t31 + t33) + t24*(R3*(RF*(t0 + t37) + RT2*t36 + t30) + t32*t35)) + t6*(R3*(RF*(RT1 + t8) + RT2*(RB2 + t2) + t30) + t1*t29);
    const numBRe = CB1*t38*(CT1*RB2 + t34) + t21*(CT2*t29 + t28*t31) + t24*(R3*(RF*(t3 + t39) + RT2*t39) + t29*t35) + t4*(CT1*t27*t35 + R3*(t34 + t5) + t21*t27 + t33);
    const numCIm = CT1*(R1*(t18 + t41) + R2*t40 + t38 + t40*t41) + CT2*RF*(RB2 + t18) + t27*t4 + t28*(CT2*RT2 + t21);
    const numDRe = t28;

return [
      [numDRe, numCIm, numBRe, numAIm, numXRe],
      [denDRe, denCIm, denBRe, denAIm, denXRe]
    ];
  }
}