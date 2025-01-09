import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class BoneRay extends BaseTonestack {
  static definition() {
    return {
      id: 'bone',
      name: 'Bone Ray',
      components: {
        RIN: 38e3,
        RL: 1e6,
        RM: 1e6,
        RT: 1e6,
        R1: 470e3,
        R2: 470e3,
        C1: 220e-12,
        C2: 1e-9,
        C3: 4.7e-9,
        C4: 4.7e-9
      },
      controls: {
        RM: Tapers.LogB,
        RT: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, RL, C1, C2, C3, C4, RT2, RT1, RM2, RM1
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 2068 (*, +, -)
    // Optimized operations: 275 (7.52x less)
    const t0 = R1*RT2;
    const t1 = RIN*t0;
    const t2 = RL*t1;
    const t3 = R1*R2;
    const t4 = R1 + R2;
    const t5 = RM1*RT2;
    const t6 = RM1 + RT2;
    const t7 = R1 + RT2;
    const t8 = C1*C3;
    const t9 = C2*RM2*t8;
    const t10 = RT1*RT2;
    const t11 = RT1 + RT2;
    const t12 = R2*RT1;
    const t13 = R2 + RT1;
    const t14 = R1*t13;
    const t15 = RT2*(t12 + t14);
    const t16 = R2 + RT2;
    const t17 = RT1 + t16;
    const t18 = R1*t17;
    const t19 = RL*(R2*t11 + t18) + t15;
    const t20 = R1 + RT1;
    const t21 = R2 + RIN;
    const t22 = C3*t21;
    const t23 = C2*t22;
    const t24 = C2 + C3;
    const t25 = RL*t13 + t12;
    const t26 = RL*t17 + RT1*t16;
    const t27 = RM2*t23;
    const t28 = RM2*t24;
    const t29 = RT2*t22;
    const t30 = RIN + t16;
    const t31 = R1*RIN;
    const t32 = R1 + RIN;
    const t33 = C3*t20;
    const t34 = R2*t33 + RIN*t33;
    const t35 = C4*RT2;
    const t36 = C4*RM1;
    const t37 = C3*t31;
    const t38 = RT1*t32;
    const t39 = R2*RL;
    const t40 = C3 + C4;
    const t41 = R2*(t31 + t32*(RL + RT1));
    const t42 = R1 + RL;
    const t43 = RIN*RT1;
    const t44 = R1*RL;
    const t45 = RL + RT2;
    const t46 = RT1*t45;
    const t47 = R2 + RL;
    const t48 = RIN*t42;
    const t49 = t39 + t48;
    const t50 = R2*RT2;
    const t51 = C1*t18;
    const t52 = C4*t6;

    const denXRe = C4*t9*(R2*(RM1*(RL*(RIN*t7 + t0) + t1) + t2) + RM1*t2 + RT1*(RIN*t4 + t3)*(RL*t6 + t5));
    const denAIm = C4*(RM2*(C1*t24*(R1*(RM1*t26 + RT2*t25) + RIN*(RM1*(t18 + t26) + RT2*(t14 + t25))) + t23*(RL*(R1*t6 + RT1*t6 + t5) + t20*t5)) + t8*(RIN*(RL*t15 + RM1*t19) + t3*(RL*(RM1*t11 + t10) + RT1*t5))) + t9*(RIN*t19 + t3*(RL*t11 + t10));
    const denBRe = C1*(C3*t39*(t31 + t38) + RL*RT1*t37 + RT2*(RL*(C4*t38 + t37) + RT1*t31*t40 + t40*t41) + t28*(RT1*(RT2*t32 + t44) + RT2*(RL*t32 + t31) + t41 + t42*t43)) + C4*(RM1*(C1*(RT1*(t16*t32 + t31) + t16*t31) + t20*(t28*t30 + t29)) + RT2*t20*t21*t28) + RL*(t27*(RT1 + t7) + t35*(t28*(RIN + RT1 + t4) + t34) + t36*(C1*t17*t32 + t28*(RIN + t13 + t7) + t29 + t34)) + t0*t27 + t10*t27;
    const denCIm = C1*(RT1*(R1*(RL + t16) + RIN*(t47 + t7)) + t16*t44 + t16*t48) + t22*(RT2*t42 + t44 + t46) + t35*(R1*t47 + RT1*(RL + t21) + t49) + (t28 + t36)*(R1*t45 + RL*RT2 + t12 + t3 + t43 + t46 + t49);
    const denDRe = R1*t30 + RL*(t21 + t7) + RT1*(RL + t30);
    const numXRe = t0*t36*t39*t9;
    const numAIm = C1*t44*(C3*C4*R2*t5 + RM2*(C2*C3*t50 + C4*t24*(RM1*t13 + RT2*(RM1 + t13))));
    const numBRe = RL*(C1*R1*(C4*(RM1*t17 + t10) + t40*t50) + t28*(t20*t52 + t51));
    const numCIm = RL*(t20*(t28 + t52) + t51);
    const numDRe = RL*t20;

return [
      [numDRe, numCIm, numBRe, numAIm, numXRe],
      [denDRe, denCIm, denBRe, denAIm, denXRe]
    ];
  }
}
