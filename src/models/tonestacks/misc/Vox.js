import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class Vox extends BaseTonestack {
  static definition() {
    return {
      id: 'vox',
      name: 'Vox',
      components: {
        RIN: 717,
        R1: 100e3,
        R2: 10e3,
        RT: 1e6,
        RB: 1e6,
        RL: 600e3,
        C1: 47e-12,
        C2: 22e-9,
        C3: 22e-9
      },
      controls: {
        RB: Tapers.LogA,
        RT: Tapers.LogA
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, RL, C1, C2, C3,
      RT: [RT2, RT1],
      // Sic!
      RB: [RB1, RB2]
    } = this.processComponentValues(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 1153 (*, +, -)
    // Optimized operations: 165 (6.99x less)
    const t0 = R2*RB2;
    const t1 = RIN*t0;
    const t2 = RIN + RT1;
    const t3 = R2 + RB2;
    const t4 = RT2*t3;
    const t5 = RIN*t3 + t0;
    const t6 = RT1 + RT2;
    const t7 = C2*RB1;
    const t8 = C1*C3*t7;
    const t9 = C2 + C3;
    const t10 = RIN*RL;
    const t11 = RIN + RL;
    const t12 = RB2*t11;
    const t13 = R2*(t10 + t12);
    const t14 = R2*RL;
    const t15 = R2 + RL;
    const t16 = RIN*(RL + RT1);
    const t17 = RB2*t16;
    const t18 = RL + t2;
    const t19 = R1*t3;
    const t20 = t18*t19;
    const t21 = RB2*t18 + t16;
    const t22 = RL + RT2;
    const t23 = C2*RT1;
    const t24 = RB1 + RT2;
    const t25 = RL*(C1*t24 + t7) + RT2*t7;
    const t26 = RB1 + t22;
    const t27 = R2*t26 + RB2*(t15 + t24);
    const t28 = R1*t9;
    const t29 = C1 + t9;
    const t30 = C1 + C2;

    const denAIm = t8*(R1*t2*(t0 + t4) + RL*(R1*(t0 + t3*(RIN + t6)) + t5*t6) + RT1*(RT2*t5 + t1) + RT2*t1);
    const denBRe = C1*t9*(R1*(RB2*(t14 + t15*t2) + t14*t2) + RB2*RT1*t10 + RT1*t13 + RT2*(R2*t21 + t17 + t20)) + RB1*(C1*(C2*t18*t4 + C3*t17 + R2*(C3*t21 + t11*t23) + t12*t23 + t20*t9) + C2*C3*(R1*(RB2*t15 + t14) + R2*RT2*(R1 + RIN) + RB2*(RIN*t22 + RT2*(R1 + R2)) + t13));
    const denCIm = R2*t25 + RB2*(R2*(C2*RT2 + C3*t26 + RL*t30) + t25) + t27*t28 + t27*(C1*RT1 + RIN*t29);
    const denDRe = t0 + t26*t3;
    const numAIm = RL*t8*(RT2*(t0 + t19) + t0*(R1 + RT1));
    const numBRe = RL*(C1*(C2*t6*(R2*(RB1 + RB2) + RB1*RB2) + t28*(R2*(RB2 + t24) + RB2*t24)) + C3*t0*(C1*(RB1 + t6) + t7));
    const numCIm = RL*(t0*t29 + t3*(C1*RT2 + RB1*t30));
    const numDRe = 0;

    return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}