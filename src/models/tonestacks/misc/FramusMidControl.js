import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class FramusMidControl extends BaseTonestack {
  static definition() {
    return {
      id: 'fram',
      name: 'Framus Mid Control',
      components: {
        RIN: 1e3,
        RL: 1e6,
        RM: 1e6,
        R1: 100e3,
        C1: 1e-9,
        C2: 1e-9
      },
      controls: {
        RM: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, RL, C1, C2, RM2, RM1
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 96 (*, +, -)
    // Optimized operations: 34 (2.82x less)
    const t0 = R1*RIN;
    const t1 = R1 + RIN;
    const t2 = RL + RM1;
    const t3 = C2*RL;
    const t4 = RIN + t2;
    const t5 = C1*R1;

    const denAIm = 0;
    const denBRe = C1*C2*(RM1*(t0 + t1*(RL + RM2)) + RM2*(RL*t1 + t0));
    const denCIm = C1*RIN*t2 + t3*(RIN + RM1) + t4*(C2*RM2 + R1*(C1 + C2));
    const denDRe = t4;
    const numAIm = 0;
    const numBRe = t3*t5*(RM1 + RM2);
    const numCIm = RL*(C2*(R1 + RM2) + t5);
    const numDRe = RL;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}