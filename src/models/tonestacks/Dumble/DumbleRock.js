import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class DumbleRock extends BaseTonestack {
  static definition() {
    return {
      id: 'dmbr',
      name: 'Dumble Rock',
      components: {
        RIN: 40e3,
        RT: 270e3,
        RB: 312e3,
        RM: 250e3,
        RV: 1e6,
        R1: 150e3,
        R2: 10e3,
        R3: 4.7e6,
        RL: 1e6,
        C1: 2e-9,
        C2: 100e-9,
        C3: 10e-9,
        C4: 1e-9,
        C5: 390e-12,
        C6: 220e-12
      },
      controls: {
        RB: {
          taper: Tapers.LogB,
          role: PotRole.VR
        },
        RM: {
          taper: Tapers.LogB,
          role: PotRole.VR
        },
        RT: Tapers.LogA,
        RV: {
          taper: Tapers.LogA,
          default: 1
        }
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, R3, RL, C1, C2, C3, C4, C5, C6, RT2, RT1, RM, RB, RV2, RV1
    } = this.extractCoefficientVariables(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 24827 (*, +, -)
    // Optimized operations: 1412 (17.58x less)
    const t0 = R3*RIN;
    const t1 = R3 + RIN;
    const t2 = R1*t1;
    const t3 = RT2*RV2;
    const t4 = RT2 + RV2;
    const t5 = RL*t4 + t3;
    const t6 = t5*(t0 + t2);
    const t7 = R2*RT1;
    const t8 = R1*RV2;
    const t9 = RL*t0;
    const t10 = R1*RL;
    const t11 = t0*t10;
    const t12 = RL*t1;
    const t13 = R1*(t0 + t12) + t9;
    const t14 = R1*RT2;
    const t15 = R3*RV2;
    const t16 = R1 + RT2;
    const t17 = R2*t16;
    const t18 = R1 + RL;
    const t19 = RIN*RV2;
    const t20 = RL + RV2;
    const t21 = RT2*t20;
    const t22 = RIN + RV2;
    const t23 = RL*t22;
    const t24 = t19 + t23;
    const t25 = C4*RB;
    const t26 = C1*C3;
    const t27 = C2*RV1;
    const t28 = C6*t27;
    const t29 = t25*t26*t28;
    const t30 = R1*RIN;
    const t31 = t30*t5;
    const t32 = R1 + RM;
    const t33 = RL*RT2;
    const t34 = R1*RM;
    const t35 = R2*RIN;
    const t36 = R1 + RIN;
    const t37 = t36*t5;
    const t38 = RV2*t36;
    const t39 = RM + t36;
    const t40 = RIN*RM + t34;
    const t41 = RIN*t8;
    const t42 = RL*t41;
    const t43 = RL*(t30 + t38) + t41;
    const t44 = RT2*t43;
    const t45 = t42 + t44;
    const t46 = R3*t45 + t33*t41;
    const t47 = C2*R2;
    const t48 = t25*t47;
    const t49 = RT1 + RT2;
    const t50 = RV1*t20;
    const t51 = RM*t50;
    const t52 = R1*RT1;
    const t53 = R1 + RT1;
    const t54 = RM*t53;
    const t55 = RV1*(t52 + t54);
    const t56 = RV1*t32;
    const t57 = RT1 + t16;
    const t58 = RV1*(t52 + t53*(RIN + RM));
    const t59 = RIN*RT1;
    const t60 = RV1*t39;
    const t61 = RT1*RT2;
    const t62 = RT1 + RV2;
    const t63 = RL*t62;
    const t64 = RT2*t63;
    const t65 = RV2*t16;
    const t66 = RIN*t53 + t52;
    const t67 = RV2*t66;
    const t68 = RIN + RT1;
    const t69 = RV2*t68;
    const t70 = RT1 + t22;
    const t71 = C2*RB;
    const t72 = C4*t26;
    const t73 = t71*t72;
    const t74 = R2 + RB;
    const t75 = C1*C2;
    const t76 = C3*t74*t75;
    const t77 = R1*R3;
    const t78 = R1 + R3;
    const t79 = RIN*t78 + t77;
    const t80 = t76*t79;
    const t81 = R2 + RT2;
    const t82 = R2 + t4;
    const t83 = RL*t82 + RV2*t81;
    const t84 = t26*t79;
    const t85 = C1*RIN;
    const t86 = t8*t85;
    const t87 = C3*t36;
    const t88 = t85 + t87;
    const t89 = RV2*t87;
    const t90 = R2*(RL*(t85*(R1 + RV2) + t89) + t21*t88 + t86);
    const t91 = RV2*(RIN + t16);
    const t92 = R2*(RL*(t16 + t22) + t91);
    const t93 = t37 + t92;
    const t94 = R3*t93;
    const t95 = t25*(C2*(C1*(t31 + t94) + t90) + t83*t84) + t5*t80;
    const t96 = RIN*t81;
    const t97 = RL*t8;
    const t98 = R2*t43;
    const t99 = R2*(RT2*t87 + t16*t85);
    const t100 = RL*RV2;
    const t101 = t100*t99;
    const t102 = C1*R1;
    const t103 = C1*t19;
    const t104 = C1*RV2;
    const t105 = RL*(t104 + t88) + t103 + t89;
    const t106 = RT2*t105;
    const t107 = R2*(RL*(t102*t22 + t89) + t106 + t86);
    const t108 = RL*t19;
    const t109 = R1*RB;
    const t110 = R1 + RB;
    const t111 = RT2*t110;
    const t112 = t109 + t111;
    const t113 = RB*RIN;
    const t114 = t113*t8;
    const t115 = RB + RIN;
    const t116 = RV2*t115;
    const t117 = t113 + t116;
    const t118 = RL*t117;
    const t119 = R2*t24;
    const t120 = t110*t19;
    const t121 = RIN*t110;
    const t122 = RB + t36;
    const t123 = RV2*t122;
    const t124 = t121 + t123;
    const t125 = t19*t81;
    const t126 = RL*t3;
    const t127 = R2*RL*t91;
    const t128 = C2*(t126*t36 + t127 + t94);
    const t129 = C1*t1;
    const t130 = C2*t93;
    const t131 = RV2*t110 + t109;
    const t132 = t122*t21;
    const t133 = RB*t38 + RL*(t109 + t113 + t123) + t132 + t92;
    const t134 = R3*t133;
    const t135 = t25*(t129*t83 + t130) + t75*(RIN*(RL*t111 + RL*t131 + RV2*(RB*t16 + t14)) + t134 + t35*(RL*(R1 + t4) + t65));
    const t136 = C3*RM;
    const t137 = RT1*t95 + t136*(RT1*t135 + t25*(C1*(R3*(RL*(RV2*(RIN + t81) + t96) + t125) + RL*t125) + t128) + t75*(R3*(R1*t118 + RT2*(RL*t124 + t120) + t114 + t119*t16) + t108*t112 + t108*t17)) + t25*(C2*(R3*(C1*t45 + t107) + t101 + t33*t86) + t26*(R3*(t45 + t98) + t96*t97)) + t46*t76;
    const t138 = C6*RV1;
    const t139 = RV1 + t4;
    const t140 = RM*(RL*t139 + RV2*(RT2 + RV1));
    const t141 = RM*t21;
    const t142 = t34 + t56;
    const t143 = RM*RV2;
    const t144 = t40 + t60;
    const t145 = RB + t81;
    const t146 = C1*R3;
    const t147 = C3*t146;
    const t148 = R2*t88;
    const t149 = RB*t87;
    const t150 = RT2*(t110*t85 + t149);
    const t151 = RB*t86;
    const t152 = RB*RV2;
    const t153 = t152*t87;
    const t154 = RL*(t4 + t74) + RV2*t145;
    const t155 = RB*RT1;
    const t156 = R3*t81;
    const t157 = R3 + t81;
    const t158 = RB + RT2;
    const t159 = RT1*RV2;
    const t160 = R3*t154;
    const t161 = RB + RT1;
    const t162 = RIN*t158;
    const t163 = R1*t158 + RB*RT2;
    const t164 = R2 + RIN;
    const t165 = RIN*t16;
    const t166 = R3*t74;
    const t167 = C1*RT1;
    const t168 = RT1 + t81;
    const t169 = R3 + RT1;
    const t170 = t169 + t81;
    const t171 = RB*t20;
    const t172 = t100 + t171;
    const t173 = RL*t152 + RT1*t172;
    const t174 = RT1*t20;
    const t175 = t100 + t174;
    const t176 = t100 + t21;
    const t177 = RIN*t20;
    const t178 = t175 + t177;
    const t179 = R1*t178;
    const t180 = t19 + t21;
    const t181 = RT1*t180 + t126;
    const t182 = t155*t19;
    const t183 = RB + RV2;
    const t184 = RIN*t183 + t152;
    const t185 = RL*t184;
    const t186 = RL*t159;
    const t187 = RT1*t115;
    const t188 = R2*t20;
    const t189 = t100 + t188;
    const t190 = R2*t19;
    const t191 = R2 + t36;
    const t192 = R1*t189;
    const t193 = R2*t22;
    const t194 = RL*(t19 + t193) + t190 + t191*t21 + t192;
    const t195 = R3*t194;
    const t196 = C2*R1;
    const t197 = t20*t61;
    const t198 = t33 + t7;
    const t199 = R2*t62;
    const t200 = RL*(t159 + t199) + RV2*t198 + t197;
    const t201 = R2*t69;
    const t202 = R2*t70;
    const t203 = RT2*t178;
    const t204 = RT2*t175;
    const t205 = RT1*t19;
    const t206 = RT1*t22 + t19;
    const t207 = t14*t74;
    const t208 = t166*t36;
    const t209 = t176*t208;
    const t210 = t172 + t188;
    const t211 = R1*t210;
    const t212 = t19*t74;
    const t213 = t36 + t74;
    const t214 = t21*t213 + t212;
    const t215 = RL*(t184 + t193) + t214;
    const t216 = t211 + t215;
    const t217 = t100*t74;
    const t218 = RIN*(t21*(R1 + t74) + t217) + t210*t30;
    const t219 = R3*t216 + t218;
    const t220 = t176 + t188;
    const t221 = C1*(RM*t1 + t79);
    const t222 = C5*t36;
    const t223 = R2*t36;
    const t224 = R3*t220;
    const t225 = t200 + t224;
    const t226 = t167*t212;
    const t227 = C2*t74;
    const t228 = RT1*t183 + t152;
    const t229 = t199 + t228;
    const t230 = RIN*t14;
    const t231 = RT1*t74;
    const t232 = RL*t229;
    const t233 = RV2*t18 + t10;
    const t234 = RB*t69;
    const t235 = t152 + t183*t68;
    const t236 = RL*(t202 + t235) + t201 + t234;
    const t237 = RV2*(t155 + t198) + t197 + t232;
    const t238 = RL*t205 + t204*t36;
    const t239 = R1*t175;
    const t240 = R1*t173;
    const t241 = RB*t19;
    const t242 = R3*(R1*t172 + t132 + t185 + t241) + RL*(RT1*t184 + t241) + t122*t204 + t182;
    const t243 = RT1 + t74;
    const t244 = t243*t30;
    const t245 = R2*t49;
    const t246 = R2 + t68;
    const t247 = C5*t20;
    const t248 = R1 + R2;
    const t249 = C1*RT2;
    const t250 = C2*t191;
    const t251 = R2 + RT1;
    const t252 = R2*t68;
    const t253 = C2*t252;
    const t254 = C4*t171;
    const t255 = R2*t1;
    const t256 = R3*t110 + t255;
    const t257 = t20*t75;
    const t258 = C2*RIN;
    const t259 = C5*t170 + t196 + t258 + t47;
    const t260 = R1*t243;
    const t261 = t220*t25;
    const t262 = t21 + t210;
    const t263 = C5*(R3*t262 + t237);
    const t264 = C2*(RL*t212 + RM*t216 + t21*t36*t74 + t74*t97) + t221*t262 + t261*t39 + t263*t39;
    const t265 = t196*t20;
    const t266 = C2*t22;
    const t267 = t146*t188;
    const t268 = C1 + C2;
    const t269 = C5*(C1*(R3*(RL*t235 + t203 + t234) + RIN*(RL*t228 + t204)) + C2*t240 + C2*t242 + R2*(C2*t181 + C2*t239 + R3*(C2*t180 + RL*(C1*t70 + t266) + t104*t68 + t265) + RL*(C2*t206 + t62*t85)) + t226) + t25*(C2*t192 + C5*t225 + RL*(C2*t193 + RIN*(C1*R2 + C2*RV2)) + t129*t176 + t190*t268 + t21*t250 + t267);
    const t270 = C2*t213;
    const t271 = C6*t262;
    const t272 = RB*RL;
    const t273 = C1 + C5;
    const t274 = C5*RT1;
    const t275 = RL*(t139 + t74) + RV2*(RV1 + t145);
    const t276 = C5*t147;
    const t277 = C5*t169;
    const t278 = C5*t81;
    const t279 = C2 + C3;
    const t280 = C3*R1;
    const t281 = C5*t146;
    const t282 = t136*t74;
    const t283 = C1*t136;
    const t284 = t138*t145;
    const t285 = C5*t49;
    const t286 = t136 + t138;
    const t287 = t25*t81;
    const t288 = t138*t74;
    const t289 = R2*t25;
    const t290 = t288 + t289;

    const denZRe = C5*t29*(R2*(RT2*(RV2*t13 + t11) + t8*t9) + RM*(RT1*(R2*(R1*t12 + R3*(t24 + t8) + t1*t21 + t18*t19) + t6) + RV2*(RT2*t13 + t11) + t14*t9 + t17*(RL*(RIN*(R3 + RV2) + t15) + RV2*t0)) + t6*t7);
    const denYIm = C5*(t137*t138 + t26*t46*t48 + t73*(R3*(R2*(RL*(RT1*t38 + t58) + RV2*t58 + t21*(t52 + t59 + t60)) + t51*(R1*t49 + RIN*t57)) + RM*(R3*(R2*(RL*(t22*t53 + t52) + RT2*(RL*t70 + t69) + t67) + RL*t67 + RT2*(RL*(t38 + t66) + t67)) + t30*(RL*(RV2*t49 + t61) + RT1*t3) + t35*(RL*(RV2*t53 + t52) + RT1*t65 + t64)) + t30*t49*t51 + t35*(RL*(RT1*t8 + t55) + RV2*t55 + t21*(t52 + t56)))) + t29*(R3*(R2*(RL*(RV2*t39 + t40) + RM*t38 + t21*t39) + RM*t37) + RM*t31 + t35*(RL*(RV2*t32 + t34) + RV2*(RM*t16 + t14) + t32*t33));
    const denXRe = C5*(t137 + t138*(C2*(R3*(RL*(t102*t117 + t153) + RT2*(C1*t120 + RL*(C1*t124 + t149) + t153) + t107 + t151) + t100*(t109*t85 + t150) + t101) + C3*t145*t85*t97 + RT1*(C2*(C1*t134 + RL*(t131*t85 + t153) + t150*t20 + t151 + t90) + t154*t84 + t25*(t130 + t83*(t146 + t88))) + t136*(C1*(RIN*(RL*(RV2*t161 + t155) + t158*t159 + t64) + RT1*t160 + t35*(t159 + t63)) + C2*RT1*t133 + C2*(t100*(t162 + t163) + t127 + t134) + C4*t155*t83 + t146*(RT2*t23 + t118 + t119 + t158*t19) + t25*(RL*(RV2*t157 + t156) + t15*t81)) + t147*(RL*(RIN*t109 + RV2*(t109 + t121)) + t114 + t44 + t98) + t25*(R3*(R2*t105 + t100*t88 + t106) + t100*t148 + t126*t88 + t128)) + t50*(RT1*(t25*(C2*(C1*(R3*t164 + t30 + t77) + t148) + t84) + t80) + t136*(C2*t167*(RIN*(R3 + t74) + t166 + t2) + t25*(C1*(R3*t168 + RIN*t170) + C2*(R2*R3 + R2*(t16 + t68) + RIN*(R3 + t49) + t14 + t52 + t77)) + t75*(R3*(t163 + t165 + t17) + RIN*t112 + RIN*t17)) + t25*(C2*(R3*(C1*(t14 + t165) + R2*(C1*t16 + t87)) + t14*t85 + t99) + t26*(R1*(RIN*t157 + t156) + t0*t81)) + t76*(RIN*(R3*t16 + t14) + RT2*t77))) + t138*(t135*t136 + t95) + t48*t5*t84 + t73*(R3*(R2*(RL*(t143 + t144) + RV2*t144 + t141) + t140*t36) + t140*t30 + t35*(RL*(t142 + t143) + RV2*t142 + t141));
    const denAIm = C3*(C5*(C1*(R3*(R1*t236 + RIN*t232 + RT2*(RIN*t233 + t174*t36 + t97) + t19*t231) + RM*(R3*(t203 + t236) + RIN*t237) + t175*t230) + C2*(R2*(RM*(R3*(t177 + t21 + t233) + RL*t206 + t181 + t239) + t238) + RB*t238 + RM*(t240 + t242) + t209) + R1*(RL*(t159*t227 + t229*t85) + t226)) + t25*(C2*(RM*t194 + t176*t223) + C5*(RM*t225 + t224*t36) + t200*t222 + t220*t221) + t75*(RM*t219 + t177*t207 + t209 + t42*t74)) + C5*t75*(R2*(R3*(RT1*t23 + RT2*t177 + t179 + t181) + RIN*(RT1*t176 + t126) + t175*t30) + R3*(R1*(RB*t175 + RIN*t172 + t186) + RT1*t185 + RT2*(RL*(t184 + t187) + RV2*(t113 + t187) + t179) + t182) + RIN*(t100*t155 + t111*t175) + t173*t30) + RV1*(C3*(C6*t264 + t247*(C1*(R3*(RIN*(RB + t16) + RT1*t36 + t109 + t14 + t223) + RM*(R3*t158 + RIN*(R3 + t158) + RT1*t1 + t255) + t230 + t244) + C2*(RM*(R2*RT2 + R3*t213 + t111 + t162 + t187 + t252 + t260) + t208 + t52*t74 + t74*(RIN*t49 + t14))) + t254*(C2*t223 + R3*t222 + RM*t259 + t168*t222 + t221) + t257*(RM*(RIN*(RB + t78) + t256) + t208 + t30*t74)) + C6*(t219*t75 + t269) + t247*t75*(R3*(R1*t246 + RT2*t213 + t109 + t187 + t7) + RIN*(t111 + t155 + t245) + t244) + t254*(C2*t248*t85 + C5*(C2*t59 + RT2*(t250 + t85) + t196*t251 + t251*t85 + t253) + R3*(C1*t196 + C5*(C1*t246 + t249 + t250) + t164*t75))) + t25*(C5*(C1*(R3*(RL*(t202 + t69) + t201 + t203) + RIN*t200) + C2*(RL*(R2*t206 + t205) + t19*t7 + t191*t204 + t195) + t196*(R2*t175 + t186)) + t75*(RIN*(R2*t176 + t14*t20) + t189*t30 + t195));
    const denBRe = C3*t264 + RV1*(C3*(C2*t212 + RL*t258*t74 + RM*(C2*t116 + C2*(RL*t115 + t10 + t188 + t8) + t271) + t20*t221 + t247*t39*(t157 + t161) + t254*t39 + t265*t74 + t271*t36) + C6*(C1*(R3*(t172 + t21) + RIN*(t176 + t272)) + C2*t211 + C2*t214 + RL*(C2*t184 + R2*(t266 + t85)) + t103*t74 + t261 + t263 + t267) + t247*(C2*t113 + C2*t187 + C2*t260 + R3*(C1*(t68 + t74) + t249 + t270) + RT2*(t270 + t85) + t243*t85 + t253) + t254*(t146 + t259 + t85) + t257*(RIN*(R3 + RB) + t256 + t30)) + t269 + t75*(R3*(R1*(R2*RV2 + t172) + t215) + t218);
    const denCIm = C2*(R1*t5 + t74*(R1*t20 + t5)) + C3*t275*t32 + C5*t100*t158 + C5*t160 + R2*(RL*(C5*(RV1 + RV2) + t27) + RV1*RV2*(C2 + C5)) + R3*t273*t50 + RIN*t275*(C3 + t268) + t138*t154 + t146*t154 + t154*t274 + t25*(RL*(RV1 + t82) + RV2*(RV1 + t81)) + t50*(C5*(RB + t49) + t196 + t71);
    const denDRe = t275;
    const numZRe = C5*t15*t272*t28*t72*(R2*(RT2*t32 + t54) + RM*t14);
    const numYIm = t100*(t25*(C2*t276*(R2*t14 + RM*(R1*t81 + t245)) + t138*(t136*(t146*(t278 + t47) + t277*t47) + t281*(R2*(C2*t57 + t280) + t14*t279))) + t276*t28*(RM*(R1*t145 + t49*t74) + t207));
    const numXRe = t100*(R3*(C5*t102*(C2*(C3*(R2*(RM + RT2) + RB*RM + RT2*(RB + RM)) + t287) + C3*t287 + t279*t284) + C5*t283*t284 + t227*(t138*(C5*(t136 + t167 + t249) + t283) + t283*t285) + t25*(C1*t285*t47 + t286*(C1*t278 + t273*t47))) + t274*t28*t282 + t48*(t136*t274 + t138*(t136 + t274)));
    const numAIm = t100*(C2*(t136*t288 + t146*(RB*t136 + t290) + t286*t289) + C5*(C2*t169*(t282 + t290) + t146*(C2*(R1*R2 + RT2*t248 + t231) + t145*t280 + t145*t286 + t287)));
    const numBRe = t100*(t145*t281 + t227*(t146 + t277 + t286) + t48);
    const numCIm = C2*t217;
    const numDRe = 0;

return [
      [numDRe, numCIm, numBRe, numAIm, numXRe, numYIm, numZRe],
      [denDRe, denCIm, denBRe, denAIm, denXRe, denYIm, denZRe]
    ];
  }
}