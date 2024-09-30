import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class FenderTMB extends BaseTonestack {
  static definition() {
    return {
      id: 'ftmb',
      name: 'Fender Treble-Mid-Bass',
      schematicFilename: 'FenderTMB',
      components: {
        RIN: 38e3,
        R1: 100e3,
        RT: 250e3,
        RB: 250e3,
        RM: 10e3,
        RL: 1e6,
        C1: 250e-12,
        C2: 100e-9,
        C3: 47e-9  
      },
      controls: {
        RB: Tapers.LogA,
        RM: Tapers.Linear,
        RT: Tapers.LogA
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, RL, C1, C2, C3,
      RT: [RT2, RT1],
      RM: [RM],
      RB: [RB]
    } = this.processComponentValues(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 607 (*, +, -)
    // Optimized operations: 108 (5.62x less)
    const t0 = RT1*RT2;
    const t1 = RIN + RT1;
    const t2 = RM + RT2;
    const t3 = R1*t2;
    const t4 = RT1 + RT2;
    const t5 = RIN + RM;
    const t6 = R1 + t4;
    const t7 = C2*C3;
    const t8 = C1*RB*t7;
    const t9 = C2 + C3;
    const t10 = RL + t2;
    const t11 = R1*t10;
    const t12 = RIN + RL;
    const t13 = RIN*RL + RM*t12;
    const t14 = RT2*t5 + t11 + t13;
    const t15 = RL + t1;
    const t16 = R1*t15;
    const t17 = RL + RT2;
    const t18 = C3*RM;
    const t19 = RB + RM;
    const t20 = C2*t19;
    const t21 = RB + t10;
    const t22 = RB + t2;
    const t23 = C1 + C2;

    const denAIm = t8*(RIN*(RM*t4 + t0) + RL*(R1*t4 + t5*t6) + RM*t0 + t1*t3);
    const denBRe = C1*t9*(RIN*(RT2*(RL + RM) + t11) + RL*(RM*RT2 + t3) + RT1*t14) + RB*(C1*(C2*(RT1*t12 + RT2*t15 + t16) + C3*(RT1*t5 + t13 + t16)) + t14*t7);
    const denCIm = C1*(RB*(RL + RT1) + RIN*t22 + RL*(t4 + t5) + RT1*t2) + t17*t20 + t18*(RB + t17) + t21*t9*(R1 + RIN);
    const denDRe = t21;
    const numAIm = RL*t8*(R1*RT2 + RM*t6);
    const numBRe = RL*(C1*(R1*t22*t9 + t4*(t18 + t20)) + RB*t18*t23);
    const numCIm = RL*(C1*RT2 + t18 + t19*t23);
    const numDRe = 0;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}