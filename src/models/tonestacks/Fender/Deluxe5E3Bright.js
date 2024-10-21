import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class Deluxe5E3Bright extends BaseTonestack {
  static definition() {
    return {
      id: '5e3b',
      name: 'Deluxe 5E3 (Bright)',
      schematic: 'Deluxe5E3Bright',
      components: {
        RINB: 20e3,
        RINN: 20e3,        
        RT: 1e6,
        RVB: 1e6,
        RVN: 1e6,            
        RL: 1e6,
        C1: 100e-9,
        C2: 100e-9,
        C3: 4.7e-9,
        C4: 500e-12             
      },
      controls: {
        RT: Tapers.LogA,
        RVB: Tapers.LogA,
        RVN: Tapers.LogA
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RINN, RINB, RL, C1, C2, C3, C4, RT2, RT1, RVN2, RVN1, RVB2, RVB1
    } = this.extractCoefficientVariables(controlValues);

    // Expanded coefficients refactored using sympy to reduce the number of operations.
    // Original operations: 2551 (*, +, -)
    // Optimized operations: 232 (11.00x less)
    const t0 = RVN1 + RVN2;
    const t1 = RVB2*t0;
    const t2 = C3*RT2;
    const t3 = RT1 + RVB1;
    const t4 = C4*t3;
    const t5 = t2 + t4;
    const t6 = C1*RVB2;
    const t7 = RL*t6;
    const t8 = t2*t4;
    const t9 = RINN*RVN2;
    const t10 = RINN + RVN2;
    const t11 = RVN1*t10;
    const t12 = t11 + t9;
    const t13 = C2*t12;
    const t14 = RVB1 + RVB2;
    const t15 = RVB2 + t0;
    const t16 = t0*t14;
    const t17 = RL*(t0 + t14) + t16;
    const t18 = RT1*RVB1;
    const t19 = RVB2*t3 + t18;
    const t20 = C4*t19;
    const t21 = C3*t0;
    const t22 = RINB*t14;
    const t23 = RVN2*t22;
    const t24 = RVB1*RVB2;
    const t25 = RVN1*(RINB + RVB2);
    const t26 = RINB*(RVN2 + t14) + RVB2*(RVB1 + RVN2) + t25;
    const t27 = C2*(RINN*t26 + RVN2*(t24 + t25) + t23);
    const t28 = C3*t12;
    const t29 = RVB2 + RVN1;
    const t30 = t15*t3 + t18;
    const t31 = C4*(RINN*t30 + RVN2*(t18 + t29*t3));
    const t32 = t22 + t24;
    const t33 = t25*t3;
    const t34 = RINB*(t18 + t3*(RVB2 + RVN2)) + RVB2*(RVN2*t3 + t18) + t33;
    const t35 = C4*t34;
    const t36 = C1*t32;
    const t37 = RVB2*t18;
    const t38 = RINB*t19;
    const t39 = C4*(t37 + t38);
    const t40 = C1*t39;
    const t41 = t0*t40 + t13*(t20 + t36);
    const t42 = RT1*RVB2;
    const t43 = RVB1*(RINB*(RT1 + RVB2) + t42);
    const t44 = t12*t42;

    // Numerator
    const a0 = 0;
    const a1 = C1*RL*t1;
    const a2 = t7*(C2*(RINN*RVN1 + RVN2*(RINN + RVN1)) + t0*t5);
    const a3 = t7*(t0*t8 + t13*t5);
    const a4 = t13*t7*t8;

    // Denominator
    const b0 = RL*t14 + t0*(RL + t14);
    const b1 = C2*(RINN*t17 + RVN2*(RL*(RVN1 + t14) + RVN1*t14)) + C3*(RL*(RT2*RVB2 + RVB1*(RT2 + t0) + t0*(RT2 + RVB2)) + RT2*t16) + C4*RVB1*(RL*t15 + t1) + t17*(C4*RT1 + C1*RINB) + t6*(RL*(RVB1 + t0) + RVB1*t0);
    const b2 = RL*(C2*(t14*t28 + t31) + C1*t27 + C1*(t21*t32 + t35) + t20*t21) + t2*(C1*(RL*t26 + RVN2*t24 + t23) + RL*(C2*(RINN*RVB1 + RVB2*t10 + RVN2*(RINN + RVB1) + t11) + C4*t30) + RVN1*t36 + t0*t20 + t13*t14) + t41;
    const b3 = RL*(C3*t13*t20 + C1*(C2*(C4*(RINN*t34 + RVN2*t38 + RVN2*(t33 + t37)) + t28*t32) + t21*t39)) + t13*t40 + t2*(RL*(C2*t31 + C1*(t27 + t35)) + t41);
    const b4 = C2*C3*C4*C1*(RL*t12*(RINB*t42 + t43) + RT2*(RINB*t44 + RL*(RINB*RT1*(t10*t29 + t9) + RVB1*(RINB*(t10*(RT1 + t29) + t9) + RVB2*(t10*(RT1 + RVN1) + t9)) + t44) + t12*t43));

return [
      [a0, a1, a2, a3, a4],
      [b0, b1, b2, b3, b4]
    ];
  }
}