import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class BossFZ2EQ extends BaseTonestack {
  static definition() {
    return {
      id: 'fz2e',
      name: 'Boss FZ-2 EQ',
      schematic: 'BossFZ2EQ',
      description: 'Opamp bias voltage node V<sub>B</sub> is virtually equivalent to ground for the purpose of AC analysis',
      components: {
        RIN: 1e3,
        RL: 50e3,
        RB: 50e3,
        RT: 50e3,
        R1: 100e3,
        R2: 10e3,
        R3: 10e3,
        R4: 3.3e3,
        R5: 3.3e3,
        R6: 100e3,
        C1: 47e-12,
        C2: 10e-6,
        C3: 15e-9,
        C4: 150e-9,
        C5: 47e-9,
      },
      controls: {
        RB: Tapers.Linear,
        RT: Tapers.Linear,
      },
      magnitudePlotRange: [-24, 24]
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, RL, R1, R2, R3, R4, R5, R6, RB2, RB1, RT2, RT1, C1, C2, C3, C4, C5
    } = this.extractCoefficientVariables(controlValues);

    // Automatic circuit analysis done using QSapecNG.
    // Expanded coefficients refactored using sympy to reduce the number of operations.
    // Original operations: 6346 (*, +, -)
    // Optimized operations: 245 (25.90x less)
    const t0 = RT1 + RT2;
    const t1 = RB1 + RB2;
    const t2 = C2*RL;
    const t3 = R1*t2;
    const t4 = R3*RB2;
    const t5 = R5*RB1;
    const t6 = R5 + RB1;
    const t7 = RB2*t6;
    const t8 = C4*t0;
    const t9 = RT2*(R3 + RT1);
    const t10 = C1*R3;
    const t11 = C5*R5;
    const t12 = t10 + t11;
    const t13 = RB1*RB2;
    const t14 = t1*(C4 + C5);
    const t15 = R6*RB1;
    const t16 = R6 + RB1;
    const t17 = RB2*t16;
    const t18 = R4*t0;
    const t19 = RT1*RT2 + t18;
    const t20 = R5*t14;
    const t21 = RB1*(R6 + RB2);
    const t22 = R6*RB2 + t21;
    const t23 = C3*t19;
    const t24 = R3 + R6;
    const t25 = C3*C4;
    const t26 = t10*t11;
    const t27 = R1 + RIN;
    const t28 = t1*t27;
    const t29 = t0*t28;
    const t30 = R4*t27;
    const t31 = RT2*(R4 + RT1);
    const t32 = R1*RIN;
    const t33 = R2*t27;
    const t34 = t32 + t33;
    const t35 = C3*t1*(RT1*t30 + RT1*t34 + t27*t31);
    const t36 = t12 + t2;
    const t37 = t27*(R2 + R5) + t32;
    const t38 = RB1*t37 + t27*t7;
    const t39 = t12*t2 + t26;
    const t40 = t17*t27;
    const t41 = t27*(R2 + R6) + t32;
    const t42 = RB1*t41;
    const t43 = t11*t42;
    const t44 = t10*t38;
    const t45 = t11*t40 + t2*t38 + t43 + t44;
    const t46 = RT2*t38;
    const t47 = t34*t5 + t34*t7 + t46;
    const t48 = t2*t26;
    const t49 = t11*(t40 + t42);
    const t50 = t10*t43 + t2*(t44 + t49) + t26*t40;
    const t51 = t27*(R2 + RT2) + t32;
    const t52 = R6*t34;
    const t53 = RB1*(R5*t10*t34 + RT2*(t10*t37 + t11*t33 + t11*(R6*t27 + t32)) + t11*t52) + RB2*t51*(t10*t6 + t11*t16);
    const t54 = R1*R2 + RIN*(R1 + R2);
    const t55 = RB1*t54;

    const b0 = 0;
    const b1 = t0*t1*t3;
    const b2 = t3*(t1*(C3*t9 + t0*(C3*R4 + t12)) + t8*(t4 + t5 + t7));
    const b3 = t3*(C3*(C4*RB2*(R3*(RT2*(RB1 + RT1) + t18) + RB1*t19) + t1*t10*t19 + t20*(R3*RT2 + t19)) + R5*t0*(C4*C5*(t15 + t17 + t4) + t10*t14) + t10*t13*t8);
    const b4 = t3*(t10*(t11*t22*t8 + t23*(C4*t13 + t20)) + t11*t25*(RB2*(RT2*(R3*R6 + RT1*t24) + t18*t24) + t21*(t18 + t9)));
    const b5 = C4*t23*t26*t3*(R6*t1 + t13);

    const a0 = t29;
    const a1 = t0*(C4*t38 + t28*t36) + t35;
    const a2 = C4*(C3*(R4*RT1*t38 + R4*t46 + RT1*t47) + t0*t45) + t29*t39 + t35*t36;
    const a3 = C4*(C3*(RT1*(t2*t47 + t53) + t18*t45) + t0*t50) + t29*t48 + t35*t39;
    const a4 = C4*(C3*(RT1*(RB1*t26*(RT2*t41 + t52) + t17*t26*t51 + t2*t53) + t18*t50) + t0*t10*t2*t49) + t35*t48;
    const a5 = t25*t48*(RT1*(R4*t55 + t22*(t30 + t54)) + t31*(t15*t27 + t40 + t55));

    return [
      [b0, b1, b2, b3, b4, b5],
      [a0, a1, a2, a3, a4, a5]
    ];
  }
}
