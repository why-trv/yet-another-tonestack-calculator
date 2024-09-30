import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class SWTC4 extends BaseTonestack {
  static definition() {
    return {
      id: 'swt4',
      name: 'Stupidly Wonderful Tone Control 4',
      schematicFilename: 'swtc4',
      components: {
        RIN: 1e3,
        RT: 10e3,
        RV: 100e3,
        R1: 4.7e3,
        RL: 1e6,
        C1: 3.3e-9,
        C2: 22e-9
      },
      controls: {
        RV: Tapers.LogA,
        RT: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, RL, C1, C2,
      RT: [RT2, RT1],
      RV: [RV2, RV1]
    } = this.processComponentValues(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 227 (*, +, -)
    // Optimized operations: 32 (7.09x less)
    const t0 = RL*RV2;
    const t1 = RL + RV2;
    const t2 = RV1*t1 + t0;
    const t3 = RT1 + RV1;
    const t4 = t0 + t1*t3;
    const t5 = R1 + RIN;
    const t6 = C1*t5;
    const t7 = t3 + t5;

    const denBRe = C2*t6*(RT1*t2 + RT2*t4);
    const denCIm = C2*(RT2*(R1*t1 + RIN*t1 + t4) + t2*(RT1 + t5)) + t4*t6;
    const denDRe = RL*(RV2 + t7) + RV2*t7;
    const numBRe = 0;
    const numCIm = C2*RT2*t0;
    const numDRe = t0;

return [
      [numDRe, numCIm, numBRe],
      [denDRe, denCIm, denBRe]
    ];
  }
}
