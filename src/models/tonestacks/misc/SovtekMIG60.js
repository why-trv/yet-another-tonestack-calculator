import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class SovtekMIG60 extends BaseTonestack {
  static definition() {
    return {
      id: 'mig60',
      name: 'Sovtek MIG-60',
      description: 'Based on <a href="https://el34world.com/charts/Schematics/files/Sovtek/Sovtek_mig60.pdf" rel="noopener noreferrer">this schematic</a>. Note that in the original, the stack is plate-driven, unlike Marshalls.',
      schematic: 'SovtekMIG60',
      components: {
        RIN: 77e3,
        RL: 500e3,
        RB: 1e6,
        RM: 25e3,
        RT: 250e3,
        R1: 56e3,
        C1: 0.47e-9,
        C2: 33e-9,
        C3: 22e-9,
        C4: 0.47e-9,
      },
      controls: {
        RB: {
          taper: Tapers.LogA,
          role: PotRole.VR,
        },
        RM: Tapers.Linear,
        RT: Tapers.Linear,
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, R1, RB, RM1, RM2, RT1, RT2, RL, C1, C2, C3, C4 } = this.extractCoefficientVariables(controlValues);

    // Refactored using sympy to reduce the number of operations. 
    // Original operations: 1706 (*, +, -)
    // Optimized operations: 223 (7.65x less)
    const t0 = C1*RT2;
    const t1 = C3*RM2;
    const t2 = C1 + C2;
    const t3 = RB + RM1;
    const t4 = C3 + C4;
    const t5 = C2*t3;
    const t6 = RT1 + RT2;
    const t7 = C2*t6;
    const t8 = C2 + C3;
    const t9 = R1*t8;
    const t10 = RT2 + t3;
    const t11 = t10*t9 + t3*t7;
    const t12 = RM2 + RT2;
    const t13 = C4*RM2;
    const t14 = C1*RL;
    const t15 = RL*t3;
    const t16 = C2*C4*t1;
    const t17 = RL + t3;
    const t18 = t12 + t17;
    const t19 = RL + RT2;
    const t20 = t19 + t3;
    const t21 = C3 + t2;
    const t22 = C2*RT2;
    const t23 = RL + RT1;
    const t24 = RM2*t23;
    const t25 = RIN*RM2;
    const t26 = RIN + RM2;
    const t27 = RIN*RT2;
    const t28 = RIN + RT2;
    const t29 = RM2*t28 + t27;
    const t30 = C1*t8;
    const t31 = C1*RT1;
    const t32 = C2*t28;
    const t33 = C1*RIN;
    const t34 = C3*RIN + t33;
    const t35 = R1 + RIN;
    const t36 = C3*t35;
    const t37 = C2*C3;
    const t38 = C3*t26;
    const t39 = R1*RT1;
    const t40 = R1 + RT1;
    const t41 = RIN*t40 + t39;
    const t42 = R1 + t6;
    const t43 = R1*RT2 + t39;
    const t44 = C2*t41;
    const t45 = C1*t1;
    const t46 = RIN + RT1;
    const t47 = R1*RIN;

    const b0 = 0;
    const b1 = RL*(t0 + t1 + t2*(RM2 + t3));
    const b2 = RL*(C1*(RM2*(C3*RT1 + t10*t4 + t7 + t9) + t11) + RM2*t4*t5);
    const b3 = t14*(C3*t5*(R1*t12 + RM2*t6) + t11*t13);
    const b4 = R1*t0*t15*t16;
    const a0 = t18;
    const a1 = C1*(RT1*t17 + RT2*t23 + t15 + t24) + RIN*t18*t21 + RM2*(C2*RL + C3*t20 + t22) + t13*t20 + t18*t9 + t19*t5;
    const a2 = t0*t25*t8 + t13*(RB*(t32 + t34) + RL*(C1*RB + C2*(RB + RIN) + t0 + t31 + t34) + RM1*(C2*(t19 + t35) + t14 + t31 + t33 + t36) + t21*t27 + t31*(RB + RT2) + t9*(RB + t19)) + t3*(R1*(RL*(C1*C3 + C2*(C1 + C3)) + t12*t37 + t31*t8 + t33*t8) + RL*(C1*(t22 + t38) + C2*(t31 + t38)) + t29*t37 + t31*(t32 + t38) + t33*(t1 + t22)) + t30*(R1*(RL*(RIN + t6) + RT1*RT2 + t24 + t25 + t27) + RL*t26*t6 + RT1*t29);
    const a3 = t13*t30*(RL*(RIN*t42 + t43) + RT2*t41) + t3*(C1*(t13*(C3*t41 + RL*(C2*t40 + t22 + t36) + t22*t46 + t44) + t37*(RL*(t26*t42 + t43) + RT2*(RM2*t46 + t41))) + t16*t19*t35 + t44*t45);
    const a4 = C4*t45*t5*(RL*(t35*t6 + t47) + RT2*(RT1*t35 + t47));

    return [
      [b0, b1, b2, b3, b4],
      [a0, a1, a2, a3, a4]
    ];
  }
}