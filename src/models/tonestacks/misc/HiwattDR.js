import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class HiwattDR extends BaseTonestack {
  static definition() {
    return {
      id: 'hwtt',
      name: 'Hiwatt DR',
      components: {
        RIN: 48.4e3,
        RT: 220e3,
        RB: 470e3,
        RM: 100e3,
        R1: 100e3,
        R2: 220e3,
        R3: 22e3,
        R4: 22e3,
        RL: 220e3,
        C1: 47e-9,
        C2: 1e-9,
        C3: 47e-9,
        C4: 220e-12,
        C5: 1e-9
      },
      controls: {
        RB: Tapers.LogB,
        RM: Tapers.Linear,
        RT: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, R3, R4, RL, C1, C2, C3, C4, C5,
      RT: [RT2, RT1],
      RM: [RM],
      RB: [RB]
    } = this.processComponentValues(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 7461 (*, +, -)
    // Optimized operations: 679 (10.99x less)
    const t0 = R4 + RL;
    const t1 = R2*R3;
    const t2 = R2 + R3;
    const t3 = RT1 + t0;
    const t4 = RT2*t3;
    const t5 = R1 + R3;
    const t6 = R2*RL;
    const t7 = R1*R3;
    const t8 = R1 + t2;
    const t9 = C1*C2;
    const t10 = C3*RB;
    const t11 = C5*RM;
    const t12 = t10*t11;
    const t13 = C4*t12*t9;
    const t14 = RIN*t0;
    const t15 = R1*t14;
    const t16 = RIN + t0;
    const t17 = R1*t16;
    const t18 = t14 + t17;
    const t19 = R1*RL;
    const t20 = R3 + R4;
    const t21 = R1 + RIN;
    const t22 = R3 + t0;
    const t23 = RIN*t2;
    const t24 = C1 + C3;
    const t25 = C2*t24;
    const t26 = RT2 + t0;
    const t27 = R2*RIN;
    const t28 = R2 + RIN;
    const t29 = R1*t28 + t27;
    const t30 = RT2*t21;
    const t31 = R1*(t0 + t28) + t14 + t27 + t30;
    const t32 = C2*R3;
    const t33 = C1*C3;
    const t34 = R2*t0;
    const t35 = RT2*(R2 + t0) + t34;
    const t36 = R1*RM;
    const t37 = C5*t36;
    const t38 = C1*RIN;
    const t39 = C3*t38;
    const t40 = t11*t16;
    const t41 = C2*t18;
    const t42 = R2 + RT2;
    const t43 = R3*t42;
    const t44 = R1*R2;
    const t45 = RM*(C3 + C5);
    const t46 = C3*RT2;
    const t47 = C2*C3;
    const t48 = R3 + RT2;
    const t49 = t0 + t48;
    const t50 = RIN*t49;
    const t51 = RM + t2;
    const t52 = RIN*t51;
    const t53 = R2*RT2;
    const t54 = R3 + RM;
    const t55 = RIN + t54;
    const t56 = RM + RT2;
    const t57 = R4 + t56;
    const t58 = t25*t27;
    const t59 = RIN*t24*t32;
    const t60 = C1*t10;
    const t61 = RB + RIN;
    const t62 = t2 + t61;
    const t63 = t38*t42;
    const t64 = C3*t2;
    const t65 = RT1 + RT2;
    const t66 = R4 + RT1;
    const t67 = R4*RT1 + RT2*t66;
    const t68 = RL*t65 + t67;
    const t69 = RIN*t68;
    const t70 = RM + t65;
    const t71 = RT1 + t42;
    const t72 = RL*t71;
    const t73 = R2*t66 + t72;
    const t74 = R2*RM;
    const t75 = RM*t65;
    const t76 = RT1*RT2;
    const t77 = R3*t71;
    const t78 = t53 + t77;
    const t79 = t76 + t78;
    const t80 = t74 + t75 + t79;
    const t81 = R4*t71;
    const t82 = t72 + t81;
    const t83 = t80 + t82;
    const t84 = RIN*t71;
    const t85 = C1*t84;
    const t86 = t54*t71;
    const t87 = R2*t65 + t86;
    const t88 = R2*RT1;
    const t89 = RM*t76 + RT1*t43 + t56*t88;
    const t90 = RB*t71;
    const t91 = R2*t70 + t75 + t77 + t84 + t90;
    const t92 = t76 + t84;
    const t93 = t88 + t92;
    const t94 = R4*t65;
    const t95 = RIN*t65;
    const t96 = C2*RB;
    const t97 = RIN*t26;
    const t98 = R1*t24;
    const t99 = RL + RT2;
    const t100 = RB + RM;
    const t101 = t100 + t2;
    const t102 = R1*t101;
    const t103 = R4 + RB;
    const t104 = R2*t103;
    const t105 = R2 + R4;
    const t106 = R4*RB;
    const t107 = R3*t105 + RM*t105 + t106;
    const t108 = R1*(t104 + t107);
    const t109 = t100 + t20;
    const t110 = R1*t109;
    const t111 = t104 + t110;
    const t112 = C1*t21;
    const t113 = R2*RB;
    const t114 = RB*t51;
    const t115 = RB + t49;
    const t116 = RB + t20;
    const t117 = RIN*t116;
    const t118 = RB + t2;
    const t119 = R2 + RT1;
    const t120 = RL*t119;
    const t121 = R3*t119;
    const t122 = RB*t119;
    const t123 = R4*t119 + t122;
    const t124 = RT2*(t101 + t3) + t120;
    const t125 = RM*t119;
    const t126 = t121 + t125;
    const t127 = RL*t61;
    const t128 = RIN*t109*t119;
    const t129 = RIN*(t101 + t66) + t127;
    const t130 = R2 + RB;
    const t131 = RB + t54;
    const t132 = C4*RT2;
    const t133 = R3 + RB;
    const t134 = t133 + t56;
    const t135 = t0 + t134;
    const t136 = C1*R1;
    const t137 = C2*t131;
    const t138 = C4*t10;
    const t139 = t11*t133;

    const denYIm = t13*(R1*(RT1*(t0*t2 + t1) + t0*t1 + t2*t4) + RIN*(R1*t1 + R2*R4*t5 + RT1*(t0*t8 + t1 + t7) + RT2*(R1*t2 + t3*t8) + t5*t6));
    const denXRe = C4*t11*t25*(R2*(R1*(R3*R4 + RIN*t20) + R3*(t14 + t19) + RIN*t19) + RT1*(R2*t21*t22 + R3*t18 + RT2*(R1*(RIN + t2) + t23) + t15) + RT2*(t15 + t18*t2)) + RB*(C3*t11*t26*t29*t9 + C4*(C2*(C1*(C3*t14*t44 + t18*t42*t45 + t46*(R2*t18 + t15)) + C3*t40*(RT2*(R1 + R2) + t44)) + C3*t43*(C1*(t11*t21 + t41) + C2*t40) + RT1*(C1*(C2*(C3*t21*t34 + t29*t46 + t31*t45) + C3*(C2*t1*t21 + R3*t41 + t11*(t50 + t7) + t26*t37 + t30*t32) + t15*t47) + t11*t47*(R2*(t16 + t5) + R3*t16 + RT2*t8 + t17)) + t11*t35*t39 + t33*t35*t37) + t11*t31*t32*t33);
    const denAIm = C4*(R1*(t25*(R4*t91 + RB*t93 + RIN*t80 + RL*t91 + t89) + t60*t83) + RB*(C2*(C3*(R4*t87 + RIN*t87 + t89) + R4*t85 + RL*(C3*t87 + t85) + RT1*t63) + t39*t83) + RM*t25*t69 + t11*(C2*t69 + C3*RIN*t67 + R2*(C2*(t68 + t97) + t24*t97) + R3*(C2*(t73 + t92 + t94) + C3*t84 + t85) + RL*(C1*t95 + C3*(t90 + t95)) + t10*(t78 + t81 + t92) + t38*t76 + t38*t90 + t38*t94 + t96*(t82 + t93) + t98*(t79 + t82 + t90)) + t58*(R4*t70 + RL*t70 + RT1*t56) + t59*(t67 + t73)) + t10*t9*(R1*(R2*t57 + R4*t55 + RIN*(R3 + t56) + RM*RT2 + t43) + R4*t52 + RIN*(t42*t54 + t53) + RL*(R1*t55 + t44 + t52)) + t11*(R1*(t25*(R4*t62 + RB*(RIN + t42) + RIN*t48 + RL*t62 + t43 + t53) + t49*t60) + RB*(C2*(C3*(R2*(R4 + RT2) + R3*(R4 + t42) + t23) + R4*t38 + RL*(t38 + t64) + t63) + t33*t50) + t26*t58 + t59*(t0 + t42));
    const denBRe = C3*(C2*(RIN*(t111 + t54*(R2 + t103)) + t106*t51 + t108 + t113*t54 + t99*(RIN*(RM + t8) + t102 + t114)) + RB*t112*(t22 + t56)) + C4*(C2*(R3*(RT1*(R2 + RL) + t4 + t6) + R4*(RT1*t130 + t113 + t126) + RL*(R2*t61 + RT1*(RB + t28) + t125) + RT2*(R4*(RM + t130) + RB*RT1 + RM*(RL + RT1) + t129 + t6 + t88) + t100*t88 + t128) + C3*(R1*t124 + RT2*(RB*(RT1 + t51) + t106 + t129) + t106*t119 + t110*t119 + t119*t127 + t122*t54 + t128) + t112*(t123 + t124 + t126)) + t11*(C2*(R4*t118 + t1 + t113 + t117 + t62*t99) + C3*(R1*t116 + R3*RB + t106 + t117 + t99*(RB + t21)) + C4*(RT2*(t118 + t3) + t120 + t121 + t123) + t112*t115) + t9*(RIN*(t107 + t111) + t108 + t99*(RIN*(t100 + t8) + t102));
    const denCIm = C3*RL*(R1 + RB) + C3*(R1*R4 + R1*RT2 + RB*(t5 + t57) + t36 + t7) + C4*t94 + C4*(RL*RT2 + RT1*(RL + t134)) + R2*t135*(C2 + C4) + RIN*t135*(C2 + t24) + t11*t115 + t131*t132 + t135*t136 + t137*t26;
    const denDRe = t135;
    const numYIm = t13*t19*t78;
    const numXRe = C2*RL*(t11*(C4*(t10*(t78 + t88) + t98*(t133*t71 + t53)) + t60*t7) + t136*t138*(t53 + t86));
    const numAIm = RL*(C2*R1*(C4*t119*t131*t24 + t101*t132*t24 + t139*t24 + t54*t60) + C2*t138*(t65*(R2 + RM) + t74 + t77) + t11*(C4*(C2*t119*t133 + C3*t122 + RT2*(C2*t130 + t10 + t32)) + t64*t96));
    const numBRe = RL*(C2*(C3*t114 + t139) + C4*(C2*(t131*t71 + t53) + C3*t90) + t12 + t137*t98);
    const numCIm = RL*(t10 + t137);
    const numDRe = 0;

return [
      [numDRe, numCIm, numBRe, numAIm, numXRe, numYIm],
      [denDRe, denCIm, denBRe, denAIm, denXRe, denYIm]
    ];
  }
}