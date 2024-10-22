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
        C3: 500e-12,
        C4: 5e-9
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
    // Optimized operations: 300 (8.50x less)
    const t0 = RVN2 + RVN1;
    const t1 = RL*t0;
    const t2 = C1*RVB2;
    const t3 = C4*RT2;
    const t4 = RT1 + RVB1;
    const t5 = C3*t4;
    const t6 = t3 + t5;
    const t7 = RL*t2;
    const t8 = t0*t3;
    const t9 = RINN*RVN2;
    const t10 = RINN + RVN2;
    const t11 = RVN1*t10;
    const t12 = t11 + t9;
    const t13 = C2*t12;
    const t14 = RVB1 + RVB2;
    const t15 = C1*RINB;
    const t16 = t14*t15;
    const t17 = RT1*t14;
    const t18 = RVB1*RVB2;
    const t19 = RVB2 + t0;
    const t20 = C3*RT1;
    const t21 = C2*(t10*(RVN1 + t14) + t9);
    const t22 = RT2 + t0;
    const t23 = RVB1*t3;
    const t24 = t0*t2;
    const t25 = RT2*RVN1;
    const t26 = C2*RVN2;
    const t27 = RVB2*t22;
    const t28 = RT2*RVN2 + t25 + t27;
    const t29 = C2*RINN;
    const t30 = RT1*RVB1;
    const t31 = RVB2*t4 + t30;
    const t32 = t0*t31;
    const t33 = RVB2 + RVN1;
    const t34 = RT1*t19 + RVB1*(RT1 + t19);
    const t35 = RINB*t13;
    const t36 = RL*t20;
    const t37 = RINB*RVB2;
    const t38 = t13*t37;
    const t39 = RINB*t10;
    const t40 = C2*RVB2;
    const t41 = t0*t20;
    const t42 = RINB + RVB2;
    const t43 = RT1*t42 + t37;
    const t44 = C3*t13;
    const t45 = t13*t42;
    const t46 = t0*t43;
    const t47 = t10*(RT1 + RVN1) + t9;
    const t48 = RINB*t47 + RVB2*(t39 + t47);
    const t49 = t17 + t18;
    const t50 = RT1*RVB2;
    const t51 = RT1*t12;
    const t52 = C2*C3;
    const t53 = RINB*RINN + RVN2*(RINB + RINN) + t11;
    const t54 = t12*(RT1*(RVB1*t42 + t37) + RVB1*t37);

    // Numerator coefficients
    const b0 = 0;
    const b1 = t1*t2;
    const b2 = t7*(C2*(RINN*RVN1 + RVN2*(RINN + RVN1)) + t0*t6);
    const b3 = t7*(t13*t6 + t5*t8);
    const b4 = C2*t3*t5*t7*(RINN*t0 + RVN2*RVN1);

    // Denominator coefficients
    const a0 = t1 + t14*(RL + t0);
    const a1 = RL*(C1*(RINB*(RVB2 + RVN2) + RVB2*RVN2) + RVB1*(C3*t19 + C4*t22 + t15 + t2) + RVB2*(C4*RVN2 + RVN1*(C1 + C4)) + RVN1*t15 + t19*t3 + t20*(t0 + t14) + t21) + t0*(C3*t17 + t14*t3 + t16 + t18*(C1 + C3)) + t13*t14;
    const a2 = C3*(C4*(RL*(RT1*t28 + RVB1*(RT1*RT2 + t0*(RT1 + RT2) + t27)) + RT2*t32) + RL*(t15*t34 + t2*(t0*t4 + t30) + t26*(t30 + t33*t4) + t29*t34) + t13*t31 + t15*t32 + t24*t30) + RL*(C2*t2*(t10*(RVB1 + RVN1) + t9) + C4*(RT2*t24 + RVB1*(C2*(RINN*RT2 + RVN2*(RINN + RT2) + t11) + t2*t22) + t15*(RT2*RVB1 + t0*(RT2 + RVB1) + t27) + t26*(RVB2*(RT2 + RVN1) + t25) + t28*t29) + t15*t21) + t13*(RVB2*(C1*RVB1 + t3) + t23) + t16*(t13 + t8) + t23*t24;
    const a3 = C1*(C4*RL*t37*(t13 + t41) + RVB1*(RL*(C3*(C2*t48 + C4*t46) + C4*t45) + t43*t44) + t20*t38 + t35*t36 + t36*t40*(t12 + t39)) + C4*(RL*t44*t49 + RT2*(C1*RL*(RVB1*(C2*t39 + C3*(t37 + t42*(RT1 + t0)) + t10*t40) + t20*(t0*t42 + t37) + t35 + t40*t53) + C1*(RVB1*(C3*t46 + t45) + t37*t41 + t38) + t52*(RL*(RVB1*(t10*(RT1 + t33) + t9) + t10*t50 + t51) + t12*t49)));
    const a4 = C1*C4*t52*(RL*(RT2*(RINB*t51 + RVB1*t48 + t50*t53) + t54) + RT2*t54);

    return [
      [b0, b1, b2, b3, b4],
      [a0, a1, a2, a3, a4]      
    ];
  }
}