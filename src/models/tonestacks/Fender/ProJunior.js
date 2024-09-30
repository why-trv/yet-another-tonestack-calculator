import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class ProJunior extends BaseTonestack {
  static definition() {
    return {
      id: 'fpjr',
      name: 'Pro Junior',
      components: {
        RIN: 38e3,
        RT: 250e3,
        RV: 250e3,
        R1: 56e3,
        R2: 470e3,
        R3: 100,
        RL: 1e6,
        C1: 10e-9,
        C2: 22e-12,
        C3: 10e-9,
        C4: 3.3e-9
      },
      controls: {
        RT: Tapers.LogA,
        RV: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, R3, RL, C1, C2, C3, C4,
      RT: [RT2, RT1],
      RV: [RV2, RV1],
    } = this.processComponentValues(controlValues);

    // Transfer function coefficients
    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 2163 (*, +, -)
    // Optimized operations: 191 (11.32x less)
    const t0 = R3 + RL;
    const t1 = RV2*t0;
    const t2 = RT1*t1;
    const t3 = RV2 + t0;
    const t4 = RV1*(RT1*t3 + t1) + t2;
    const t5 = R1*t4;
    const t6 = RT1 + RV1;
    const t7 = R1*t3;
    const t8 = C2*R2;
    const t9 = C1*t8;
    const t10 = C4*t9;
    const t11 = R1*RIN;
    const t12 = RV1*t0;
    const t13 = RIN*t12;
    const t14 = RIN + RV1;
    const t15 = RT2*t0;
    const t16 = RV1 + t0;
    const t17 = C1*RIN;
    const t18 = C1 + C2;
    const t19 = R2*t18;
    const t20 = t17 + t19;
    const t21 = C4*RT2;
    const t22 = RT1 + RV2;
    const t23 = RT1*t20;
    const t24 = RT2*RV2;
    const t25 = RT2 + RV2;
    const t26 = RV1*t17;
    const t27 = C1*RV1;
    const t28 = t20 + t27;
    const t29 = C3*RV1;
    const t30 = R1*t1*t29;
    const t31 = RV2*t16 + t12;
    const t32 = R1*t31;
    const t33 = C4*t32;
    const t34 = R1*RL;
    const t35 = t29*(R1*R3 + RV2*(R1 + t0) + t34);
    const t36 = t33 + t35;
    const t37 = C1*t32;
    const t38 = t31 + t7;
    const t39 = C3*RT1;
    const t40 = t17*t38;
    const t41 = R1 + RV1;
    const t42 = C3*t6;
    const t43 = t21 + t8;
    const t44 = C1*RV2*t34;

    const denXRe = C3*t10*(RIN*(RT2*(t4 + t6*t7) + t5) + RT2*t5);
    const denAIm = C3*(R1*(C4*(RV1*t19*(R3*t25 + RL*t25 + t24) + RV2*(R3*t26 + RL*(C1*(RT1*RT2 + RV1*(RIN + RT2)) + t23) + RT2*(RT1*(C1*R3 + t28) + t27*(R3 + RIN)) + t23*(R3 + RV1)) + t12*t23 + t15*(RT1*t28 + t26)) + t9*(RT1*t0*t14 + RV2*(R3*RT1 + RT1*(RL + t14) + RV1*(RIN + t0)) + t13)) + (RV1*(R3*t22 + RL*t22 + RT1*RV2) + t2)*(t17*t8 + t20*t21)) + t10*(R1*t14*t15 + RT2*t13 + RV2*(RT2*(t11 + t16*(R1 + RIN)) + t11*t16) + t11*t12);
    const denBRe = C1*(RIN*t36 + t30) + C4*t30 + R2*(C2*(t33 + t40) + t18*t35 + t37*(C2 + C4)) + t21*(t20*t38 + t35 + t37) + t39*(t33 + t37 + t38*(t20 + t21));
    const denCIm = t36 + t37 + t38*(t19 + t21 + t39) + t40;
    const denDRe = R3*(RV2 + t41) + RL*t41 + RV2*(RL + t41);
    const numXRe = t10*t24*t34*t42;
    const numAIm = t44*(t21*t8 + t42*t43);
    const numBRe = t44*(t42 + t43);
    const numCIm = t44;
    const numDRe = 0;

return [
      [numDRe, numCIm, numBRe, numAIm, numXRe],
      [denDRe, denCIm, denBRe, denAIm, denXRe]
    ];
  }
}