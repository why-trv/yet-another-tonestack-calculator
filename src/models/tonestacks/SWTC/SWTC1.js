import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class SWTC1 extends BaseTonestack {
  static definition() {
    return {
      id: 'swt1',
      name: 'Stupidly Wonderful Tone Control 1',
      schematic: 'SWTC1',
      components: {
        RIN: 1e3,
        RL: 1e6,
        RT: 47e3,
        RV: 100e3,
        R1: 1e3,
        C1: 10e-9,
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
    // Original operations: 81 (*, +, -)
    // Optimized operations: 14 (5.79x less)
    const t0 = R1 + RIN + RT1;
    const t1 = RL*RV2;
    const t2 = RT2 + RV1;
    const t3 = t0 + t2;

    const denBRe = 0;
    const denCIm = C1*t0*(t1 + t2*(RL + RV2));
    const denDRe = RL*(RV2 + t3) + RV2*t3;
    const numBRe = 0;
    const numCIm = 0;
    const numDRe = t1;

return [
      [numDRe, numCIm, numBRe],
      [denDRe, denCIm, denBRe]
    ];
  }
}
