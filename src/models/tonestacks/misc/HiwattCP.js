import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class HiwattCP extends BaseTonestack {
  static definition() {
    return {
      id: 'hwcp',
      name: 'Hiwatt CP',
      description: 'Schematic found <a href="https://hiwatt.org/Schematics/CP103PreRI.pdf" target="_blank" rel="noopener noreferrer">here</a>. Richard Kuehnel <a href="https://www.ampbooks.com/mobile/classic-circuits/cp103-tonestack/" target="_blank" rel="noopener noreferrer">specifies</a> slightly different potentiometer values',
      components: {
        RIN: 48.4e3,        
        RT: 250e3,
        RB: 500e3,
        R1: 100e3,
        R2: 10e3,
        RL: 220e3,
        C1: 47e-9,
        C2: 220e-12,
        C3: 47e-9
      },
      controls: {
        RB: Tapers.LogB,        
        RT: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, RL, C1, C2, C3, RT2, RT1, RB2, RB1
    } = this.extractCoefficientVariables(controlValues);

    // Expanded coefficients refactored using sympy to reduce the number of operations.
    // Original operations: 889 (*, +, -)
    // Optimized operations: 145 (6.13x less)
    const t0 = R2*RB1;
    const t1 = R2 + RB1;
    const t2 = RB2*t1;
    const t3 = t0 + t2;
    const t4 = C1*RL;
    const t5 = C3*t0;
    const t6 = RB2 + RT2;
    const t7 = t0 + t1*t6;
    const t8 = RT1 + RT2;
    const t9 = R1 + RT1;
    const t10 = t0*t9;
    const t11 = C3*RB2;
    const t12 = t0 + t1*(RL + t6);
    const t13 = R1 + RIN;
    const t14 = C1*t13;
    const t15 = RL + RT2;
    const t16 = C1*RB1;
    const t17 = C1 + C2;
    const t18 = RT2*t1 + t0;
    const t19 = RT1*t18;
    const t20 = t0 + t1*t15;
    const t21 = RB1*RT2 + RT1*t1;
    const t22 = RL*t8;
    const t23 = C1*C2;
    const t24 = RIN*t0;
    const t25 = RIN*t1 + t0;

    const a0 = 0;
    const a1 = t3*t4;
    const a2 = t4*(C2*(R1*t7 + t3*t8) + RB2*t5);
    const a3 = C2*t11*t4*(RT2*(R1*t1 + t0) + t10);
    const b0 = t12;
    const b1 = C2*RL*t1*(R1 + t8) + C2*(RT2*(R1*R2 + RB1*(R1 + R2) + t1*(RB2 + RT1)) + t10 + t2*t9) + RB2*(t1*t14 + t5) + t0*t14 + t15*(C1*R2*(RB1 + t13) + t13*t16 + t2*(C1 + C3));
    const b2 = t11*(C1*RIN*t20 + C2*t19 + R1*t17*t20 + RL*(C2*t21 + R2*(C2*RT2 + t16)) + RT2*t0*t17) + t23*(R1*(RIN*t12 + RL*(t0 + t1*(RT1 + t6)) + RT1*t7) + RIN*(R2*RT2*(RB1 + RB2) + RB2*t21 + t1*t22 + t19) + t3*(RL*RT1 + RT2*(RL + RT1)));
    const b3 = t11*t23*(R1*(RL*(t0 + t1*(RIN + t8)) + t18*(RIN + RT1)) + RT1*t24 + RT2*(RT1*t25 + t24) + t22*t25);

return [
      [a0, a1, a2, a3],
      [b0, b1, b2, b3]
    ];
  }
}