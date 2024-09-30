import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class BaxandallPassiveDualBassCap extends BaseTonestack {
  static definition() {
    return {
      id: 'bxp2',
      name: 'Baxandall Passive Dual Bass Cap',
      components: {
        RIN: 38e3,
        R1: 100e3,
        R2: 10e3,
        R3: 180e3,
        R4: 10e3,
        R5: 10e3,
        RB: 500e3,
        RT: 500e3,
        RL: 1e6,
        C1: 470e-12,
        C2: 4700e-12,
        C3: 330e-12,
      },
      controls: {
        RB: Tapers.LogB,
        RT: Tapers.LogB
      }
    };
  }

  calculateCoefficients(controlValues) {
    let {
      RIN, R1, R2, R3, R4, R5, RL, C1, C2, C3,
      RT: [RT2, RT1],
      RB: [RB2, RB1]
    } = this.processComponentValues(controlValues);

    RT2 += R5;
    RT1 += R4;

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 1811 (*, +, -)
    // Optimized operations: 274 (6.61x less)
    const t0 = R3*RL;
    const t1 = R1*RIN;
    const t2 = R1 + R3;
    const t3 = RIN*RL + RT2*(RIN + RL);
    const t4 = R1*R3;
    const t5 = R1 + RIN;
    const t6 = R3 + RL;
    const t7 = C1*RB1;
    const t8 = C2*RB2;
    const t9 = C3*t8;
    const t10 = R1 + RB1;
    const t11 = RT2*t10;
    const t12 = RT1*t11;
    const t13 = R1 + RT1;
    const t14 = RB1 + t13;
    const t15 = R2*RIN;
    const t16 = RIN*t14;
    const t17 = R1 + R2;
    const t18 = RB1 + t17;
    const t19 = RT1*RT2;
    const t20 = RT1 + t17;
    const t21 = RB1 + t20;
    const t22 = RIN*RT2;
    const t23 = RT1 + RT2;
    const t24 = R2 + t5;
    const t25 = R1*R2;
    const t26 = RIN*t17 + t23*t24;
    const t27 = RL*t26;
    const t28 = R1*RL;
    const t29 = R1 + RL;
    const t30 = RL + RT2;
    const t31 = R2*t29;
    const t32 = RB1*(R2 + RL) + t28;
    const t33 = RL*t23;
    const t34 = RB2*RL;
    const t35 = RB2 + RL;
    const t36 = R1*t35 + t31;
    const t37 = t34 + t36;
    const t38 = RT2*t35;
    const t39 = R2*t23;
    const t40 = R2 + RB2;
    const t41 = RB1*RL;
    const t42 = RB2 + t17;
    const t43 = RB2 + t18;
    const t44 = R2*RL;
    const t45 = (RIN + t23)*(t40 + t6);
    const t46 = C3*RT2;
    const t47 = t46*t7;
    const t48 = RT1 + t2;

    const denAIm = t7*t9*(R2*t2*t3 + RT1*(R2*(RL*(R3 + t5) + RT2*(t5 + t6)) + t5*(RT2*t6 + t0)) + RT2*(R1*t0 + RIN*(RL*t2 + t4)) + t0*t1);
    const denBRe = t7*(C3*(R2*RT2*(RT1*t5 + t1) + R3*(t17*t19 + t20*t22 + t27) + RB2*(R3*(RT1*t30 + t3) + RT1*(RL*t5 + RT2*t29) + t13*t22 + t28*(RIN + RT2)) + RL*(R1*(RT2*(R2 + RIN) + t15) + RT1*(RT2*t24 + t15 + t25))) + t8*(R3*t26 + t15*(R1 + t23) + t23*t25 + t27)) + t9*(R2*t12 + R3*(RL*(RIN*t18 + t23*(RB1 + t24)) + t18*t19 + t21*t22) + RL*(R2*(RT1*(RT2 + t10) + t11) + t12 + t16*(R2 + RT2)) + RT2*t14*t15);
    const denCIm = C3*(RL*t11*t40 + RT1*(RT2*(RB1*(R2 + t35) + t37) + t28*t40 + t40*t41) + t16*(R2*t30 + t34 + t38)) + R3*(C3*(RIN*(RL*RT1 + RT2*(t21 + t35) + t28 + t34 + t41 + t44) + t43*(t19 + t33)) + t7*(RIN*(t23 + t42) + t23*t42) + t8*(RIN*(t18 + t23) + t18*t23)) + t7*(RIN*(RB2*RT1 + RL*(RB2 + RT1) + t36 + t38 + t39) + t23*t37) + t8*(RIN*(R2*(t23 + t29) + t32 + t33) + t23*(t31 + t32));
    const denDRe = R1*t45 + RB1*t45 + RIN*t40*t6 + t23*(R2*R3 + RB2*(RIN + t6) + RIN*(R2 + t6) + t44);
    const numAIm = C2*t34*t47*(R1*(R2 + R3) + R2*(R3 + RT1));
    const numBRe = RL*(t47*(t4 + t40*t48) + t8*(t39*t7 + t46*(R2*(RB1 + t48) + R3*t10)));
    const numCIm = RL*(R3*t43*t46 + t14*t40*t46 + t23*(R2*t8 + t40*t7));
    const numDRe = t33*t40;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}