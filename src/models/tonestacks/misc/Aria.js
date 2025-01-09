import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class Aria extends BaseTonestack {
  static definition() {
    return {
      id: 'aria',
      name: 'Aria',
      components: {
        RIN: 1e3,
        RL: 1e6,
        RB: 100e3,
        RM: 100e3,
        RT: 100e3,
        RT3: 220e3,
        RM3: 1e6,
        RB3: 33e3,
        RB4: 100e3,
        CT1: 1e-9,
        CT2: 1e-9,
        CB1: 220e-9
      },
      controls: {
        RB: Tapers.LogB,
        RM: Tapers.LogB,
        RT: Tapers.LogB
      },
      magnitudePlotRange: [-60, 0]
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, RT3, RM3, RB3, RB4, RL, CT1, CT2, CB1, RT2, RT1, RM2, RM1, RB2, RB1
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 11571 (*, +, -)
    // Optimized operations: 708 (16.34x less)
    const t0 = RM2*RM3;
    const t1 = RM2 + RM3;
    const t2 = RM1*t1;
    const t3 = t0 + t2;
    const t4 = RIN*t3;
    const t5 = RIN*t1;
    const t6 = t3 + t5;
    const t7 = RB1*RB2;
    const t8 = RB1 + RB2;
    const t9 = RB4*t8;
    const t10 = t7 + t9;
    const t11 = RT2*t10;
    const t12 = RB1*t3;
    const t13 = RB2*t12;
    const t14 = RM1 + RM2;
    const t15 = RT2*t3;
    const t16 = RT2*t14 + t3;
    const t17 = RM1 + RM3;
    const t18 = RT2*t17;
    const t19 = RB2*t6;
    const t20 = CT2*RT3;
    const t21 = RB3*RM1;
    const t22 = RB3 + RM1;
    const t23 = RIN*t22;
    const t24 = t20*(t21 + t23);
    const t25 = RT3*t21;
    const t26 = RM1*RT3;
    const t27 = RM1 + RT3;
    const t28 = RB3*t27 + t26;
    const t29 = RB2 + RB4;
    const t30 = RB1*t29;
    const t31 = RB2*RB4 + t30;
    const t32 = RM3*t31;
    const t33 = RM3*t8;
    const t34 = t31 + t33;
    const t35 = RM3 + RT3;
    const t36 = t21*t35;
    const t37 = RB2*RT3;
    const t38 = RB2 + RT3;
    const t39 = RM3*(RB1*t38 + t37);
    const t40 = RT3*t7 + t39;
    const t41 = RM3*t7;
    const t42 = t33 + t7;
    const t43 = RT2*t22;
    const t44 = t21*t7;
    const t45 = RB2*t21;
    const t46 = RB2*t22;
    const t47 = t21 + t46;
    const t48 = RB3 + t17;
    const t49 = RT2*t20;
    const t50 = RB3*RT3;
    const t51 = RB3*t9;
    const t52 = t17*t7;
    const t53 = RB2*RM1;
    const t54 = RB2 + RM1;
    const t55 = RB1*t54;
    const t56 = RT2*(t33 + t53 + t55);
    const t57 = RB3 + RT2;
    const t58 = t17 + t57;
    const t59 = RB2 + t22;
    const t60 = RB1*t59 + t33 + t46;
    const t61 = RT2*t60;
    const t62 = t22*t7 + t41 + t61;
    const t63 = RB3*RT2;
    const t64 = RT3 + t17;
    const t65 = t64*t9;
    const t66 = RB1*(RB2*t27 + t26) + RM1*t37 + t39;
    const t67 = RB2*RB3;
    const t68 = RB2 + RB3;
    const t69 = RB3 + RB4;
    const t70 = RB2*t69 + RB3*RB4 + t30;
    const t71 = RT2*t70;
    const t72 = RB1 + t69;
    const t73 = RB1 + RB3;
    const t74 = RM3*t73;
    const t75 = t53*t74;
    const t76 = RB3 + t8;
    const t77 = RM3*t76;
    const t78 = RM1*t77;
    const t79 = RT2*(RM3*t54 + t53);
    const t80 = t22 + t8;
    const t81 = RM3*t80;
    const t82 = RB1*RM1;
    const t83 = t21 + t82;
    const t84 = t53 + t83;
    const t85 = RT2*(t81 + t84) + t78;
    const t86 = RL*RT3;
    const t87 = CT2*t86;
    const t88 = RM1*RM3;
    const t89 = t18*t73;
    const t90 = RL*RM3;
    const t91 = RT2*(RL + t17);
    const t92 = RB4*t76;
    const t93 = t47 + t55 + t77;
    const t94 = RB2*RM3;
    const t95 = t73*t94;
    const t96 = t53*t73;
    const t97 = t95 + t96;
    const t98 = RT2*t93 + t97;
    const t99 = RB2*t89 + RL*t98 + t92*(RL*RM1 + t90 + t91);
    const t100 = t46 + t7;
    const t101 = t17*t29 + t70;
    const t102 = t17 + t73;
    const t103 = RT2*t102;
    const t104 = t100 + t94;
    const t105 = RL*(RB4*(t58 + t8) + t103 + t104) + RT2*t101;
    const t106 = RM1*t92;
    const t107 = t67 + t7 + t77;
    const t108 = RM1*t29 + t70;
    const t109 = RM3*t108;
    const t110 = RIN*(RT2*(RB4*t59 + t30 + t46 + t81) + t109) + RM1*(RT2*t107 + t95) + t106*(RM3 + RT2);
    const t111 = RM3*(RL + RT3);
    const t112 = RT2 + RT3;
    const t113 = RM3*t112;
    const t114 = RL*t27 + t111 + t26;
    const t115 = t114 + t91;
    const t116 = t112*t48;
    const t117 = CB1*(RL*(t21*(RT2*t42 + t40) + t23*(t112*t34 + t32)) + RM2*(RB3*(RL*(t56 + t66) + t112*t52) + RIN*(RL*(RT3*t60 + t62) + t116*t7 + t9*(RL*(t57 + t64) + t116)) + t115*t51) + t113*(t23*t31 + t44) + t21*t9*(RT2*(RL + RM3) + t111 + t86));
    const t118 = RIN*t108;
    const t119 = RM1*t73;
    const t120 = RT2*t119;
    const t121 = RT2*t92;
    const t122 = RB1 + t22;
    const t123 = RM1*RT2;
    const t124 = RT3*(RT2*t80 + t84);
    const t125 = t17*t73;
    const t126 = RT3*t93;
    const t127 = CT1*RT1;
    const t128 = RIN*t122;
    const t129 = RB4*RL;
    const t130 = RIN + RM1;
    const t131 = RB4*t73;
    const t132 = RIN*(RB4 + t122);
    const t133 = RM1*t72 + t132;
    const t134 = RL*t133;
    const t135 = RIN + t72;
    const t136 = RM3*t14;
    const t137 = CB1*RB3;
    const t138 = RM2*RT1;
    const t139 = RB4*t68 + t30;
    const t140 = CT1*RT2*(t139 + t67);

    const denXRe = 0;
    const denAIm = CB1*CT1*t20*(RL*(RB3*(RT1*(RB1*t19 + RT2*(RB1*(RB2*(RIN + t14) + t6) + t19)) + RT2*(RB1*(RB2*(RIN*t17 + t3) + t4) + RB2*t4) + t4*t7) + RIN*(RT1*(RT2*(RB2*(RB1*t14 + t3) + t12) + t13) + RT2*t13) + t9*(RB3*(RIN*(t0 + t18) + RM1*t5 + RT1*(RIN*(RT2 + t1) + t16) + t15) + RIN*(RT1*t16 + t15))) + t11*(RB3*(RT1*t6 + t4) + RT1*t4));
    const denBRe = CB1*(RL*(CT1*(RIN*(RT2*(RM3*(RB1*t47 + t45) + t44) + RT3*t42*(t21 + t43) + t21*t41 + t9*(RT2*(RM3*t22 + t21) + RT3*t43 + t36)) + RT2*t21*t40 + RT2*t36*t9) + t24*(RT2*t34 + t32)) + RM2*(RL*(CT1*(RIN*(RB3*t52 + RT3*(RB3*t33 + RB3*t55 + t45 + t61) + t18*(RB1*t68 + t67) + t57*t65) + t63*t65 + t63*t66) + t20*(RB3*(t52 + t56) + RIN*(t58*t9 + t62) + t51*(RT2 + t17))) + t31*(CT1*(RIN*(RT2*(RM3*(RB3 + RT3) + t28) + t17*t50) + t18*t50) + t49*(RB3*RM3 + RIN*t48 + t21))) + t32*(CT1*(RIN*(RT2*t28 + t25) + RT2*t25) + RT2*t24)) + CT1*(CT2*RIN*RM3*t26*t71 + RM2*t17*t20*(RIN*(RL*(RT2*t72 + t70) + t71) + RL*t71) + RT1*(t117 + t20*(RIN*(RM2*t105 + RM3*RT2*(RB4*t80 + t100)) + RL*t110 + RM2*t99 + t71*t88)) + t87*(RB4*RT2*t78 + RIN*(RB4*t85 + t73*(RM3*t53 + t79)) + RT2*t75));
    const denCIm = RL*(CT1*(RIN*(RB4*(t124 + t85) + RT3*(RT2*(t100 + t81) + t78 + t96) + t73*t79 + t75) + t123*t35*t92 + t123*(RT3*t107 + t95)) + t110*t20) + RM2*(CT1*(RIN*(RB2*(RT3*(t103 + t74 + t83) + t89) + RB4*(RL*t64*(t57 + t8) + RT3*(RT2*(t48 + t8) + t77 + t84) + t18*t76) + RL*(RT3*(t103 + t93) + t89 + t97)) + RT2*(RL*(t126 + t97) + t125*t37) + t114*t121) + t20*(RIN*t105 + t99)) + RM3*(CT1*(RIN*(RB2*(RT3*(RT2*t122 + t83) + t120) + RB4*(t123*t76 + t124)) + t120*t37 + t121*t26) + t49*(t106 + t118 + t96)) + t117 + t127*(RL*(RIN*(t109 + t112*(t100 + t80*(RB4 + RM3))) + RM1*(t107*t112 + t95) + t106*(RT2 + t35)) + RM2*(RB2*t112*t125 + RIN*(RL*(RB1*RB4 + RB4*(t38 + t58) + t102*t112 + t104) + t101*t112) + RL*(t126 + t98) + t115*t92) + t113*(RM1*t70 + t118));
    const denDRe = RB2*(RM2*t134 + RM3*(RL*RM2*t135 + t112*(RL*t130 + RM2*(RL + t135) + t133) + t134) + t112*(RM2*(RB4*(RL + t130) + RL*t73 + RM1*(RL + t73) + t128) + t134)) + RB3*t130*(RB4*(RL*RT2 + RM3*(RL + t112) + t86) + t112*t90) + RM2*t129*(t119 + t128) + RM3*(t112*(RB4 + RL) + t129)*(RIN*(RB1 + t14) + RM2*t73 + t82) + t112*(RM2*(RB4*t128 + RL*(t119 + t131 + t132) + RM1*t131) + t129*(RIN*(RB1 + RM1) + t82));
    const numXRe = 0;
    const numAIm = CT1*t11*t137*t87*(RM2*(RM1 + RT1) + t136);
    const numBRe = RL*(CT1*t49*(RB2*t138*t72 + t131*t138 + (RB2*(RT1 + t72) + t131)*(RM1*RM2 + t136)) + t10*t137*(CT1*RM2*(RT1*RT3 + RT2*(RT1 + RT3)) + RT2*(CT1*t136 + RM2*(CT1*RM1 + t20))));
    const numCIm = RL*(RM2*t112*t137*t31 + t0*t140 + t140*t2 + (RB2*t2 + RM2*(RB2*(RB3 + RM3) + t139))*(RT2*RT3*(CT1 + CT2) + t112*t127));
    const numDRe = RL*t112*(RB2*(RM2*t102 + t88) + RM2*t92);

return [
      [numDRe, numCIm, numBRe, numAIm],
      [denDRe, denCIm, denBRe, denAIm]
    ];
  }
}
