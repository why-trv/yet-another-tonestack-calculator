import { Deluxe5E3Bright } from './Deluxe5E3Bright';

export class Deluxe5E3Normal extends Deluxe5E3Bright {
  static definition() {
    return {
      ...Deluxe5E3Bright.definition(),
      id: '5e3n',
      name: 'Deluxe 5E3 (Normal)',
      schematic: 'Deluxe5E3Normal'
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RINN, RINB, RL, C1, C2, C3, C4, RT2, RT1, RVN2, RVN1, RVB2, RVB1
    } = this.extractCoefficientVariables(controlValues);

    // Expanded coefficients refactored using sympy to reduce the number of operations.
    // Original operations: 2501 (*, +, -)
    // Optimized operations: 317 (7.89x less)
    const t0 = RVB1 + RVB2;
    const t1 = RL*RVN2;
    const t2 = C2*t1;
    const t3 = RT2*t0;
    const t4 = RVB1*RVB2;
    const t5 = RINB*t0 + t4;
    const t6 = RT1*RVB1;
    const t7 = RT1 + RVB1;
    const t8 = RVB2*t7;
    const t9 = t6 + t8;
    const t10 = C3*t9;
    const t11 = RT1*RVB2;
    const t12 = RT1 + RVB2;
    const t13 = C1*C3;
    const t14 = C1*RINB;
    const t15 = RINB + RVB2;
    const t16 = C4*RT2;
    const t17 = RT1*t4;
    const t18 = RT1*t0 + t4;
    const t19 = RINB*t18 + t17;
    const t20 = RVN1 + RVN2;
    const t21 = RL*t20;
    const t22 = RL + t20;
    const t23 = RL*RVN1;
    const t24 = RINN*t20 + RVN1*RVN2;
    const t25 = RL + RVN1;
    const t26 = RL*RVB2;
    const t27 = RT2*t20;
    const t28 = RT2 + t0;
    const t29 = RT2 + RVN1;
    const t30 = RT2*RVB2;
    const t31 = RT2 + RVB2;
    const t32 = RVN1*t31 + t30;
    const t33 = RVB2 + t20;
    const t34 = RVB1 + t20;
    const t35 = t0 + t20;
    const t36 = RVB2 + RVN1;
    const t37 = RVN1 + t0;
    const t38 = RINN*t35 + RVN2*t37;
    const t39 = RINN*RVB1;
    const t40 = RINN*t15;
    const t41 = RVB1 + RVN1;
    const t42 = RINB*RVB1;
    const t43 = RINB + RVB1;
    const t44 = t13*(RINB*t6 + RVB2*(RT1*t43 + t42));
    const t45 = C1*(RVB2*t43 + t42);
    const t46 = RVB1*RVN1;
    const t47 = RT1*t41 + t46;
    const t48 = C1*RVB2;
    const t49 = RINN*RVN1;
    const t50 = C4*t9;
    const t51 = RINN + RVN1;
    const t52 = RINN*t7 + t47;
    const t53 = RINN*(t47 + t8) + RVN2*(t52 + t8);
    const t54 = RT1*t34;
    const t55 = t19*(RVN2*t51 + t49);
    const t56 = t7*(RINN + RVN2);
    const t57 = RINN*t6 + RVN2*(RT1*(RINN + RVB1) + t39);

    // Numerator coefficients
    const b0 = 0;
    const b1 = t0*t2;
    const b2 = t2*(C1*t5 + C4*t3 + t10);
    const b3 = t2*(t13*(RINB*t11 + RVB1*(RINB*t12 + t11)) + t16*(RVB1*(C1*t15 + C3*t12) + RVB2*(C3*RT1 + t14)));
    const b4 = t13*t16*t19*t2;

    // Denominator coefficients
    const a0 = t0*t22 + t21;
    const a1 = C1*(RINB*(RL*RVB1 + t20*(RL + t0) + t26) + RVB2*(RVB1*t25 + RVN2*(RL + RVB1) + t23)) + C2*(RL*t24 + t0*(RINN*t22 + RVN2*t25)) + C3*(RT1*t21 + RVB1*(RT1*t22 + t20*(RL + RVB2) + t26) + t11*t22) + C4*(RT2*t21 + t0*(RT2*t22 + t1 + t23));
    const a2 = C1*C4*(RL*(RINB*RVN2*t28 + RINB*t32 + RVB1*t15*t29 + RVB2*(RT2*RVN1 + RVN2*(RT2 + RVB1))) + t27*t5) + C2*(C1*(RL*(RINN*(RINB*t36 + RVB2*RVN1) + RVB1*t40 + RVN2*(RINB*t37 + RVB2*t41 + t40)) + t24*t5) + C3*(RL*(RT1*t38 + RVB1*(RINN*t33 + RVN2*t36)) + t18*t24) + C4*(RL*(RINN*t32 + RVN2*(RINN*t28 + RVN1*t28 + t3) + t29*t39) + t24*t3)) + C3*(C1*(RL*(RT1*(RINB*t35 + RVB2*t34) + RVB1*(RINB*t33 + RVB2*t20)) + t19*t20) + C4*(RL*(RT1*(t20*t28 + t3) + RVB1*(t20*t31 + t30)) + t18*t27));
    const a3 = C2*(RL*(C3*(RINN*t47*t48 + RVN2*(t48*t52 + t50*t51) + t14*t53 + t49*t50) + C4*t24*t45) + t24*t44) + C4*(RT2*(C2*RL*(C1*(RINB*t38 + RVB2*(RINN*t34 + RVN2*t41)) + C3*t53) + C2*t24*(t10 + t45) + t13*(RINB*t20*t9 + RL*(RINB*(RVB1*RVN2 + t46 + t54 + t8) + RVB2*(RVB1*t20 + t54)) + t17*t20)) + t21*t44);
    const a4 = C2*C4*t13*(RL*(RT2*(RINB*t57 + RVB2*(RINB*t56 + t57) + RVN1*t15*t56) + t55) + RT2*t55);

    return [
      [b0, b1, b2, b3, b4],
      [a0, a1, a2, a3, a4]
    ];
  }
}