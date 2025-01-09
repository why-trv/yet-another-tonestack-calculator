import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class Tilt extends BaseTonestack {
  static definition() {
    return {
      id: 'tilt',
      name: 'Tilt',
      components: {
        RIN: 1,
        RT: 50e3,
        R1: 15e3,
        R2: 15e3,
        RF1: 47e3,
        RF2: 47e3,
        C1: 5.6e-9,
        C2: 5.6e-9,
      },
      controls: {
        RT: Tapers.Linear
      },
      magnitudePlotRange: [-24, 24]
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, RF1, RF2, C1, C2, RT2, RT1
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 185 (*, +, -)
    // Optimized operations: 42 (4.40x less)
    const t0 = R2 + RF2;
    const t1 = RT1 + RT2;
    const t2 = t0 + t1;
    const t3 = RF1 + RIN;
    const t4 = R2*RT1 + t2*t3;
    const t5 = C1*C2;
    const t6 = RT1 + t3;
    const t7 = RF1 + t1;
    const t8 = RF2 + RT2;

    const denBRe = t5*(R1*t4 + RF1*(RF2*RT2 + RIN*t2) + RIN*t0*t1);
    const denCIm = C1*(R1*t6 + RIN*t7) + C2*t4;
    const denDRe = t6;
    const numBRe = t5*(R1*R2*t8 + RF2*(R2*t7 + RF1*RT1));
    const numCIm = C1*RF2*t7 + t8*(C1*R1 + C2*R2);
    const numDRe = t8;

return [
      [numDRe, numCIm, numBRe],
      [denDRe, denCIm, denBRe]
    ];
  }
}
