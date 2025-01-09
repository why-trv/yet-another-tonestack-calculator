import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class SovtekMIG100H extends BaseTonestack {
  static definition() {
    return {
      id: 'mig100h',
      name: 'Sovtek MIG-100H',
      description: 'Based on <a href="https://schematicheaven.net/newamps/sovtek_mig100h.pdf" rel="noopener noreferrer">this schematic</a>. An odd one, because R<sub>2</sub> = 100Ω is basically a short, effectively turning this into a Blackface-style stack. Note that in the original, the stack is plate-driven, unlike Marshalls.',
      schematic: 'SovtekMIG100H',
      components: {
        RIN: 77e3,
        RL: 500e3,
        RB: 1e6,
        RM: 10e3,
        RT: 500e3,
        R1: 47e3,
        R2: 100,
        R3: 33e3,
        C1: 0.47e-9,
        C2: 22e-9,
        C3: 22e-9,
      },
      controls: {
        RB: {
          taper: Tapers.LogA,
          role: PotRole.VR,
        },
        RM: Tapers.Linear,
        RT: Tapers.LogA,
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, R1, R2, R3, RB, RM1, RM2, RT1, RT2, RL, C1, C2, C3 } = this.extractCoefficientVariables(controlValues);

    // Refactored using sympy to reduce the number of operations. 
    // Original operations: 3472 (*, +, -)
    // Optimized operations: 310 (11.20x less)
    const t0 = R3*RM1;
    const t1 = C1 + C2;
    const t2 = R2*t1;
    const t3 = R3 + RM2;
    const t4 = R2 + RM1;
    const t5 = RT2*t4;
    const t6 = t3*t5;
    const t7 = RB*t3*t4;
    const t8 = C3 + t1;
    const t9 = RT1 + RT2;
    const t10 = R3 + RM1;
    const t11 = C1*C2;
    const t12 = RB + RM1;
    const t13 = R2*t12 + RB*RM1;
    const t14 = C2*t13;
    const t15 = RB + t9;
    const t16 = R3*RM2;
    const t17 = C3*t16;
    const t18 = RB + RT2;
    const t19 = RM1 + t18;
    const t20 = C2 + C3;
    const t21 = R1*t20;
    const t22 = R3*RT2;
    const t23 = R2 + RB;
    const t24 = C3*t11*(R2*RB + RM1*t23);
    const t25 = R3*RB;
    const t26 = RL + RT2;
    const t27 = RB + RL;
    const t28 = RM1*t27;
    const t29 = RL + t12;
    const t30 = R2*(R3*(RL + RM1 + RM2) + RM2*t29 + t25) + RM2*t28 + t0*(RM2 + t27) + t6;
    const t31 = RL*t3;
    const t32 = R2*RL;
    const t33 = RIN*RM2;
    const t34 = RT1*t18;
    const t35 = RIN + RM2;
    const t36 = RL*(R3*t35 + t33);
    const t37 = RB*RT1;
    const t38 = RT1*RT2;
    const t39 = RM2*RT2;
    const t40 = C3*(R3*(RIN*RT2 + RM2*(RIN + RT2)) + RIN*t39 + t36);
    const t41 = RB + RIN;
    const t42 = RL*t9;
    const t43 = RB*t38 + RIN*(RT2*(RB + RT1) + t37);
    const t44 = RM2*(RIN*t9 + t38);
    const t45 = RIN + RT1;
    const t46 = RM2*t45;
    const t47 = R3*t45;
    const t48 = R2 + t18;
    const t49 = RIN + t23;
    const t50 = t23 + t35;
    const t51 = RT1*t48;
    const t52 = t23 + t9;
    const t53 = RT1*t23;
    const t54 = RIN*(RT2*(RT1 + t23) + t53) + RT2*t53;
    const t55 = RM2*t22;
    const t56 = RT2*t3 + t16;

    const b0 = 0;
    const b1 = RL*(C1*t6 + RM2*(R3*t4*t8 + RM1*t2) + t0*t2 + t1*t7);
    const b2 = RL*(C1*t21*(R3*(R2*t19 + RM1*t18) + RM2*(R2*(t10 + t18) + RM1*(R3 + t18))) + t11*t9*(R2*(RM2*t10 + t0) + RM2*t0 + t7) + t17*(C1*(R2*(t12 + t9) + RM1*t15) + t14));
    const b3 = RL*t24*(R1*(RM2*(R3 + RT2) + t22) + t16*t9);
    const a0 = R2*(t16 + t3*(RL + t19)) + RM1*(t16 + t3*(RL + t18));
    const a1 = C1*RL*RM1*(RM2*(R3 + RB) + t25) + C1*(RT1*t30 + t31*t5 + t32*(RM2*(RB + t10) + t0 + t25)) + C2*R3*t26*(RM2*t4 + t13) + RIN*t30*t8 + RM2*t14*t26 + t17*(R2*t29 + t28 + t5) + t21*t30;
    const a2 = C1*C3*R2*(R3*(RIN*t34 + RM2*(RIN*t15 + t37 + t38)) + t15*t36 + t33*t34) + C2*R2*(C1*(R3*(t43 + t44) + RM2*t43 + t42*(R3*(RB + t35) + RM2*t41)) + RB*t40) + R1*(C1*t20*(R2*t18*t46 + R2*t47*(RM2 + t18) + RM1*(RL*(R3*(t50 + t9) + RM2*(t49 + t9)) + t46*t48 + t47*(RM2 + t48)) + t32*(R3*(t15 + t35) + RM2*(t41 + t9))) + C3*t14*(R3*(RM2 + RT2) + t31 + t39)) + RM1*(C1*(C2*(R3*(t44 + t54) + RM2*t54 + t42*(R3*t50 + RM2*t49)) + C3*(R3*(RIN*t51 + RM2*(RIN*t52 + t51)) + t33*t51 + t36*t52)) + C2*t23*t40);
    const a3 = t24*(R1*(RL*(t16 + t3*(RIN + t9)) + t45*t56) + RIN*(RT1*t56 + t55) + RT1*t55 + t42*(R3*RIN + RM2*(R3 + RIN)));

    return [
      [b0, b1, b2, b3],
      [a0, a1, a2, a3]
    ];
  }
}