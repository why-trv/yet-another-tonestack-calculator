import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class BigMuffPickle extends BaseTonestack {
  static definition() {
    return {
      id: 'muf3',
      name: 'Big Muff / Pickle',
      description: 'A la Swollen Pickle (R<sub>M</sub> = Scoop, R<sub>C</sub> = Voice)',
      schematic: 'BigMuffPickle',
      components: {
        RIN: 15e3,
        RL: 100e3,
        RC: 500e3,
        RM: 50e3,
        RT: 100e3,
        R1: 33e3,
        R2: 1.5e3,
        C1: 100e-9,
        C2: 3.3e-9,
        C3: 33e-9,
        C4: 1e-6,
      },
      controls: {
        RT: Tapers.Linear,
        RM: {
          taper: Tapers.Linear,
          role: PotRole.VR,
        },
        RC: {
          taper: Tapers.Linear,
          default: 0.01
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, R1, R2, RC1, RC2, RM, RT1, RT2, RL, C1, C2, C3, C4 } = this.extractCoefficientVariables(controlValues);

    // Expanded coefficients refactored using sympy to reduce the number of operations.
    // Original operations: 2727 (*, +, -)
    // Optimized operations: 294 (9.28x less)
    const t0 = R2 + RM;
    const t1 = RT1 + t0;
    const t2 = C4*RL;
    const t3 = RT1 + RT2;
    const t4 = R1 + t3;
    const t5 = t0*t4;
    const t6 = C2*RC2;
    const t7 = C3*RC1;
    const t8 = C2 + C3;
    const t9 = R1*t0;
    const t10 = C1*RT2;
    const t11 = C2*C3;
    const t12 = RL*RT2;
    const t13 = RC1 + RC2;
    const t14 = C3*t13;
    const t15 = C1*C2;
    const t16 = R1 + RIN;
    const t17 = t0 + t3;
    const t18 = t16 + t17;
    const t19 = t16*t17;
    const t20 = C1*t19;
    const t21 = RL*t18;
    const t22 = RT2 + t16;
    const t23 = R1*RIN;
    const t24 = RC2 + RIN;
    const t25 = R1 + RC1;
    const t26 = RC1 + RIN;
    const t27 = RC1*RIN;
    const t28 = R1*t26 + t27;
    const t29 = R2*RT2;
    const t30 = RM*RT2;
    const t31 = RIN*RT1;
    const t32 = RIN + RT1;
    const t33 = R1*t32 + t31;
    const t34 = R2*t33 + RM*t33;
    const t35 = t16*t29 + t16*t30 + t23*t3 + t34;
    const t36 = RIN + t0;
    const t37 = t36*t4;
    const t38 = C4*(R1*RT1 + R2*t22 + RM*t22 + RT1*RT2 + t21 + t31);
    const t39 = RL + RT2;
    const t40 = RIN*RT2;
    const t41 = RL*RT1;
    const t42 = RL + RT1;
    const t43 = RT2*t42 + t41;
    const t44 = C1*C4;
    const t45 = C3*t44;
    const t46 = RIN*RL;
    const t47 = RC2*t7;
    const t48 = C1*RIN;
    const t49 = RC2*t26 + t27;
    const t50 = C1*RT1;
    const t51 = RC2*t27;
    const t52 = C1*t51;
    const t53 = C4*t42;
    const t54 = RC1 + RT1;
    const t55 = t41 + t46;
    const t56 = C4*(t13*t42 + t49);
    const t57 = RT1*t39;
    const t58 = RIN + RT2;
    const t59 = R1*(RL*(R2*t58 + RM*t58 + t40) + t0*t40 + t36*t57) + RIN*t0*(t12 + t57);

    const b0 = 0;
    const b1 = t1*t2;
    const b2 = t2*(C2*t5 + C3*t5 + t1*(t6 + t7));
    const b3 = t2*(t10*t8*t9 + t11*(RC1*(R2*t3 + RC2*t1 + RM*t3 + t9) + RC2*t5));
    const b4 = C4*t12*t14*t15*t9;

    const a0 = t18;
    const a1 = C2*(R1*R2 + RC2*(R2 + t16) + t23) + C2*(R1*RM + RC2*RM + t3*(t0 + t24)) + C3*(R2*t25 + RM*t25 + t28 + t3*(t0 + t26)) + C4*t1*t22 + C4*t21 + t20;
    const a2 = C1*(C3*(RC1*t19 + t35) + C4*t16*(R2*RL + t12 + t29 + t39*(RM + RT1))) + C4*t8*(RL*t37 + t29*t32 + t30*t32 + t31*(R1 + RT2) + t34) + t15*t35 + t6*(C3*(R2*t4 + RC1*t18 + RM*t4 + t23 + t31 + t40) + t20 + t38) + t7*(C2*t37 + t38);
    const a3 = C2*(C3*(R1*t49*(t10 + t50 + t53) + RT2*(t49*t53 + t52) + t50*t51) + C4*(RT1*(RIN*t47 + RL*(C3*t49 + RC2*t48)) + t46*t47) + t44*(R1*t24*t43 + RC2*t40*t42)) + t0*(C2*(C3*(C1*t13*t31 + R1*(C1*(t13*t3 + t49) + t56) + RT2*(t13*t48 + t56) + t52) + C4*(C3*RIN*(RC1*RT1 + RC2*t54) + RL*(RC2*(t48 + t7) + RT1*(t14 + t48))) + t44*(R1*(RC2*t39 + RT2*(RL + t32) + t55) + t40*(RC2 + t42))) + t45*(R1*(RC1*RL + RT2*(t26 + t42) + t55) + RIN*(RL*t54 + RT2*(RC1 + t42)))) + t28*t43*t45;
    const a4 = t11*t44*(RC1*(RC2*t16*(RL*t17 + RT2*t1) + t59) + RC2*t59);

    return [
      [b0, b1, b2, b3, b4],
      [a0, a1, a2, a3, a4]
    ];
  }
}