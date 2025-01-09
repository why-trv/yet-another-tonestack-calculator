import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class BigMuffMusket extends BaseTonestack {
  static definition() {
    return {
      id: 'muf2',
      name: 'Big Muff / Musket',
      schematic: 'BigMuffMusket',
      components: {
        RIN: 12e3,
        RL: 100e3,
        RM: 100e3,
        RT: 250e3,
        R1: 10e3,
        R2: 56e3,
        C1: 47e-9,
        C2: 3.3e-9,
        C3: 47e-9,
        C4: 100e-9,
      },
      controls: {
        RT: Tapers.Linear,
        RM: {
          taper: Tapers.Linear,
          role: PotRole.VR,
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, R1, R2, RM, RT1, RT2, RL, C1, C2, C3, C4 } = this.extractCoefficientVariables(controlValues);

    // Expanded coefficients refactored using sympy to reduce the number of operations.
    // Original operations: 1016 (*, +, -)
    // Optimized operations: 119 (8.54x less)
    const t0 = R2 + RT1;
    const t1 = C4*RL;
    const t2 = C3*RM;
    const t3 = C2 + C3;
    const t4 = R1 + RT1;
    const t5 = RT2 + t4;
    const t6 = R2*t5;
    const t7 = C1*t3;
    const t8 = C2*t2;
    const t9 = R2*RT2;
    const t10 = C1*t8;
    const t11 = R1 + RIN;
    const t12 = RT2 + t0;
    const t13 = t11 + t12;
    const t14 = R2 + RIN;
    const t15 = RL*t13;
    const t16 = t14*t5;
    const t17 = C1*t11*t12 + C2*t16;
    const t18 = R2*(R1 + RT2);
    const t19 = R1*RT1;
    const t20 = RT1*RT2;
    const t21 = t19 + t20;
    const t22 = C4*(RIN*(t21 + t6) + RL*t16 + RT1*t18);
    const t23 = C4*t11*(RL*t12 + t20 + t9);
    const t24 = RT1 + RT2;
    const t25 = R1*t24;
    const t26 = R2*t25 + RIN*(t25 + t6);
    const t27 = R2*RIN;

    const b0 = 0;
    const b1 = t0*t1;
    const b2 = t1*(t0*t2 + t3*t6);
    const b3 = R2*t1*(R1*RT2*t7 + t5*t8);
    const b4 = R1*t1*t10*t9;
    const a0 = t13;
    const a1 = C3*t14*t4 + C3*(RM*t13 + RT2*t14) + C4*t0*(RT2 + t11) + C4*t15 + t17;
    const a2 = C1*(t23 + t26*t3) + t2*(C4*(RIN*t0 + t15 + t18 + t21) + t17) + t22*t3;
    const a3 = C4*t7*(RIN*RT2*(R2*t4 + t19) + RL*t26 + t19*t9) + t2*(C1*(C2*t26 + t23) + C2*t22);
    const a4 = C4*t10*(R1*(RL*(t14*t24 + t27) + RT2*(RT1*t14 + t27)) + t27*(RL*RT1 + RT2*(RL + RT1)));

    return [
      [b0, b1, b2, b3, b4],
      [a0, a1, a2, a3, a4]
    ];
  }
}