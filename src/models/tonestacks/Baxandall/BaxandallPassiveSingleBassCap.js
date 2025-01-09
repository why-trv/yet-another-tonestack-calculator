import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class BaxandallPassiveSingleBassCap extends BaseTonestack {
  static definition() {
    return {
      id: 'bxp1',
      name: 'Baxandall Passive Single Bass Cap',
      components: {
        RIN: 600,
        RL: 100e3,
        RB: 10e3,
        RT: 10e3,
        R1: 2.2e3,
        R2: 2.2e3,
        R3: 2.2e3,
        R4: 1e3,
        R5: 1e3,
        CB: 220e-9,
        CT: 10e-9,
      },
      controls: {
        RB: Tapers.Linear,
        RT: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    let {
      RIN, R1, R2, R3, R4, R5, RL, CB, CT, RT2, RT1, RB2, RB1
    } = this.extractCoefficientVariables(controlValues);

    RT2 += R5;
    RT1 += R4;

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 1225 (*, +, -)
    // Optimized operations: 168 (7.29x less)
    const t0 = R1*RB2;
    const t1 = RT2*t0;
    const t2 = RL*t1;
    const t3 = R1*RT2;
    const t4 = R1 + RT2;
    const t5 = RL*t4 + t3;
    const t6 = RB1 + RB2;
    const t7 = R3*t6;
    const t8 = RIN*RT2;
    const t9 = R1 + RB2;
    const t10 = RT2*t9;
    const t11 = R1 + RIN;
    const t12 = RB2*RT2;
    const t13 = t6*(RL + RT2);
    const t14 = R3*t13;
    const t15 = CB*CT;
    const t16 = R2 + RB2;
    const t17 = R1 + RB1;
    const t18 = R1 + R2;
    const t19 = RL*t18;
    const t20 = R3*t18;
    const t21 = R2*RB2;
    const t22 = RB1*t16;
    const t23 = t21 + t22;
    const t24 = R1*t23;
    const t25 = RT1 + RT2;
    const t26 = CB*t25;
    const t27 = R2 + RT1 + t4;
    const t28 = RB1 + t11;
    const t29 = RT2*t16;
    const t30 = R2 + RB1 + t9;
    const t31 = RIN*t30;
    const t32 = RIN + t30;
    const t33 = t25*t32 + t31;
    const t34 = RL*t33;
    const t35 = RIN*t16;
    const t36 = t17*t35;
    const t37 = t16*t25;
    const t38 = R2*(R1 + RT1);

    const denAIm = 0;
    const denBRe = t15*(R2*(RL*(RIN + RT2) + t8)*(R3*RB2 + RB1*(R3 + t9) + t0) + RB1*t2 + RIN*(RB1*(RL*(t0 + t10) + t1) + t2) + RT1*(R2*(RB1*(RL*(RT2 + t9) + t10) + RB2*t5 + RIN*t13 + t14) + t11*(RB1*(RL*(RB2 + RT2) + t12) + RL*t12 + t14)) + t7*(RIN*t5 + RL*t3));
    const denCIm = CB*RIN*(RB1*t21 + RL*t27*t6 + RT1*t23 + RT2*t23 + t24 + t27*t7) + CT*t16*t17*t8 + CT*(R3*(RT2*(RT1*t32 + t31) + t34) + RL*(RT1*(R1*t16 + RT2*t32 + t22 + t35) + RT2*t17*(RIN + t16) + t36) + RT1*t28*t29) + t26*(RB1*t19 + RB2*(R2*RB1 + t19) + t20*t6 + t24);
    const denDRe = R3*t33 + t28*t37 + t34 + t36;
    const numAIm = 0;
    const numBRe = RL*RT2*t15*(RB1*(t18*(R3 + RB2) + t38) + RB2*(t20 + t38));
    const numCIm = RL*(CT*R3*RT2*t30 + CT*t29*(RT1 + t17) + R2*t26*t6);
    const numDRe = RL*t37;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}