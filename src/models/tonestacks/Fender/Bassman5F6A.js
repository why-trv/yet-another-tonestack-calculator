import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components'

export class Bassman5F6A extends BaseTonestack {
  static definition() {
    return {
      id: '5f6a',
      name: 'Bassman 5F6-A',
      components: {
        RIN: 1300,
        RL: 1e6,
        RB: 1e6,
        RM: 25e3,
        RT: 250e3,
        R1: 56e3,
        C1: 250e-12,
        C2: 20e-9,
        C3: 20e-9
      },
      controls: {
        RB: {
          taper: Tapers.LogA,
          role: PotRole.VR
        },
        RM: Tapers.Linear,
        RT: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, RL, C1, C2, C3, RT2, RT1, RM2, RM1, RB
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 934 (*, +, -)
    // Optimized operations: 129 (7.24x less)
    const t0 = RT1*RT2;
    const t1 = RIN + RT1;
    const t2 = RM2 + RT2;
    const t3 = RT1 + RT2;
    const t4 = RIN + RM2;
    const t5 = R1 + t3;
    const t6 = RB + RM1;
    const t7 = C2*t6;
    const t8 = C3*t7;
    const t9 = RIN*RM2;
    const t10 = RL + t2;
    const t11 = RL + RT2;
    const t12 = RIN + RL;
    const t13 = RL*t4 + t9;
    const t14 = t4*(RL + RT1) + t9;
    const t15 = RL + t1;
    const t16 = RB*t15;
    const t17 = C2 + C3;
    const t18 = R1*t17;
    const t19 = C2*t11;
    const t20 = t2 + t6;
    const t21 = C1*RL;
    const t22 = C3*RM2;
    const t23 = t10 + t6;
    const t24 = RM2 + t6;

    const denAIm = C1*t8*(R1*t1*t2 + RIN*(RM2*t3 + t0) + RL*(R1*t3 + t4*t5) + RM2*t0);
    const denBRe = C1*(RT2*(C2*(RIN*RL + RIN*RT1 + t15*(RM1 + RM2) + t16) + C3*t14) + t18*(RL*RM2 + RL*t1 + RM1*t15 + RM2*RT1 + RT2*t15 + t16 + t9)) + C1*(C2*RT1*(RB*t12 + RM1*t12 + t13) + C3*(RB*t14 + RM1*t14 + RT1*t13)) + t8*(R1*t10 + t11*t4 + t9);
    const denCIm = C1*RT1*t23 + RIN*t23*(C1 + t17) + RM1*t19 + t18*t23 + t19*(RB + RM2) + t20*t21 + t22*(t11 + t6);
    const denDRe = t23;
    const numAIm = t21*t8*(R1*RT2 + RM2*t5);
    const numBRe = RL*(C1*(C2*t24*t3 + t18*t20) + t22*(C1*(t3 + t6) + t7));
    const numCIm = RL*(C1*RT2 + t22 + t24*(C1 + C2));
    const numDRe = 0;

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}
