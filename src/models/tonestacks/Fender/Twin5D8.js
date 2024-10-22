import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class Twin5D8 extends BaseTonestack {
  static definition() {
    return {
      id: '5d8',
      name: 'Twin 5D8',
      description: 'Apparently also used in 5D7 Bandmaster. This tonestack is like James with a couple extra parts. <a href="https://schematicheaven.net/fenderamps/twin_5d8_schem.pdf" rel="noopener noreferrer">Original schematic</a>',
      components: {
        RIN: 552,
        R1: 270e3,
        R2: 56e3,
        R3: 270e3,
        R4: 270e3,
        RB: 2e6,
        RT: 1e6,
        RL: 1e6,
        C1: 100e-9,
        CB1: 100e-12,
        CB2: 4.7e-9,
        CT1: 0.22e-9,
        CT2: 3e-9,
      },
      controls: {
        RB: Tapers.LogA,
        RT: Tapers.LogA,
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, R1, R2, R3, R4, RB1, RB2, RT1, RT2, RL, C1, CB1, CB2, CT1, CT2 } = this.extractCoefficientVariables(controlValues);

    // Automatic circuit analysis done using Lcapy.
    // Expanded coefficients refactored refactored using sympy to reduce the number of operations. 
    // Original operations: 8469 (*, +, -)
    // Optimized operations: 676 (12.53x less)
    const t0 = R1 + R3;
    const t1 = RB1 + t0;
    const t2 = CT1*R4;
    const t3 = R2 + RB2;
    const t4 = C1*R3;
    const t5 = CT1*(R4 + t1);
    const t6 = CB2*RB2;
    const t7 = RB1*t3;
    const t8 = CB1*t7;
    const t9 = R2 + RB1;
    const t10 = t0 + t9;
    const t11 = R1 + RB1;
    const t12 = t0 + t3;
    const t13 = CB1*RB1;
    const t14 = t12*t13 + t4*(t11 + t3);
    const t15 = RB2*t1;
    const t16 = RT1 + t11;
    const t17 = t3*t4;
    const t18 = R1*t3;
    const t19 = R3*t3;
    const t20 = CT2*RT2;
    const t21 = R1*R4;
    const t22 = R1 + R4;
    const t23 = RT1 + t22;
    const t24 = CT1*t4;
    const t25 = t24*(t21 + t23*t3);
    const t26 = CT1*t16 + t13;
    const t27 = CT1*R2;
    const t28 = R2 + t11;
    const t29 = R2 + t0;
    const t30 = R3 + RB1;
    const t31 = t24*t6;
    const t32 = t13*(R2*t23 + t21);
    const t33 = R4*RB1;
    const t34 = R4*t0;
    const t35 = R4 + t0;
    const t36 = CT1*t35;
    const t37 = CT1*RL;
    const t38 = t37*t4;
    const t39 = RB2 + t1;
    const t40 = RB1 + RL;
    const t41 = CT2*RL;
    const t42 = R1 + RB2;
    const t43 = RL + t22;
    const t44 = R4 + t3;
    const t45 = RB2*t22;
    const t46 = R2*R4;
    const t47 = R2 + R4;
    const t48 = R1*t47;
    const t49 = t46 + t48;
    const t50 = t45 + t49;
    const t51 = RL + t47;
    const t52 = R2*RL;
    const t53 = R1*t51 + t46 + t52;
    const t54 = R4 + RL;
    const t55 = t3 + t54;
    const t56 = R3*t55 + t53;
    const t57 = RB2*t43 + t56;
    const t58 = C1 + CT1;
    const t59 = RIN*t58;
    const t60 = R3 + RIN;
    const t61 = RL*t47;
    const t62 = CT1*RT1;
    const t63 = t22 + t40;
    const t64 = t11*t4;
    const t65 = R3*RIN;
    const t66 = RL*t60 + t65;
    const t67 = RB1 + t22;
    const t68 = C1*t27;
    const t69 = t67*t68;
    const t70 = R3 + RL;
    const t71 = C1*RIN;
    const t72 = CT1*t71;
    const t73 = t67*t72;
    const t74 = RL*t1;
    const t75 = R2*R3;
    const t76 = R4*(R2 + R3);
    const t77 = t48 + t75 + t76;
    const t78 = R2*t40 + t33 + t74 + t77;
    const t79 = R3*R4;
    const t80 = R3*RB1;
    const t81 = R1*(R3 + R4);
    const t82 = RB1*t55;
    const t83 = RL*(R1 + t3) + t50;
    const t84 = RB2*t35;
    const t85 = t77 + t84;
    const t86 = RL*t12 + t85;
    const t87 = RL*t29 + t77;
    const t88 = t6*t87;
    const t89 = R4*RT2;
    const t90 = R4 + RT2;
    const t91 = RL*t90 + t89;
    const t92 = t4*t91;
    const t93 = t11*t92;
    const t94 = t59*t91;
    const t95 = t0 + t90;
    const t96 = RT2 + t47;
    const t97 = R1*t96;
    const t98 = R2*RT2;
    const t99 = R3*(R2 + RT2) + t98;
    const t100 = t76 + t97 + t99;
    const t101 = RT2*t48;
    const t102 = RT2*t75 + RT2*t76 + t101;
    const t103 = RL*(RB2*t95 + t100) + RT2*t84 + t102;
    const t104 = RL*RT2;
    const t105 = RB1 + RT2;
    const t106 = RB1*RT2;
    const t107 = R1*RT2 + t89;
    const t108 = t106 + t107;
    const t109 = RL*(t105 + t22) + t108;
    const t110 = R3*RT2;
    const t111 = RL*(t1 + t90) + t108 + t110;
    const t112 = t104*t5 + t109*t4 + t111*t59;
    const t113 = R2*t112;
    const t114 = t89 + t98;
    const t115 = RB1*(RB2*RT2 + RL*(t3 + t90) + t114);
    const t116 = RL*t100 + t102;
    const t117 = CB2*(RB1*(RL*t96 + t114) + t116);
    const t118 = RL*t22;
    const t119 = RT1*t11;
    const t120 = R3 + t47;
    const t121 = R3*t46 + R3*t48 + RL*(R1*t120 + t76);
    const t122 = C1*CT1*t6;
    const t123 = t22*t68;
    const t124 = t22*t72;
    const t125 = RL*(R1 + R2) + t49;
    const t126 = R3*t21;
    const t127 = RL*t21;
    const t128 = t37*t89;
    const t129 = R3 + RT2;
    const t130 = RIN*t110 + RL*(RIN*t129 + t110);
    const t131 = RL*t129 + t110;
    const t132 = R3*t89;
    const t133 = RT2*t80;
    const t134 = R4*t129;
    const t135 = R1*(t110 + t134);
    const t136 = t1*t91;
    const t137 = t111*t71;
    const t138 = RT2 + t22;
    const t139 = RT2*t46 + t101;
    const t140 = RL*(RB2*t138 + t46 + t97 + t98) + RT2*t45 + t139;
    const t141 = t0*t128;
    const t142 = RIN*t0;
    const t143 = t104*t36 + t4*(RL*t138 + t107) + t59*(RL*t95 + t107 + t110);
    const t144 = CB2*t116;
    const t145 = t122*t13;
    const t146 = t104*t21;
    const t147 = RT2*t118;
    const t148 = t134 + t99;
    const t149 = R3*RL;
    const t150 = R1*R3;

    const b0 = 0;
    const b1 = RL*(t1*t2 + t3*(t4 + t5));
    const b2 = RL*(CT1*(CB2*R2*t15 + t0*t8 + t16*t17) + t2*(t10*t6 + t14) + t20*(CT1*(R4*(t1 + t3) + t18 + t19 + t7) + t17) + t4*(R2*t6 + t8));
    const b3 = RL*(t13*t25 + t20*(CT1*(R4*t14 + t13*t18 + t13*t19) + t17*t26) + t6*(R2*t26*t4 + t0*t13*t27 + t2*(t13*t29 + t28*t4) + t20*(R2*(CT1*R1 + t4) + t10*t2 + t27*t30)));
    const b4 = RL*(t20*(t13*(t25 + t6*(CT1*t34 + R2*(t36 + t4))) + t31*(R2*(RB1 + t23) + t21 + t33)) + t31*t32);
    const b5 = t20*t32*t38*t6;
    const a0 = R2*(t35 + t40) + R4*t39 + RL*t39 + t15;
    const a1 = R2*(t35*t41 + t4*t43) + R4*(t4*t42 + t41*(RB2 + t0)) + RB1*(C1*t55*t60 + CT1*RB2*(RIN + RL) + CT1*(RIN*t51 + t61) + t41*t44) + RB2*t0*t41 + t13*t57 + t37*(R3*t44 + t50) + t4*(R1*RB2 + RL*t42) + t57*t59 + t6*(t30*t51 + t53) + (t20 + t62)*(RB1*t51 + RB2*t63 + t56);
    const a2 = CT1*(RT1*(t4*(t82 + t83) + t6*t78 + t71*(t82 + t86)) + t71*(RL*(R4*t30 + t80 + t81) + t11*t79)) + CT2*(CT1*t74*t89 + RB2*(t112 + t117) + t1*t94 + t103*t13 + t113 + t62*(t103 + t115) + t93) + RB2*(CB2*(t2*t74 + t4*(R2*RB1 + R4*t9 + RL*t28 + t48) + t5*t52 + t59*t78) + t38*t67 + t70*t73) + RL*t2*t64 + t13*(CT1*(RL*t85 + RT1*t86) + R1*t4*t54 + t17*t43 + t59*t86 + t88) + t66*t69;
    const a3 = CT2*(CT1*(RT1*(R2*t137 + RB2*(t117 + t137) + t136*t71 + t4*(t115 + t140)) + t71*(RL*(R4*(R3*t105 + t106) + t133 + t135) + t11*t132)) + RB2*(CB2*t113 + CB2*(t1*(t128 + t94) + t93) + t104*t24*t67 + t131*t73) + t128*t64 + t13*(R1*t92 + R2*t143 + RB2*(t143 + t144) + t103*t62 + t141 + t142*t58*t91) + t130*t69) + t122*(R3*(R4*t119 + RL*(R1*(R4 + RT1) + RB1*RT1)) + RIN*(RB1*(RL*t120 + t75 + t79) + RT1*t78 + t121) + t61*t80 + t75*(RT1*t63 + t118)) + t13*(CT1*(RT1*(t71*t86 + t88) + t4*(RT1*t83 + t127) + t71*(RL*(t79 + t81) + t126)) + RB2*(CB2*(t125*t4 + t37*t77 + t59*t87) + t118*t24 + t124*t70) + t123*t66);
    const a4 = CT2*(t122*(R3*(t119*t91 + t146) + RIN*(R2*(RT1*t111 + t132) + RB1*(RL*t148 + t110*t47) + RL*(R1*t148 + R4*t99) + RT1*t136 + t110*t48) + t133*t61 + t75*(RT1*t109 + t147)) + t13*(CT1*(RT1*(RB2*t144 + t103*t71) + t4*(RT1*t140 + t146) + t71*(RL*(t132 + t135) + t110*t21)) + RB2*(CB2*(RT2*t36*t52 + t116*t59 + t141 + t4*(RL*(R2*t90 + t97) + t139)) + t124*t131 + t147*t24) + t123*t130)) + t145*(R3*(RL*t49 + RT1*t125) + RIN*(RT1*t87 + t121));
    const a5 = CT2*t145*(R2*t22*(RIN*(RT2*t70 + t149) + RL*t110) + RT1*(R2*(RL*(RIN*t35 + t150 + t79) + RT2*(R3*(R4 + RIN) + RIN*t43 + t149 + t150)) + (t142 + t150)*(R4*(RL + RT2) + t104)) + RT2*(RL*(RIN*(t150 + t34) + t126) + t21*t65) + t127*t65);

    return [
      [b0, b1, b2, b3, b4, b5],
      [a0, a1, a2, a3, a4, a5]
    ];
  }
}