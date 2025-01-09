import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class BigMuff extends BaseTonestack {
  static definition() {
    return {
      id: 'muf0',
      name: 'Big Muff',
      components: {
        RIN: 15e3,
        RL: 100e3,
        RT: 100e3,
        R1: 39e3,
        R2: 22e3,
        C1: 10e-9,
        C2: 4e-9,
        C3: 1e-6,
      },
      controls: {
        RT: Tapers.Linear,
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, R1, R2, RT1, RT2, RL, C1, C2, C3 } = this.extractCoefficientVariables(controlValues);

    // Expanded coefficients refactored using sympy to reduce the number of operations.
    // Original operations: 322 (*, +, -)
    // Optimized operations: 75 (4.29x less)
    const t0 = R2 + RT1;
    const t1 = C3*RL;
    const t2 = RT1 + RT2;
    const t3 = R1 + t2;
    const t4 = R2*t3;
    const t5 = R1*R2;
    const t6 = RL*RT2;
    const t7 = C2*C3;
    const t8 = C1*t7;
    const t9 = R1 + RIN;
    const t10 = RT2 + t9;
    const t11 = t3*(R2 + RIN);
    const t12 = RL + RT2;
    const t13 = RT1*RT2;
    const t14 = R1*t2;
    const t15 = R1 + R2;

    const b0 = 0;
    const b1 = t0*t1;
    const b2 = C2*t1*t4;
    const b3 = t5*t6*t8;

    const a0 = t0 + t10;
    const a1 = C1*t9*(RT2 + t0) + C2*t11 + C3*(R2*(t12 + t9) + RL*(t2 + t9) + RT1*t10);
    const a2 = C1*(C2*(R2*t14 + RIN*(t14 + t4)) + C3*t9*(R2*t12 + RL*t2 + t13)) + t7*(R2*RT1*(R1 + RT2) + RIN*(R1*RT1 + t13 + t4) + RL*t11);
    const a3 = t8*(RIN*(RL*(t15*t2 + t5) + RT2*(RT1*t15 + t5)) + t5*(RT1*t12 + t6));

    return [
      [b0, b1, b2, b3],
      [a0, a1, a2, a3]
    ];
  }
}