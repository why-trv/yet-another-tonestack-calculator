import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class BigMuff extends BaseTonestack {
  static definition() {
    return {
      id: 'muff',
      name: 'Big Muff',
      components: {
        RIN: 1e3,
        R1: 39e3,
        R2: 22e3,
        RM: 100e3,
        RL: 1e6,
        C1: 4e-9,
        C2: 10e-9,
      },
      controls: {
        RM: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, RL, C1, C2,      
      RM: [RM2, RM1]
    } = this.processComponentValues(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 196 (*, +, -)
    // Optimized operations: 54 (3.63x less)
    const t0 = RM1 + RM2;
    const t1 = R2*RIN;
    const t2 = R2 + RIN;
    const t3 = C1*C2;
    const t4 = RL*t2;
    const t5 = R2 + RM1;
    const t6 = RL*t5;
    const t7 = R1 + RM2;
    const t8 = RIN + t7;
    const t9 = R2*RL;

    const denAIm = 0;
    const denBRe = t3*(R1*(RL*(t0*t2 + t1) + RM2*(RM1*t2 + t1)) + t1*(RL*t0 + RM1*RM2));
    const denCIm = C1*RM1*(t1 + t4) + C1*t7*(R2*RM1 + RIN*t5 + t4) + C2*(R1 + RIN)*(RM2*(RL + t5) + t6);
    const denDRe = R2*t8 + RL*(t2 + t7) + RM1*(RL + t8);
    const numAIm = 0;
    const numBRe = R1*RM2*t3*t9;
    const numCIm = C1*t9*(R1 + t0);
    const numDRe = t6;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}