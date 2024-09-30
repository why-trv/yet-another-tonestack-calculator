import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class SWTC3 extends BaseTonestack {
  static definition() {
    return {
      id: 'swt3',
      name: 'Stupidly Wonderful Tone Control 3',
      schematicFilename: 'SWTC3',
      components: {
        RIN: 1e3,
        RT: 100e3,
        RV: 100e3,
        R1: 10e3,
        R2: 47e3,
        RL: 1e6,
        C1: 22e-9,
      },
      controls: {
        RV: Tapers.LogA,
        RT: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, RL, C1,
      RT: [RT2, RT1],
      RV: [RV2, RV1]
    } = this.processComponentValues(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 253 (*, +, -)
    // Optimized operations: 57 (4.44x less)
    const t0 = R1 + RIN;
    const t1 = R2*RT1;
    const t2 = R2 + RT1;
    const t3 = RIN + RV1;
    const t4 = R1 + RT1;
    const t5 = R1*RT1 + R2*t4;
    const t6 = RT1 + RT2;
    const t7 = RV2*t6;
    const t8 = R2 + RIN;

    const denBRe = 0;
    const denCIm = C1*(RL*t0*(t1 + t2*(RV1 + RV2)) + RT2*(RL*(t2*(RV2 + t3) + t5) + RV2*(t2*t3 + t5)) + RV2*t0*(RV1*t2 + t1));
    const denDRe = RL*(R1*(RV2 + t6) + RT1*t8 + RT2*t8 + RV2*(RIN + RT2 + t2)) + RV1*(RL + RV2)*(RT2 + t4 + t8) + t7*(R2 + t0);
    const numBRe = 0;
    const numCIm = C1*RL*RT2*RV2*t2;
    const numDRe = RL*t7;

return [
      [numDRe, numCIm, numBRe],
      [denDRe, denCIm, denBRe]
    ];
  }
}
