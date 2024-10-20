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
    // Optimized operations: 278 (9.00x less)
    const t0 = RVB1 + RVB2;
    const t1 = C2*t0;
    const t2 = RL*RVN2;
    const t3 = C3*RT2;
    const t4 = t0*t3;
    const t5 = RT1*RVB2;
    const t6 = RT1 + RVB2;
    const t7 = RINB*RVB2;
    const t8 = RINB + RVB2;
    const t9 = RVB1*t8;
    const t10 = t7 + t9;
    const t11 = C1*t10;
    const t12 = C4*(RVB1*t6 + t5) + t11;
    const t13 = C2*t2;
    const t14 = RINB*t5;
    const t15 = C4*C1;
    const t16 = RINB*RVB1;
    const t17 = RT1*t16;
    const t18 = RINB + RVB1;
    const t19 = RVN1 + RVN2;
    const t20 = RINN*RVN2;
    const t21 = RINN + RVN2;
    const t22 = RVN1*t21;
    const t23 = t20 + t22;
    const t24 = RT1*t0;
    const t25 = RVB1*RVB2;
    const t26 = RINN*RVB1;
    const t27 = C4*RL;
    const t28 = t27*(t24 + t25);
    const t29 = RL + RVB2;
    const t30 = RT1*(RL + t0) + RVB1*t29;
    const t31 = RL*RVB2;
    const t32 = C4*t30 + C1*(RINB*t29 + t31 + t9);
    const t33 = RL*t11 + t28;
    const t34 = RL*t4;
    const t35 = C3*(RT2*t29 + RVB1*(RL + RT2) + t31) + t32;
    const t36 = RT1*RVB1;
    const t37 = RT1 + RVB1;
    const t38 = RVB2*t37;
    const t39 = t36 + t38;
    const t40 = RINN*RVN1;
    const t41 = RINN + RVN1;
    const t42 = RVN2*t41 + t40;
    const t43 = C2*t42;
    const t44 = RT1 + t41;
    const t45 = C2*C3;
    const t46 = t43*(RVB2*t18 + t16);
    const t47 = RINB*t37;
    const t48 = RVB2*(t36 + t47) + t17;
    const t49 = RVB1*t21 + t42;
    const t50 = RT1*(RVB1 + RVN1);
    const t51 = RINN*t50 + RVN1*t26 + RVN2*(RT1*t41 + RVB1*t44);
    const t52 = t21*t47;
    const t53 = RT1*t23;
    const t54 = RVB1*(t20 + t21*(RT1 + RVN1)) + t53;

    // Numerator
    const a0 = 0;
    const a1 = t1*t2;
    const a2 = t13*(t12 + t4);
    const a3 = t13*(t12*t3 + t15*(RVB1*(RINB*t6 + t5) + t14));
    const a4 = t13*t15*t3*(RVB2*(RT1*t18 + t16) + t17);

    // Denominator
    const b0 = RL*t19 + t0*(RL + t19);
    const b1 = C1*RINB*t0*t19 + RL*(C2*(RINN*RVB2 + RVN2*(RINN + t0) + t22 + t26) + C3*(RT2*RVB1 + RT2*RVB2 + t19*(RT2 + t0)) + C4*(RT1*(t0 + t19) + RVB1*(RVB2 + t19)) + C1*(t7 + t8*(RVB1 + t19))) + t1*t23 + t19*(C4*t24 + t25*(C4 + C1) + t4);
    const b2 = C2*(RINN*t34 + RINN*(t19*t35 + t33) + RVN2*(RVN1*t35 + t33 + t34)) + RL*t15*(RT1*t10 + RVB1*t7) + t19*(C3*t28 + C1*(C3*RL*t10 + C4*(RINB*t30 + RVB2*(RL*RVB1 + RT1*(RL + RVB1))))) + t3*(t19*t32 + t33);
    const b3 = C4*t3*t39*t43 + C1*(C4*t48*(t19*t3 + t43) + RL*(C2*t3*(RINB*t49 + RVB2*(RINB*t21 + t49)) + C3*t46 + C4*(C2*RINB*t51 + C2*RVB2*(t51 + t52) + C3*t19*t48 + t3*(RINB*(RT1*t19 + RVB1*(RT1 + t19)) + RVB2*(RT1*RVN2 + RVB1*t19 + t47 + t50)))) + t3*t46) + t27*t45*(RT2*(RT1*t42 + RVB1*(RINN*RT1 + RVN2*t44 + t40) + t21*t38) + t39*t42);
    const b4 = t15*t45*(RL*(RT2*(RINB*t54 + RVB2*(t52 + t54)) + RVB2*t23*(RINB*RT1 + RVB1*(RINB + RT1)) + t16*t53) + RT2*t23*(RVB1*(RT1*t8 + t7) + t14));

return [
      [a0, a1, a2, a3, a4],
      [b0, b1, b2, b3, b4]
    ];
  }
}