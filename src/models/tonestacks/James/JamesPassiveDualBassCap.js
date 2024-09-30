import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class JamesPassiveDualBassCap extends BaseTonestack {
  static definition() {
    return {
      id: 'jsp2',
      name: 'James Passive Dual Bass Cap',
      components: {
        RIN: 38e3,
        R1: 100e3,
        R2: 10e3,
        R3: 180e3,
        RB: 1e6,
        RT: 470e3,
        RL: 1e6,
        CB1: 470e-12,
        CB2: 4700e-12,
        CT1: 330e-12,
        CT2: 3300e-12,
      },
      controls: {
        RB: Tapers.LogB,
        RT: Tapers.LogB
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, R3, RL, CB1, CB2, CT1, CT2,
      RT: [RT2, RT1],
      RB: [RB2, RB1]
    } = this.processComponentValues(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 2716 (*, +, -)
    // Optimized operations: 301 (9.02x less)
    const t0 = RIN*RT1;
    const t1 = RIN + RT1;
    const t2 = R2 + R3;
    const t3 = R1*t2;
    const t4 = R2*(R3*t1 + t0) + R3*t0 + t1*t3;
    const t5 = R2 + RIN;
    const t6 = R3 + RT1;
    const t7 = CB1*RB1;
    const t8 = CB2*RB2;
    const t9 = CT1*t8;
    const t10 = t7*t9;
    const t11 = R1*R2;
    const t12 = R1*RL;
    const t13 = R1 + t5;
    const t14 = RL*t13;
    const t15 = R1*R3;
    const t16 = R2*(R1 + R3) + RIN*t2 + t14 + t15;
    const t17 = R1 + RB1;
    const t18 = R2*RIN;
    const t19 = t17*t18;
    const t20 = RL*t17;
    const t21 = R2 + t17;
    const t22 = RIN*t21;
    const t23 = t17 + t5;
    const t24 = RT2*t23;
    const t25 = R1 + RIN;
    const t26 = RB1 + t25;
    const t27 = RT2*t26;
    const t28 = R2*t27;
    const t29 = RL + RT2;
    const t30 = R3*t29;
    const t31 = R2*t17;
    const t32 = RL*(t18 + t24 + t31);
    const t33 = RT2*t25;
    const t34 = R2 + RB2;
    const t35 = RIN*t34;
    const t36 = R1*t35;
    const t37 = RB2 + t5;
    const t38 = RT2*t37 + t35;
    const t39 = R1 + t34;
    const t40 = RIN*t39;
    const t41 = R1 + t37;
    const t42 = RT2*t41;
    const t43 = R3*t41;
    const t44 = R1*RB2;
    const t45 = t11 + t35 + t44;
    const t46 = RL*(t42 + t45) + t29*t43 + t33*t34;
    const t47 = RL*t23;
    const t48 = R3*t26;
    const t49 = RL*t41;
    const t50 = t23*t8;
    const t51 = t17 + t34;
    const t52 = RIN*t51;
    const t53 = t17 + t37;
    const t54 = RT2*t53;
    const t55 = t17*t35;
    const t56 = RB2*t17 + t31 + t35;
    const t57 = RL*(t54 + t56) + t27*t34;
    const t58 = R2*t8;
    const t59 = R3 + RL;
    const t60 = CT1*R3;
    const t61 = t26 + t59;
    const t62 = CT2*RT2;
    const t63 = R1 + t6;
    const t64 = CT1*t7;
    const t65 = CT1*R1 + CT1*RT1 + t62;
    const t66 = t34*t7;
    const t67 = t34*(RT1 + t17);

    const denXRe = CT2*t10*(RL*(RT2*(R1*(t1 + t2) + t5*t6) + t4) + RT2*t4);
    const denAIm = CT2*(t7*(CT1*(R3*(RL*(t40 + t42) + RT2*t40) + RT1*t46 + RT2*t36 + t12*t38) + t8*(R2*t33 + RL*(RT2*t13 + t11 + t18) + t13*t30)) + t9*(R3*(RL*(t22 + t24) + RT2*t22) + RT1*(t23*t30 + t28 + t32) + RT2*t19 + t20*(RT2*t5 + t18))) + t10*(R3*(RIN*(R1 + R2) + t14) + RIN*t11 + RT1*t16 + t12*t5);
    const denBRe = CT2*(CT1*(RT1*t57 + RT2*t55 + t20*t38) + R3*(CT1*(RL*(t52 + t54) + RT1*t29*t53 + RT2*t52) + t29*t50) + t28*t8 + t32*t8 + t46*t7) + t7*(CT1*(R3*(t40 + t49) + RT1*(R2*(R3 + t25) + R3*(RB2 + t25) + RB2*RIN + t44 + t49) + t12*t37 + t36) + t16*t8) + t9*(R3*(t22 + t47) + RT1*(R2*(R3 + t17) + t18 + t47 + t48) + t19 + t20*t5);
    const denCIm = CT1*(RT1*(RL*t53 + t56) + t20*t37 + t55) + CT2*(t30*t53 + t57) + t26*t58 + t50*t59 + t60*(t52 + t53*(RL + RT1)) + t7*(t43 + t45 + t49);
    const denDRe = R2*t61 + RB2*t61 + RL*t26 + t48;
    const numXRe = RL*t10*t62*(R2*t6 + t3);
    const numAIm = RL*(t62*t64*(t15 + t34*t63) + t8*(t62*(R2*(CT1*(t17 + t6) + t7) + t17*t60) + t64*(R2*t63 + t15)));
    const numBRe = RL*(CT1*(R3*(t21*t8 + t39*t7 + t51*t62) + t62*t67) + t58*(CT1*RB1 + t65 + t7) + t65*t66);
    const numCIm = RL*(CT1*t67 + t34*t62 + t51*t60 + t58 + t66);
    const numDRe = RL*t34;

return [
      [numDRe, numCIm, numBRe, numAIm, numXRe],
      [denDRe, denCIm, denBRe, denAIm, denXRe]
    ];
  }
}