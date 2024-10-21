import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class Bandmaster6G7 extends BaseTonestack {
  static definition() {
    return {
      id: '6g7',
      name: 'Bandmaster 6G7',
      description: 'Vibrato channel tonestack. Normal channel is the same except for the lack of C<sub>4</sub> bright cap. The bright cap is effectively bypassed with R<sub>V</sub> on maximum',
      components: {
        RIN: 38e3,
        R1: 100e3,
        R2: 10e3,
        RB: 250e3,
        RT: 250e3,
        RV: 500e3,
        RL: 1e6,
        C1: 50e-9,
        C2: 0.25e-9,
        C3: 10e-9,
        C4: 47e-12,
      },
      controls: {
        RB: Tapers.LogA,
        RT: Tapers.Linear,
        RV: {
          taper: Tapers.Linear,
          default: 1,
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { 
      RIN, R1, R2, RB1, RB2, RT1, RT2, RV1, RV2, RL, C1, C2, C3, C4
    } = this.extractCoefficientVariables(controlValues);

    // Automatic circuit analysis done using Lcapy.
    // Expanded coefficients refactored using sympy to reduce the number of operations.
    // Original operations: 4407 (*, +, -)
    // Optimized operations: 376 (11.72x less)
    const t0 = R2*RB1;
    const t1 = R2 + RB1;
    const t2 = RB2*t1;
    const t3 = t0 + t2;
    const t4 = RL*RV2;
    const t5 = C1*t4;
    const t6 = R2 + RB2;
    const t7 = C4*RV1;
    const t8 = R1*RT2;
    const t9 = RT1 + RT2;
    const t10 = R1 + t9;
    const t11 = RT2*t1;
    const t12 = C2*R1;
    const t13 = C2*RT1;
    const t14 = t13 + t7;
    const t15 = C3*RB2;
    const t16 = RB2 + RT2;
    const t17 = C2*t7;
    const t18 = R1 + RT1;
    const t19 = R1*RB1;
    const t20 = R1 + RB1;
    const t21 = C2*RL;
    const t22 = RV1 + t16;
    const t23 = C1*RIN;
    const t24 = C1 + C2;
    const t25 = R1*t24;
    const t26 = t23 + t25;
    const t27 = t13 + t26;
    const t28 = R2*RL;
    const t29 = R2 + RT2;
    const t30 = RT2*t24;
    const t31 = RB1*RL;
    const t32 = RL + RV2;
    const t33 = RL*t0;
    const t34 = RB1 + RL;
    const t35 = R2*t34;
    const t36 = t31 + t35;
    const t37 = C2 + C4;
    const t38 = RT2*t37;
    const t39 = t1*t32;
    const t40 = RL + RT2;
    const t41 = R2*(RB1 + t40) + RB1*t40;
    const t42 = t2*t32;
    const t43 = R2*t4;
    const t44 = R2*t32;
    const t45 = RT1*t32;
    const t46 = R1*RL;
    const t47 = R1*t44 + RB1*(RV2*(R1 + RL) + t44 + t46) + t1*t45 + t43;
    const t48 = RV2*t34 + t31;
    const t49 = RT1*(R2*t48 + RV2*t31);
    const t50 = t4 + t44;
    const t51 = R1*R2;
    const t52 = t19*t50 + t4*t51 + t49;
    const t53 = t11*t32;
    const t54 = C4*t50;
    const t55 = R1 + RIN;
    const t56 = RB1*RIN;
    const t57 = RIN + t20;
    const t58 = R2*t57 + t19 + t56;
    const t59 = RT2*t32;
    const t60 = R2 + RIN;
    const t61 = RIN*RL;
    const t62 = RV2*t61;
    const t63 = RIN + RL;
    const t64 = RV2*t63 + t61;
    const t65 = R2*t64 + t62;
    const t66 = t45 + t64;
    const t67 = t2*t66;
    const t68 = R2*t62;
    const t69 = RB1*t65 + t68;
    const t70 = t11*t66 + t49;
    const t71 = t69 + t70;
    const t72 = t2*t64;
    const t73 = RT1*t69;
    const t74 = R2*(RB1 + RIN) + t56;
    const t75 = t45*t74 + t69;
    const t76 = RT2*(t67 + t75) + t73;
    const t77 = t51*(RIN*t21 + RV2*(C2*RIN + C4*RL));
    const t78 = t2 + t74;
    const t79 = C2*t32;
    const t80 = t54 + t60*t79;
    const t81 = t15*t17;
    const t82 = t32*t58;
    const t83 = R1*RIN;
    const t84 = R2*(RIN*(RT2*t20 + t19) + RT1*(RB1*t55 + RT2*t57)) + RB1*RT2*(RT1*t55 + t83);

    const b0 = 0;
    const b1 = t3*t5;
    const b2 = t5*(C2*(R2*(RB2*t10 + t8) + RB1*(t10*t6 + t8)) + R2*RB2*(C3*RB1 + t7) + RB1*t6*t7);
    const b3 = t5*(t15*(t0*(C2*RT2 + t14) + t12*(t0 + t11)) + t17*(R1*(t0 + t1*t16) + t3*t9));
    const b4 = C1*RV2*t15*t21*t7*(RT2*(R2*t20 + t19) + t0*t18);
    const a0 = RL*(t0 + t1*(RV2 + t22)) + RV2*(t0 + t1*t22);
    const a1 = RB2*(C3*(RT2*t31 + RV2*t41 + t28*(RB1 + RT2)) + t1*t5 + t39*(RV1*(C1 + C3) + t14 + t26 + t30)) + RT2*t27*t28 + RV1*(C1*t0*t32 + C4*(RV2*t36 + t33) + t39*(t27 + t38)) + RV2*(C1*t33 + RT2*(C2*t35 + RB1*(C1*R2 + t21) + t1*t13) + t13*t36 + t23*t41 + t25*t41) + t31*(R2*t30 + t13*t29 + t23*t29 + t25*t29);
    const a2 = C1*(C2*(RT1*t72 + t76) + RV1*(C4*(t59*t78 + t69 + t72) + R1*(RB1*t80 + t39*(t13 + t16*t37)) + t77 + t78*t79*t9) + t12*(t67 + t71) + t15*(R2*t55*(RL*RV1 + RV2*(RL + RV1)) + RB1*(R1*t50 + RV1*t32*(R1 + t60) + t65) + t58*t59)) + t15*(C2*(RT2*(R2*(t45 + t48) + RB1*(t4 + t45)) + t49) + RV1*(C4*t43 + RB1*(t12*t32 + t54) + t12*t44 + t13*t39 + t37*t53) + t12*(RB1*t50 + t43 + t53)) + t17*(RT2*(t42 + t47) + t18*t42 + t52);
    const a3 = C1*(t15*(C2*(RT2*t75 + t73) + RV1*(C4*t68 + RB1*(C4*t65 + R1*t80) + t13*t82 + t38*t82 + t77) + t12*t71) + t17*(R1*(t68 + t70) + t19*t65 + t2*(R1*t64 + RT1*(RV2*(R1 + t63) + t46 + t61)) + t76)) + t81*(RT2*t47 + t52);
    const a4 = C1*t81*(RL*t84 + RV2*(RL*(R2*(t19 + t57*t9 + t83) + RB1*(t55*t9 + t83)) + t84));

    return [
      [b0, b1, b2, b3, b4],
      [a0, a1, a2, a3, a4]
    ];
  }
}