import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class Brownface extends BaseTonestack {
  static definition() {
    return {
      id: 'brwn',
      name: 'Brownface',
      components: {
        RIN: 38e3,
        RL: 1e6,
        RB: 250e3,
        RT: 350e3,
        RTap: 70e3,
        R1: 100e3,
        R2: 6.8e3,
        C1: 250e-12,
        C2: 100e-9,
        C3: 100e-9,
        C4: 5e-9
      },
      controls: {
        RB: {
          taper: Tapers.LogA,
          role: PotRole.VR
        },
        RT: Tapers.LogA
      }
    };
  }

  calculateCoefficients(controlValues) {
    let { RIN, RT, RB, RTap, R1, R2, RL, C1, C2, C3, C4 } = this.components;
    const c = this.getControlTaperedValues(controlValues);
    // NB: R2 is fixed RM really

    const CIN = 0;

    const RTapAbove = RT - RTap;
    const RTapBelow = RTap;

    const RTx = c.RT * RT;
    const belowTap = RTx < RTapBelow;

    let RT12, RT11, RT21, RT22;

    if (!belowTap) {
      RT12 = RTx - RTapBelow;
      RT11 = RT - RTx;
      RT21 = RT22 = RTapBelow / 2;
    } else {
      RT21 = RTapBelow - RTx;
      RT22 = RTx;
      RT11 = RT12 = RTapAbove / 2;
    }

    RB = c.RB * RB;

    if (belowTap) {
      // The coefficient expressions are taken from https://github.com/jatalahd/tsc
      // and refactored using sympy to reduce the number of operations.
      // Original operations: 4494 (*, +, -)
      // Optimized operations: 473 (9.50x less)
      const t0 = RL*RT22;
      const t1 = RL + RT22;
      const t2 = RT21*t1;
      const t3 = t0 + t2;
      const t4 = RT11 + RT12;
      const t5 = R1*t4;
      const t6 = R1*RT22;
      const t7 = t4*t6;
      const t8 = R1 + t4;
      const t9 = R1 + RT22;
      const t10 = C2*C3;
      const t11 = C1*RIN;
      const t12 = CIN*t11;
      const t13 = t10*t12;
      const t14 = R2*RT21;
      const t15 = RL*t4;
      const t16 = RT21*t4;
      const t17 = RT21 + t4;
      const t18 = R1*RL;
      const t19 = RL + RT21;
      const t20 = t19*t4;
      const t21 = t19 + t4;
      const t22 = R1*(R2*t21 + t20) + R2*t20;
      const t23 = C2 + C3;
      const t24 = t12*t23;
      const t25 = RL*t16;
      const t26 = RIN + RT21;
      const t27 = RIN + t4;
      const t28 = RT21*RT22;
      const t29 = C1*C3;
      const t30 = t29*(R1 + R2);
      const t31 = RT11 + RT21;
      const t32 = RT11*RT21;
      const t33 = C1*(R1*t31 + t32);
      const t34 = C3*RT22;
      const t35 = R1 + RT21;
      const t36 = CIN*RIN;
      const t37 = R1*t23;
      const t38 = C2*RT12;
      const t39 = C1*R1;
      const t40 = C3*t19;
      const t41 = t10*t19;
      const t42 = t37*t4;
      const t43 = C2*RT11;
      const t44 = t37 + t38;
      const t45 = t43 + t44;
      const t46 = C1*RT21;
      const t47 = C1*(RL*t45 + t42) + t44*t46;
      const t48 = RL*t8;
      const t49 = R1*t17 + t16 + t48;
      const t50 = C1*t23;
      const t51 = t50*t8;
      const t52 = RT21 + RT22;
      const t53 = C1*(RL*(t4 + t52) + RT22*t17);
      const t54 = R1 + t19;
      const t55 = C1*t21;
      const t56 = C1*C2;
      const t57 = RL*t52;
      const t58 = RT22*t35 + t18 + t57;
      const t59 = C1 + C2;
      const t60 = RIN*t1;
      const t61 = t1*t36 + t53;
      const t62 = C3*RB;
      const t63 = C1*t4;
      const t64 = t23*t6;
      const t65 = t37*t63;
      const t66 = t28 + t57;
      const t67 = RIN*(CIN*(t37 + t63) + t51);
      const t68 = C2*RL;
      const t69 = C2*R1;
      const t70 = C3*t69;
      const t71 = t23*(R1 + RT12);
      const t72 = C2*RT21;
      const t73 = t37 + t72;
      const t74 = t68 + t73;
      const t75 = t11 + t36;
      const t76 = C2*RT22;
      const t77 = C1 + t23;
      const t78 = t60*t77 + t61;
      const t79 = C3*RT21;
      const t80 = C2*t26;
      const t81 = C1*RT11;
      const t82 = C1*t8;
      const t83 = RB*t1;
      const t84 = C2*RB;
      const t85 = RB + t19;
      const t86 = R2 + RB;
      const t87 = t19 + t86;
      const t88 = C3*R2;
      const t89 = t12*t8;
      const t90 = C4*t34;
      const t91 = R2*RB*t90;
      const t92 = C4*RT22;
      const t93 = t56*t8;
      const t94 = R2*t82;
      const t95 = t36 + t92;
      const t96 = R2*t59 + t39;

      var denYIm = C4*RB*t13*(R2*(RL*(t4*t9 + t6) + t2*t8 + t7) + t3*t5);
      var denXRe = C4*t24*(RT22*t22 + t14*t15 + t18*(R2*t17 + t16)) + RB*(C4*(C1*t10*(R2*t15*t26 + RIN*t25 + RT22*(R1*(R2*(t19 + t27) + t19*t27) + t4*(R2*(RIN + t19) + RIN*t19)) + t18*(R2*(t26 + t4) + RT21*t27)) + t36*(C2*(C1*(RL*RT12*t35 + RT22*(R1*t21 + t20)) + t34*(R1*(R2 + t19) + R2*t19)) + RL*(C2*(C3*(R1*(R2 + RT21) + t14) + t33) + t30*t31) + t30*(RT11*RT22 + RT12*t1 + t0 + t28))) + t13*t22);
      var denAIm = C4*(RB*(C1*(RL*(RT22*t45 + t42) + t23*t7) + C3*t6*t68 + RIN*(C1*(RL*(C3*RT11 + t34 + t43 + t71) + RT22*t23*t4 + t64) + CIN*(RL*t73 + RT22*t74 + t53) + t10*t66 + t2*t29) + t2*(C1*t45 + t70)) + RL*t63*t64 + t2*t65 + t66*t67) + R2*(C4*RIN*(CIN*(t23*(RL*(RT21 + t9) + t28 + t6) + t53) + t1*t51) + C4*t50*(RT22*t49 + t17*t18 + t25) + t24*t49 + t62*(C2*t33 + C4*(C2*t58 + t59*t60 + t61) + t36*(C2*t54 + t55) + t56*(R1*(RIN + RT12) + RIN*RT11 + RT12*t26 + t48))) + RB*(C1*t41*(R1*(RIN + RT11) + RIN*t4) + t36*(C2*(C1*t32 + R1*t40) + t47) + t38*t39*t40) + t12*t20*t37;
      var denBRe = C4*(RB*(C2*t28 + RL*(t73 + t76) + t64 + t78) + t63*t66 + t66*(t23*(R1 + RIN) + t75)) + R2*(C1*t72*(R1 + RT11) + C4*(C3*t83 + t23*t58 + t78) + RIN*(CIN*(C1*(RT12 + t19) + t23*t54 + t81) + t51) + t38*t46 + t50*(t48 + t5) + t62*(t55 + t68 + t69 + t75 + t80) + t79*t82) + RB*(RIN*(C1*(C3*RL + t71 + t79) + t41) + t19*t70 + t36*(t55 + t74) + t47 + t81*(C3*RIN + t80)) + t19*(t65 + t67);
      var denCIm = C1*(R2*(RL + RT12) + RB*RT12 + RB*RT21 + RL*(RB + RT12) + RT11*t87 + RT12*RT21 + t14) + C4*(t3 + t83) + R2*(C3*t85 + C4*t1 + t74) + RIN*t87*(CIN + t77) + t19*t84 + t37*t85;
      var denDRe = t87;
      var numYIm = C4*t0*t84*t88*t89;
      var numXRe = RL*(C2*(t36*t91 + t82*(t36*(RB*t88 + t86*t92) + t91)) + t12*t90*(R1*RB + R2*(RB + t8)));
      var numAIm = RL*(C3*(R2*t36*t92 + R2*t89 + RB*(R2*t93 + t95*t96) + t92*t94) + t86*(C4*t76*t82 + t36*(t59*t92 + t93)));
      var numBRe = RL*(C3*(R2*t95 + RB*t96 + t94) + t86*(t59*t95 + t93));
      var numCIm = RL*(t59*t86 + t88);
      var numDRe = 0;
    } else {
      // The coefficient expressions are taken from https://github.com/jatalahd/tsc
      // and refactored using sympy to reduce the number of operations.
      // Original operations: 5376 (*, +, -)
      // Optimized operations: 462 (11.64x less)
      const t0 = RL*RT11;
      const t1 = RL + RT11;
      const t2 = RT12*t1 + t0;
      const t3 = R2*t2;
      const t4 = RT21 + RT22;
      const t5 = R2*t1;
      const t6 = CIN*RIN;
      const t7 = C3*RB;
      const t8 = C2*C4;
      const t9 = C1*t7*t8;
      const t10 = RL*RT12;
      const t11 = RL + RT12;
      const t12 = RT11*t11;
      const t13 = t10 + t12;
      const t14 = R2*t13;
      const t15 = t13 + t5;
      const t16 = RT11 + RT12;
      const t17 = R2*t16;
      const t18 = RT12*RT22;
      const t19 = RT22 + t11;
      const t20 = R2 + t11;
      const t21 = R1*(R2*t19 + RL*RT22 + RT21*t20 + t18);
      const t22 = C4*t13;
      const t23 = R2 + RB;
      const t24 = C2*t4;
      const t25 = t23*t24;
      const t26 = RB*t13;
      const t27 = RB*t1;
      const t28 = t4*(t15 + t27);
      const t29 = C2*R1;
      const t30 = R2*t4;
      const t31 = C2 + C4;
      const t32 = t26*t31;
      const t33 = RB*RT11;
      const t34 = RB*RL;
      const t35 = C4*t4;
      const t36 = R2*t7;
      const t37 = C1*t31*t36;
      const t38 = C4*t11;
      const t39 = C2*t7;
      const t40 = R2*t39;
      const t41 = t38*t40;
      const t42 = C3*t23;
      const t43 = R1*t11;
      const t44 = t13 + t43;
      const t45 = RB + RL;
      const t46 = RT12*t45;
      const t47 = C3*C4;
      const t48 = R1 + RT11;
      const t49 = C4*t48;
      const t50 = R1 + t1;
      const t51 = C4*t50;
      const t52 = RB*RT12;
      const t53 = t11*t40;
      const t54 = t20*t39;
      const t55 = C2*RT12;
      const t56 = RB + RT12;
      const t57 = C3*R2;
      const t58 = t23*t55 + t56*t57;
      const t59 = C1*RL;
      const t60 = C2 + C3;
      const t61 = RB + t11;
      const t62 = RT11*t61;
      const t63 = t10 + t34 + t62;
      const t64 = C1*(t5 + t63);
      const t65 = t60*t64;
      const t66 = R1 + t16;
      const t67 = R1*t61;
      const t68 = t63 + t67;
      const t69 = t11 + t23;
      const t70 = R1*t69;
      const t71 = t11*t23;
      const t72 = C2*(t70 + t71);
      const t73 = R1 + t61;
      const t74 = R1*RT12;
      const t75 = R1*t45 + t74;
      const t76 = C2*(R2*(t38 + t7) + RB*t11*(C3 + C4)) + t38*t42;
      const t77 = RB*t38;
      const t78 = C2*t71;
      const t79 = C3*RT12;
      const t80 = t38 + t79;
      const t81 = C1*RT11;
      const t82 = R1*(t65 + t76) + t36*t38 + t53 + t59*(C4*RT12*t23 + t58) + t81*(R2*(C3*t45 + t80) + t77 + t78);
      const t83 = R2*RT11;
      const t84 = R2*RT12;
      const t85 = RIN*t61;
      const t86 = t34 + t52;
      const t87 = RT12 + t23;
      const t88 = RT12 + RT22;
      const t89 = R1*t60;
      const t90 = C1 + t60;
      const t91 = C1*t6;
      const t92 = R2 + RT12;
      const t93 = t39*(R1*t92 + t17);
      const t94 = t30*t39;
      const t95 = t17*t4;
      const t96 = R2*(RT12 + t4);
      const t97 = RB*(C3*t96 + t16*t24) + t60*t95 + t89*(RB*t88 + RT21*t56 + t18 + t96);
      const t98 = C1*RT12;
      const t99 = C1 + C2;
      const t100 = C1*t87;

      var denYIm = t6*t9*(R1*t3 + t4*(R1*(t2 + t5) + t3));
      var denXRe = RIN*(CIN*(C1*C4*t29*(t14 + t26 + t28) + C1*t22*t25 + C3*(C1*(R1*(C4*t28 + R2*(C2*t27 + t22) + t32) + R2*(t32 + t35*(t13 + t33 + t34))) + RB*t8*(t11*t30 + t21))) + t9*(t14 + t21 + t4*(t13 + t17))) + t9*(R1*(t14 + t15*t4) + t14*t4);
      var denAIm = R1*(C1*(C2*(C3*t26 + R2*(C3*t27 + t22) + RB*t22) + t22*t42) + t41) + RIN*(C1*(C2*(R2*(RL*t49 + RT12*(t51 + t7) + t48*t7) + t34*t49 + t44*t7 + t51*t52) + t47*(R2*(t12 + t34 + t43 + t46) + RB*t44)) + t41) + t10*t37 + t12*t37 + t35*(C1*(C2*(R2*(RIN*t66 + t12) + RB*t0 + RIN*t45*t48 + RT12*(RIN*(RB + t50) + t33)) + C3*(R2*(RIN*(RB + t66) + t62) + RIN*t68)) + R1*(t54 + t65) + RIN*t54 + t53 + t58*t59) + t6*(t35*(C3*(R2*t73 + t75) + t64 + t72) + t82);
      var denBRe = RIN*(C1*(C2*(t46 + t62 + t70 + t83 + t84) + C3*t68 + R2*(C3*(RB + t48) + t80) + t77) + t76) + t35*(C1*(R2*RL + R2*(RIN + RT11) + t63 + t85) + C2*(R2*(RIN + t11) + t70 + t85 + t86) + C3*(R2*(RIN + t73) + t75 + t85)) + t6*(C3*t67 + C4*(t4*t61 + t86) + R2*(C3*(R1 + t45) + C4*(t11 + t4) + t79) + t59*t87 + t69*t81 + t72) + t82;
      var denCIm = C1*(RL*(R2 + t16) + RT11*RT12 + t27 + t83) + C4*(R2*t88 + RB*t19 + RL*(R2 + RT22) + t18) + t57*t61 + t69*(C4*RT21 + RIN*(CIN + t90) + t89) + t78;
      var denDRe = t69;
      var numYIm = C2*t34*t47*t91*(R2*(t4*t66 + t74) + t4*t74);
      var numXRe = RL*(C4*(C1*(t39*(R1*(t4*t92 + t84) + t95) + t6*t97) + t6*t94) + t91*t93);
      var numAIm = RL*(C1*(t6*(RB*(C2*RT11 + t55 + t57) + t17*t60 + t87*t89) + t93) + C4*(C1*t97 + t6*(R2*(t4*t90 + t98) + RB*(t4*t99 + t98) + t4*t98) + t94) + t40*t6);
      var numBRe = RL*(C2*t23*(C1*t16 + t6) + C3*(C4*t30 + R1*t100 + R2*(RB*t99 + t6 + t81 + t98)) + C4*(C1*(RB*t4 + RT12*(t23 + t4) + t30) + t25) + t100*(t29 + t6));
      var numCIm = RL*(t23*t99 + t57 + t98);
      var numDRe = 0;
    }

    return [
      [numDRe, numCIm, numBRe, numAIm, numXRe, numYIm],
      [denDRe, denCIm, denBRe, denAIm, denXRe, denYIm]
    ];
  }
}