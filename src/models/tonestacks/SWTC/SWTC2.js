import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class SWTC2 extends BaseTonestack {
  static definition() {
    return {
      id: 'swt2',
      name: 'Stupidly Wonderful Tone Control 2',
      schematic: 'SWTC2',
      components: {
        RIN: 1e3,
        RT: 250e3,
        RV: 100e3,
        R1: 1e3,
        RL: 1e6,
        C1: 470e-12,
      },
      controls: {
        RT: Tapers.Linear,
        RV: Tapers.LogA,        
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, RL, C1, RT2, RT1, RV2, RV1      
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 60 (*, +, -)
    // Optimized operations: 16 (3.75x less)
    const t0 = R1 + RIN + RT1 + RV1;
    const t1 = C1*RT2;
    const t2 = RT2 + t0;
    const t3 = RL*RV2;

    const denBRe = 0;
    const denCIm = t1*(RL*(RV2 + t0) + RV2*t0);
    const denDRe = RL*t2 + RV2*(RL + t2);
    const numBRe = 0;
    const numCIm = t1*t3;
    const numDRe = t3;

return [
      [numDRe, numCIm, numBRe],
      [denDRe, denCIm, denBRe]
    ];
  }
}
