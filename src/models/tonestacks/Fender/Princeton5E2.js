import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class Princeton5E2 extends BaseTonestack {
  static definition() {
    return {
      id: '5e2',
      name: 'Princeton 5E2',
      components: {
        RIN: 38e3,
        RT: 250e3,
        RV: 1e6,
        R1: 100e3,
        RL: 1e6,
        C1: 500e-12,
        C2: 5e-9,
        C3: 20e-9
      },
      controls: {
        RT: Tapers.LogA,
        RV: Tapers.LogA
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, RL, C1, C2, C3,
      RT: [RT2, RT1],
      RV: [RV2, RV1],      
    } = this.processComponentValues(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 429 (*, +, -)
    // Optimized operations: 71 (6.04x less)
    const t0 = R1*RT1;
    const t1 = R1 + RT1;
    const t2 = RIN*t1 + t0;
    const t3 = RL*RV2;
    const t4 = RL + RV2;
    const t5 = RV1*t4;
    const t6 = t3 + t5;
    const t7 = C1*C3;
    const t8 = C1*RT1;
    const t9 = C3*R1;
    const t10 = RIN*RV2 + RL*(RIN + RV2);
    const t11 = t10 + t5;
    const t12 = C1 + C3;
    const t13 = C2*t12;
    const t14 = C2*RT2;
    const t15 = t1*t7;

    const denAIm = C2*t7*(RT2*(RL*RV1*t1 + RL*t2 + RV2*(t0 + t1*(RIN + RL + RV1))) + t2*t6);
    const denBRe = C2*(t3 + t4*(RT2 + RV1))*(t8 + t9) + t13*(RIN*t6 + RT2*t11) + t7*(R1*(t10 + t4*(RT1 + RV1)) + RT1*t11);
    const denCIm = RIN*t12*t4 + t14*t4 + t4*t8 + t4*t9 + t6*(C2 + t12);
    const denDRe = t4;
    const numAIm = t14*t15*t3;
    const numBRe = t3*(RT2*t13 + t15);
    const numCIm = t12*t3;
    const numDRe = 0;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}