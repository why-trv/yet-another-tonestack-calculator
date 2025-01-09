import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class Princeton5F2A extends BaseTonestack {
  static definition() {
    return {
      id: '5f2a',
      name: 'Princeton 5F2-A',
      components: {
        RIN: 38e3,
        RL: 1e6,
        RT: 1e6,
        RV: 1e6,
        C1: 22e-9,
        C2: 4.7e-9,
        C3: 500e-12
      },
      controls: {
        RT: Tapers.LogA,
        RV: Tapers.LogA
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, RL, C1, C2, C3, RT2, RT1, RV2, RV1
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 273 (*, +, -)
    // Optimized operations: 60 (4.55x less)
    const t0 = RL*RV2;
    const t1 = RL + RV2;
    const t2 = RV1*t1 + t0;
    const t3 = RT2*t1;
    const t4 = t0 + t1*(RT2 + RV1);
    const t5 = C1*C2;
    const t6 = RT1 + RV1;
    const t7 = C1*RIN*t1;
    const t8 = C2*t3;
    const t9 = C1 + C2;
    const t10 = C3*t6;
    const t11 = C2*RT2;
    const t12 = C1*t0;

    const denAIm = C3*t5*(RIN*(RT1*t4 + RV1*(t0 + t3)) + RT2*(RT1*t2 + RV1*t0));
    const denBRe = C3*(t6*t7 + t6*t8 + t9*(RT1*t0 + RV1*(RL*RT1 + RV2*(RL + RT1)))) + t5*(RIN*t4 + RT2*t2);
    const denCIm = t1*t10 + t7 + t8 + t9*(RL*RV1 + RV2*(RL + RV1));
    const denDRe = t1;
    const numAIm = t10*t11*t12;
    const numBRe = t12*(t10 + t11);
    const numCIm = t12;
    const numDRe = 0;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}