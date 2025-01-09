import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class JamesPassiveSingleBassCap extends BaseTonestack {
  static definition() {
    return {
      id: 'jsp1',
      name: 'James Passive Single Bass Cap',
      components: {
        RIN: 600,
        RL: 100e3,
        RB: 10e3,
        RT: 10e3,
        R1: 2200,
        R2: 2200,
        R3: 2200,
        CB: 220e-9,
        CT1: 10e-9,
        CT2: 10e-9
      },
      controls: {
        RB: Tapers.Linear,
        RT: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, R3, RL, CB, CT1, CT2, RT2, RT1, RB2, RB1
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 1864 (*, +, -)
    // Optimized operations: 287 (6.49x less)
    const t0 = RB1*RB2;
    const t1 = RB1 + RB2;
    const t2 = R3*t1;
    const t3 = t0 + t2;
    const t4 = R1*RT2;
    const t5 = t3*t4;
    const t6 = RL*RT2;
    const t7 = RL + RT2;
    const t8 = R1 + RB1;
    const t9 = R1 + RT2;
    const t10 = R1 + RIN;
    const t11 = RB1 + t10;
    const t12 = RB2*t11;
    const t13 = R1*t1;
    const t14 = RIN + RT2;
    const t15 = CT1*CT2;
    const t16 = CB*t15;
    const t17 = RIN*RL;
    const t18 = R2 + RB2;
    const t19 = R1*t18;
    const t20 = RB1*RL;
    const t21 = RIN + RL;
    const t22 = R2*t21;
    const t23 = RB2*RL;
    const t24 = RIN*(RB2 + RL) + t23;
    const t25 = R2 + t1;
    const t26 = R2 + t10;
    const t27 = t1 + t26;
    const t28 = R2*RIN;
    const t29 = R1*t21;
    const t30 = RIN*t1;
    const t31 = R1*RL;
    const t32 = RB1 + RIN;
    const t33 = RL*t18;
    const t34 = R2*RL;
    const t35 = R2*t1;
    const t36 = R1*(t0 + t35);
    const t37 = CT2*RL;
    const t38 = CT1*RT1;
    const t39 = R2*(t0 + t30);
    const t40 = t17 + t22;
    const t41 = RB1 + RL;
    const t42 = RIN*(RB2*t41 + t20);
    const t43 = CT2*RT2;
    const t44 = t38 + t43;
    const t45 = R3 + RB2;
    const t46 = R3*RB2;
    const t47 = R1*t45 + t46;
    const t48 = R2*R3;
    const t49 = R3 + RL;
    const t50 = R3 + t41;
    const t51 = t18 + t49;
    const t52 = R2*RB2;
    const t53 = RB1*t51 + t23 + t46 + t52;
    const t54 = R1*R2;
    const t55 = R3 + t18;
    const t56 = R1 + RT1;
    const t57 = R2*t56;
    const t58 = R1 + R2;
    const t59 = CB*t35;
    const t60 = CT1*R3;

    const denXRe = 0;
    const denAIm = t16*(R2*(RIN*t7 + t6)*(R1*RB1 + RB2*t8 + t2) + RIN*t5 + RL*(RIN*(RB1*t4 + RB2*(RB1*t9 + t4) + t2*t9) + t5) + RT1*(R2*(RL*(RB1*t14 + RB2*(RB1 + t14) + t13 + t2) + RT2*(RB1*t10 + t12 + t2)) + t10*(RL*(RB1*RT2 + RB2*(RB1 + RT2) + t2) + RT2*t3)));
    const denBRe = CB*(CT1*t2*(t29 + t40) + CT1*(R1*(RL*t0 + t1*t22 + t42) + t0*t40) + t2*t26*(CT2*t7 + t38) + t36*t37 + t37*(RIN*t0 + t39) + t44*(RL*t13 + RL*t35 + t36 + t39 + t42)) + t15*(R3*(R1*t17 + RT1*t27*t7 + RT2*(RL*(RIN + t25) + t28 + t29 + t30) + t17*t25) + RIN*t18*t20 + RT1*(RT2*(R2*t32 + t0 + t19 + t20 + t24 + t31 + t34) + t18*t31 + t32*t33) + RT2*t8*(t22 + t24) + t17*t19);
    const denCIm = CB*(R1*t53 + R2*RB1*t49 + RIN*t53 + t50*t52) + CT1*RIN*(RB1*t45 + t47) + CT1*t28*(R3 + t8) + RL*(CT1*(R1*t55 + RB1*(RIN + t55) + RIN*(R1 + R3) + t46 + t48) + CT2*(t32*t55 + t47 + t48 + t54)) + t44*(R1*t51 + RB1*(R2 + t49) + RB2*t50 + RIN*t51 + t34 + t48);
    const denDRe = R2*(R3 + t11) + R3*(t1 + t10) + RL*t27 + t12;
    const numXRe = 0;
    const numAIm = t16*t6*(RB1*(t45*t58 + t57) + RB2*(R3*t58 + t57));
    const numBRe = RL*(CB*CT1*(R2*(RB1*t56 + RB2*RT1) + RB2*(RB1*t58 + t54) + t2*t58) + t43*(CT1*t18*(RT1 + t8) + t59 + t60*(t1 + t58)));
    const numCIm = RL*(t18*(CT1*R1 + CT1*(R3 + RB1 + RT1) + t43) + t59 + t60*t8);
    const numDRe = t33;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}