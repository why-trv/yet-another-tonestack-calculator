import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class Bench extends BaseTonestack {
  static definition() {
    return {
      id: 'bnch',
      name: 'Bench',
      components: {
        RIN: 13e3,
        RB: 100e3,
        RM: 100e3,
        RT: 100e3,
        R4: 51e3,
        R5: 5.1e3,
        C1: 22e-9,
        C2: 6.8e-9,
        L1: 6,
        L2: 20
      },
      controls: {
        RB: Tapers.LogB,
        RM: Tapers.LogB,
        RT: Tapers.LogB
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R4, R5, C1, C2, L1, L2, RT2, RT1, RM2, RM1, RB2, RB1
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 4218 (*, +, -)
    // Optimized operations: 492 (8.57x less)
    const t0 = RM1 + RM2;
    const t1 = RIN*RT1;
    const t2 = R5*RT2;
    const t3 = RT1*RT2;
    const t4 = RT1 + RT2;
    const t5 = R5*t4;
    const t6 = R4*t0;
    const t7 = RB1 + RB2;
    const t8 = RIN*RT2;
    const t9 = RIN*t4;
    const t10 = C2*L1;
    const t11 = RB1*RB2;
    const t12 = t0*t10;
    const t13 = RM1*RM2;
    const t14 = C2*t3;
    const t15 = t0*t4;
    const t16 = L1*t15;
    const t17 = L2*t7;
    const t18 = R4*RB1;
    const t19 = RB2*RT2;
    const t20 = R4 + RB1;
    const t21 = RB2*t20;
    const t22 = R4*RT1;
    const t23 = R4 + RT1;
    const t24 = RB2*RM2;
    const t25 = RB2 + RM2;
    const t26 = RT2*t25;
    const t27 = RB1*t22;
    const t28 = RB1*t23 + t22;
    const t29 = R5*RB2;
    const t30 = R5 + RB2;
    const t31 = RM2*t20;
    const t32 = R5*RT1;
    const t33 = RM2*t7;
    const t34 = RM2 + t7;
    const t35 = RT2*t34;
    const t36 = R5*(RB1*RM2 + t24 + t35);
    const t37 = t23*t7;
    const t38 = RM2*RT2;
    const t39 = R4*t33;
    const t40 = t32*t34;
    const t41 = R4 + t7;
    const t42 = R4*RB2 + t18;
    const t43 = RB1*RT1;
    const t44 = R5*RB1;
    const t45 = RM1*t24;
    const t46 = R5*(RM2*(RB2 + RT2) + t19);
    const t47 = RB1*t24;
    const t48 = t32*t47;
    const t49 = R5*t7;
    const t50 = t11 + t49;
    const t51 = RT1*t30;
    const t52 = RM1*t30 + t24;
    const t53 = R5*t33;
    const t54 = R5*t34;
    const t55 = RM1*(R5 + RM2);
    const t56 = t33 + t54;
    const t57 = RT1 + t7;
    const t58 = C1*t4;
    const t59 = C2*t0;
    const t60 = t3*t59;
    const t61 = RB1*t29;
    const t62 = RM1*t4;
    const t63 = RB2*t0;
    const t64 = RB2*t4;
    const t65 = C1*t24;
    const t66 = t0 + t4;
    const t67 = RB1*t66 + RB2*t66 + t15;
    const t68 = C2*t19;
    const t69 = RM2 + RT1;
    const t70 = RM1*(RB1 + RT1);
    const t71 = RB2 + t0;
    const t72 = RB2*t69 + RM2*RT1;
    const t73 = R5 + RB1;
    const t74 = L2*t37;
    const t75 = t0*t21;

    const denXRe = C1*L2*t10*(RIN*t6*(t3 + t5) + t0*t1*t2 + t7*(R4*(R5*(t0*(RIN + t4) + t9) + RT2*(t0*(RIN + RT1) + t1)) + RT1*(R5*(t0*(RIN + RT2) + t8) + t0*t8)));
    const denAIm = C1*(R4*(t11*t12*t3 + t17*(t13*t14 + t16)) + R5*(t12*(RT1*(RB2*t18 + RT2*(t18 + t21)) + t18*t19) + t17*(C2*(R4*RM2*t3 + RM1*(RM2*t22 + RT2*(RM2*t23 + t22))) + t16)) + RIN*(L2*(C2*(RM1*(R5*(R4*t35 + RT1*(RT2*(R4 + t34) + t24 + t31) + t39) + t38*(t22 + t37)) + t22*(RT2*t33 + t36)) + L1*(RM1*(R5*(RT2 + t7) + RB2*RT1 + RT2*t41 + t22 + t32 + t42 + t43) + t36 + t39 + t4*(RM2*t41 + t42) + t40)) + t10*(R5*t18*(t24 + t26) + RM1*t28*(RT2*t30 + t29) + t19*(RM2*t28 + t27) + t32*(RB2*(t18 + t31) + RT2*(t18 + t20*t25)))));
    const denBRe = C1*C2*(R4*(RM1*t48 + RT2*(RM1*(RT1*(R5*(t11 + t33) + t47) + t24*t44) + t48)) + RIN*(RM1*(RT1*t20 + t18) + t27)*(RT2*t24 + t46) + t3*t44*t45) + C1*L1*(R4*t15*t50 + RIN*(R4*(RM1*(t50 + t51) + RT1*(RB2*(RB1 + RM2) + t54) + RT2*(t11 + t52 + t54) + t47 + t53) + RB1*(RM1*(t29 + t51) + RT1*(R5*t25 + t24) + RT2*t52 + t46)) + t0*t11*t5) + L2*(C1*(R4*t4*t7*(R5*RM2 + t55) + RIN*(R4*(RT1*t56 + RT2*(t55 + t56) + t53 + t55*t57) + RM1*(t4*t56 + t53)) + RM1*t33*t5) + C2*(RIN*(R4*(R5*RM1*t57 + RT2*(RM1*(R5 + t57) + RT1*t34 + t56) + t40 + t53) + RT1*(RM1*t49 + RT2*(RM1*(R5 + t7) + t56) + t53)) + t0*t3*t49 + t6*t7*(RT1*(R5 + RT2) + t2)));
    const denCIm = R4*(C1*t47*t62 + R5*(t58*(RB1*(t13 + t63) + t45) + t59*(RB1*(t3 + t64) + RB2*t3)) + t11*t60) + RIN*(L2*(R4*t67 + R5*t67 + t15*t7) + R4*(R5*(C1*(RB1*t72 + RM1*(RB1*t25 + t72) + t26*(RB1 + RM1)) + C2*(RB2*t70 + RT1*t24 + RT2*(RB1*(RT1 + t71) + RT1*t71) + t11*t69)) + t68*(RB1*(RT1 + t0) + RT1*t0)) + RB1*(R5*(C1*RM1*(RB2*(RM2 + t4) + RM2*t4) + C2*RT1*(RB2*(RT2 + t0) + RT2*t0)) + t14*t63) + t65*(R4*t62 + RB1*(R4*(RM1 + t4) + t62))) + t15*t17*(R4 + R5) + t61*(t13*t58 + t60);
    const denDRe = t0*(RIN*(R4*R5*(RB1 + t4) + RB1*t5 + RB2*(R4*(t4 + t73) + RB1*(R5 + t4))) + t18*t5 + t64*(R4*t73 + t44)) + t9*(R4*(RB1*t30 + t29) + t61);
    const numXRe = C1*t12*t2*t74;
    const numAIm = C1*R5*(t12*t19*t28 + t17*(C2*t38*(RM1*t23 + t22) + t16));
    const numBRe = R5*(C2*RT2*(t0*t74 + t65*(R4*(t43 + t70) + RM1*t43)) + t58*(L1*t75 + L2*t33*(R4 + RM1)));
    const numCIm = R5*(t0*(t17*t4 + t28*t68) + t24*t58*(RM1*t20 + t18));
    const numDRe = t5*t75;

return [
      [numDRe, numCIm, numBRe, numAIm, numXRe],
      [denDRe, denCIm, denBRe, denAIm, denXRe]
    ];
  }
}