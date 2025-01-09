import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class DrZ extends BaseTonestack {
  static definition() {
    return {
      id: 'drz',
      name: 'Dr. Z',
      description: 'Ghia / Stangray tonestack. Apparently, they use quite different part values, but the resulting curve is quite similar',
      components: {
        RIN: 38e3,
        RL: 1e6,
        RT: 1e6,
        R1: 330e3,
        R2: 330e3,
        C1: 10e-9,
        C2: 120e-12,
        C3: 4700e-12,
      },
      controls: {
        RT: Tapers.LogA
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, RL, C1, C2, C3, RT2, RT1
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 301 (*, +, -)
    // Optimized operations: 69 (4.36x less)
    const t0 = R1*RL;
    const t1 = R2*RT1;
    const t2 = t0*t1;
    const t3 = C1*C2;
    const t4 = C3*RT2;
    const t5 = t3*t4;
    const t6 = C1*RIN;
    const t7 = RT2*(C1 + C3);
    const t8 = C2*t1;
    const t9 = R2 + RT1;
    const t10 = RL*t9 + t1;
    const t11 = R1*(C1 + C2);
    const t12 = RIN + RT2;
    const t13 = RT2*t9;
    const t14 = RL + RT2;
    const t15 = t1 + t14*t9;
    const t16 = R1*RT2;

    const denAIm = t5*(RIN*(R2*(RT1*(R1 + RL) + t0) + RT1*t0) + t2);
    const denBRe = R1*t3*(R2*RL*t12 + RIN*(t1 + t13) + RL*RT1*(R2 + t12)) + t10*t4*(t11 + t6) + t8*(RL*(t6 + t7) + RT2*t6);
    const denCIm = t10*t7 + t11*t15 + t14*t8 + t15*t6;
    const denDRe = t15;
    const numAIm = t2*t5;
    const numBRe = RL*t3*(R2*(RT1*(R1 + RT2) + t16) + RT1*t16);
    const numCIm = C1*RL*t13;
    const numDRe = 0;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}
