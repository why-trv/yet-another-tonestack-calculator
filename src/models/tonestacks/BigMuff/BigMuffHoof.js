import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class BigMuffHoof extends BaseTonestack {
  static definition() {
    return {
      id: 'muf1',
      name: 'Big Muff / Hoof',
      description: 'A la EQD Hoof / <a href="https://www.muzique.com/lab/tone3.htm" rel="noopener noreferrer">AMZ Presence Control</a>',
      schematic: 'BigMuffHoof',
      components: {
        RIN: 15e3,
        RL: 100e3,
        RM: 25e3,
        RT: 100e3,
        R1: 39e3,
        R2: 2.2e3,
        C1: 6.8e-9,
        C2: 6.8e-9,
        C3: 100e-9,
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
    const { RIN, R1, R2, RM, RT1, RT2, RL, C1, C2, C3 } = this.extractCoefficientVariables(controlValues);

    // Expanded coefficients refactored using sympy to reduce the number of operations.
    // Original operations: 516 (*, +, -)
    // Optimized operations: 81 (6.37x less)
    const t0 = R2 + RM;
    const t1 = RL*(RT1 + t0);
    const t2 = RT1 + RT2;
    const t3 = C2*(R1 + t2);
    const t4 = R1*t0;
    const t5 = RL*RT2;
    const t6 = C2*C3;
    const t7 = C1*t6;
    const t8 = R1 + RIN;
    const t9 = t0 + t2;
    const t10 = t8 + t9;
    const t11 = RT2 + t8;
    const t12 = RL + RT1;
    const t13 = R1 + t0;
    const t14 = RL + RT2;
    const t15 = RIN*t4;

    const b0 = 0;
    const b1 = C3*t1;
    const b2 = C3*RL*t0*t3;
    const b3 = t4*t5*t7;

    const a0 = t10;
    const a1 = C1*t8*t9 + C3*(R2*t11 + RL*t10 + t11*(RM + RT1)) + t3*(RIN + t0);
    const a2 = C1*(C2*(RIN*(t13*t2 + t4) + t2*t4) + C3*t8*(RT2*(t0 + t12) + t1)) + t6*(RIN*(R1*RL + RM*RT2 + RT1*(t13 + t14) + RT2*(R2 + RL) + t4) + t0*(R1*RT1 + RL*(R1 + RT1) + RT2*t12));
    const a3 = t7*(RL*t15 + RT2*t15 + (RIN*t13 + t4)*(RT1*t14 + t5));

    return [
      [b0, b1, b2, b3],
      [a0, a1, a2, a3]
    ];
  }
}