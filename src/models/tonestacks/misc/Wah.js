import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';
import WahNotes from '~/components/tonestacks/WahNotes.vue'

const customDisplayNames = {
  // Display Bs as betas
  RB2: 'R\u03B22',
  RB1: 'R\u03B21',
  RB12: 'R\u03B212',
  B1: '\u03B21',
  B2: '\u03B22'    
};

export class Wah extends BaseTonestack {
  static definition() {
    return {
      id: 'wah',
      name: 'Wah',      
      components: {
        RIN: 68e3,
        RC1: 22e3,
        RE1: 470,
        RE2: 10e3,
        RQ: 33e3,
        RF: 1500,
        RW: 100e3,
        RB2: 470e3,
        RB1: 470e3,
        RB12: 82e3,
        CIN: 10e-9,
        CB1: 4.7e-6,
        C2: 220e-9,
        C3: 220e-9,
        C: 10e-9,
        L: 500e-3,
        B1: 220,
        B2: 220
      },
      controls: {
        RW: Tapers.Linear
      },
      magnitudePlotRange: [-24, 24],      
      getNotesComponent: () => WahNotes
    };
  }

  getComponentDisplayLetter(name) {
    return getComponentLetter(customDisplayNames[name] || name);
  }

  getComponentDisplaySubscript(name) {
    return getComponentSubscript(customDisplayNames[name] || name);
  }

  evaluateBias() {
    var VCC = 9;
    var VBE1 = 0.6;
    var VBE2 = 0.6;

    let { RIN, RC1, RE1, RE2, RQ, RF, RW, RB2, RB1, RB12, CIN, CB1, C2, C3, C, L, B1, B2 } = this.components;

    // Evaluate biasing condition to find out the value for rpi1 and rpi2
    const RL = 100*RQ/(100 + RQ);
    var OS = VCC + VBE2*(RC1/(RB2+(B2+1)*RE2)) - VBE1 - VBE1*(RC1+RB1)/RB12 - VBE1*(RB12+RB1)*RC1/((RB2 + (B2+1)*RE2)*RB12);
    var NIM = RB1 + RL + RF + (B1+1)*(RC1+RE1) + RC1*RB1/(RB2 + (B2+1)*RE2);
    var X1 = (RL + RF + (B1 + 1)*RE1)*(RB12+RB1)*RC1/(RB12*(RB2 + (B2+1)*RE2));
    var X2 = (RL + RF + (B1 + 1)*RE1)*(RC1 + RB1)/RB12;

    var IBQ1 = OS/(NIM+X1+X2);

    var Ix = (IBQ1*(B1+1)*RE1 + IBQ1*(RL+RF) + VBE1)/RB12;
    var IBQ2 = -(VBE2 - Ix*(RB12+RB1) - IBQ1*RB1)/(RB2 + (B2+1)*RE2);

    //IBQ2 = (VCC - IBQ1*(RB1 + RL + RF + (B1 +1)*(RC1 + RE1)) - ((RL + RF + (B1 + 1)*RE1)/RB12)*IBQ1*(RC1 + RB1) - VBE1*(RC1+RB1)/RB12 - VBE1)/RC1

    var ICQ1 = B1*IBQ1;
    var gm1 = ICQ1/0.025;
    let rpi1 = B1/gm1;

    var ICQ2 = B2*IBQ2
    var gm2 = ICQ2/0.025;
    let rpi2 = B2/gm2;

    const VC1 = VCC - (ICQ1 + IBQ1 + Ix + IBQ2)*RC1;
    const VE2 = VC1 - IBQ2*RB2 - VBE2;
    //VE2 = IBQ2*(B2+1)*RE2
    //VC1 = VE2 + VBE2 + IBQ2*RB2

    const RI = RIN;

    // evaluate maximum and minimum resonance frequencies and filter Q values
    var RG2 = RW;
    rpi1 = rpi1 + (B1+1)*RE1;
    var RPP = RI*rpi1/(RI+rpi1);
    var T00 = (RPP/rpi1)*B1*RC1*(B2+1)*RE2*RG2/( (RF+RPP)*(RC1+RG2)*( (B2+1)*RE2 + (1+RE2/RQ + RE2/(RF+RPP))*( rpi2 + RC1*RG2/(RC1+RG2) ) ) );
    var fmax = 1/(2*Math.PI*Math.sqrt(L*C));
    var fmin = fmax/(Math.sqrt(1+T00))
    var Qmin = Math.sqrt(C/L)*RQ*(RF+RPP)/(RQ+RPP+RF);
    var Qmax = Qmin*Math.sqrt(1+T00);

    this.noteData = {
      VC1, VE2, rpi1, rpi2, fmax, fmin, Qmax, Qmin
    };

    this.details = {
      rpi1,
      rpi2
    };
  }

  calculateCoefficients(controlValues) {
    this.evaluateBias();

    let { RIN, RC1, RE1, RE2, RQ, RF, RW, RB2, RB1, RB12, CIN, CB1, C2, C3, C, L, B1, B2 } = this.components;
    let { rpi1, rpi2 } = this.details;
    const c = this.getControlTaperedValues(controlValues);           

    let [RG2, RG1] = splitPotValue(RW, c.RW);
    RG2 += 1;

    const RI = RIN;
    const CI = CIN;

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 67734 (*, +, -)
    // Optimized operations: 2585 (26.20x less)
    const t0 = RB2*RQ;
    const t1 = RC1*RE2;
    const t2 = RG1*rpi1;
    const t3 = RG2*t2;
    const t4 = RB1*RE2;
    const t5 = B1*RI;
    const t6 = RB2 + RG1;
    const t7 = RC1*t6;
    const t8 = RG2*t7;
    const t9 = RB2*RG1;
    const t10 = RG2*rpi1;
    const t11 = RQ*t10;
    const t12 = RI*rpi1;
    const t13 = RE2 + RQ;
    const t14 = RI + rpi1;
    const t15 = RF*t14;
    const t16 = RG1*RG2;
    const t17 = RG1 + RG2;
    const t18 = RB2*t17;
    const t19 = t16 + t18;
    const t20 = RB1*RG1;
    const t21 = RB1 + RG1;
    const t22 = RB2*t21 + t20;
    const t23 = RC1*t22;
    const t24 = RB1*t19 + t23 + t8;
    const t25 = t4*t9;
    const t26 = RE2*t23;
    const t27 = RG2*t26;
    const t28 = RE2*t6;
    const t29 = B1*RG2;
    const t30 = RB1*t29;
    const t31 = B2*RE2;
    const t32 = RB2*t20 + t23;
    const t33 = RE2*rpi1;
    const t34 = RB1 + RE2;
    const t35 = RC1*rpi1;
    const t36 = RG1 + rpi1;
    const t37 = C*C3;
    const t38 = CB1*L;
    const t39 = C2*t38;
    const t40 = RB12*t39;
    const t41 = CI*t40;
    const t42 = rpi2 + t31;
    const t43 = RE2 + t42;
    const t44 = RG1*rpi2;
    const t45 = B2 + 1;
    const t46 = RE2*t45;
    const t47 = RG1*t46;
    const t48 = C2*RB12;
    const t49 = RQ*t14;
    const t50 = RF*rpi1;
    const t51 = RF + rpi1;
    const t52 = RI*t51;
    const t53 = t50 + t52;
    const t54 = t49 + t53;
    const t55 = L*t54;
    const t56 = CB1*t55;
    const t57 = CI*RC1;
    const t58 = t56*t57;
    const t59 = RE2*RF;
    const t60 = RE2 + RF;
    const t61 = RQ*t60 + t59;
    const t62 = RB2*t61;
    const t63 = rpi1*t62;
    const t64 = RF*rpi2;
    const t65 = B2*RF;
    const t66 = RF + rpi2;
    const t67 = t65 + t66;
    const t68 = RQ*t67 + t64;
    const t69 = RE2*t68;
    const t70 = RQ*t64 + t69;
    const t71 = RE2*rpi2;
    const t72 = RB2*RI;
    const t73 = RF + RI;
    const t74 = RI*t71 + RQ*(RI*t46 + rpi2*t73) + t13*t72 + t69;
    const t75 = CB1*RB12;
    const t76 = L*t17;
    const t77 = C2*t76;
    const t78 = t57*t77;
    const t79 = RE2*t64;
    const t80 = RE2*t67 + t64;
    const t81 = RQ*t80 + t79;
    const t82 = RI*t81;
    const t83 = RG2*rpi2;
    const t84 = RG1 + rpi2;
    const t85 = RG2*t84;
    const t86 = t44 + t85;
    const t87 = RG2*t61;
    const t88 = RG2*t68;
    const t89 = B2*RQ;
    const t90 = rpi1 + t66;
    const t91 = rpi1*rpi2;
    const t92 = t64 + t91;
    const t93 = RQ*t90 + t92;
    const t94 = t51*t89 + t93;
    const t95 = RG2 + rpi2;
    const t96 = RQ + t89 + t95;
    const t97 = RF + RQ;
    const t98 = RG2*t97;
    const t99 = t68 + t98;
    const t100 = C2*L;
    const t101 = rpi2*t9;
    const t102 = RG2*(rpi2*t6 + t9) + t101;
    const t103 = C2*t102;
    const t104 = CI*t53;
    const t105 = RQ*t104;
    const t106 = L*t105;
    const t107 = t103*t106;
    const t108 = t18*t50;
    const t109 = RQ*t66 + t64;
    const t110 = rpi1*t109;
    const t111 = RI*t93 + t110;
    const t112 = RG1*t99 + t88;
    const t113 = RG2*t109;
    const t114 = RQ + rpi2;
    const t115 = RG2*(RG1 + t114);
    const t116 = t115 + t44;
    const t117 = t109 + t98;
    const t118 = RB2*rpi1;
    const t119 = CI*t100;
    const t120 = CB1*RQ;
    const t121 = L*t51;
    const t122 = t103*t121;
    const t123 = t120*t122;
    const t124 = RB2*rpi2;
    const t125 = RB2 + rpi2;
    const t126 = RG2*t125 + t124;
    const t127 = t120*t126;
    const t128 = RG1*t114;
    const t129 = RG2*(RB2*t84 + t0 + t128);
    const t130 = L*t104;
    const t131 = RG2*t111;
    const t132 = RQ + t51;
    const t133 = RG2*t132 + t93;
    const t134 = RI*t133;
    const t135 = rpi1*t98;
    const t136 = t110 + t135;
    const t137 = t38*(RB2*(t134 + t136) + t131);
    const t138 = t120*t53;
    const t139 = t102*t138;
    const t140 = RG2*t114;
    const t141 = RF*RQ;
    const t142 = RF*RG1;
    const t143 = RQ*rpi2;
    const t144 = t143 + t64;
    const t145 = B1 + 1;
    const t146 = t140*t145 + t93;
    const t147 = t145*t95;
    const t148 = RB2 + RG2;
    const t149 = t120*t148;
    const t150 = t149*t53;
    const t151 = RG1 + RQ;
    const t152 = t29 + t51;
    const t153 = RQ*t152;
    const t154 = t142 + t2;
    const t155 = RB2*(t153 + t154) + RG1*t153;
    const t156 = B2*L;
    const t157 = CI*t156;
    const t158 = RG2*t93;
    const t159 = RB2*(RG1*t133 + t158) + t16*t93;
    const t160 = RG2*t6 + t9;
    const t161 = C2*t160;
    const t162 = t120*t121;
    const t163 = B2*t162;
    const t164 = t159*t39 + t161*t163;
    const t165 = RB2*RE2;
    const t166 = RI*t62 + t82;
    const t167 = RE2*t110;
    const t168 = RB2*t132;
    const t169 = t114 + t89;
    const t170 = B1*t45;
    const t171 = t170 + 1;
    const t172 = RQ*t171;
    const t173 = RF + t172;
    const t174 = RG2*t173 + t68;
    const t175 = RC1*(RE2*(RI*t168 + RI*(RG1*t173 + t174) + rpi1*(RI*(t169 + t17) + RQ*t65) + t135) + RQ*(RB2*t52 + t50*t95 + t52*(rpi2 + t17)) + t167 + t2*t61 + t63);
    const t176 = RC1*t43;
    const t177 = RC1 + RE2;
    const t178 = t177 + t42;
    const t179 = RG2*t178 + t176;
    const t180 = RE2 + t31 + t95;
    const t181 = CI*t56;
    const t182 = t181*t48;
    const t183 = RE2*t171 + RF;
    const t184 = C2*t6;
    const t185 = t121*t95;
    const t186 = t184*t185;
    const t187 = t120 + t184;
    const t188 = B1*RQ;
    const t189 = RG2*t188;
    const t190 = t133*t38;
    const t191 = t120*t51;
    const t192 = RI*t152 + t50;
    const t193 = CI*t192;
    const t194 = t14 + t5;
    const t195 = RG2*t194;
    const t196 = rpi1*t66;
    const t197 = RI*t90 + t196;
    const t198 = L*(t195 + t197) + t138*t95;
    const t199 = L*(RI*(RG2*(t132 + t188) + t93) + t136);
    const t200 = RG2*t90;
    const t201 = RG2 + t90;
    const t202 = t118*(RG1*t66 + RG2*(RG1 + t66)) + t16*t197 + t72*(RG1*t201 + t200);
    const t203 = t104*t156;
    const t204 = C3*t55;
    const t205 = t31*t57;
    const t206 = RE2 + rpi2;
    const t207 = RB2*(RE2*RG1 + RG2*(RE2 + t84) + t44) + t16*t206;
    const t208 = RE2 + t125;
    const t209 = C2*t17;
    const t210 = CI*t55;
    const t211 = t210*t46;
    const t212 = t103*t210;
    const t213 = L*t132;
    const t214 = CB1*t213;
    const t215 = t103*t214;
    const t216 = t161*t214;
    const t217 = t148*t56;
    const t218 = RG2*t145;
    const t219 = RI*t218 + t10;
    const t220 = t219 + t54;
    const t221 = RQ*rpi1;
    const t222 = B1*RG1;
    const t223 = t218 + t222 + t36 + t97;
    const t224 = t10 + t2;
    const t225 = t224 + t50;
    const t226 = RI*t223 + t221 + t225;
    const t227 = RB2*t226;
    const t228 = L*t126;
    const t229 = t228*t54;
    const t230 = CB1*t229;
    const t231 = RQ + t66;
    const t232 = rpi2*t151;
    const t233 = rpi2*t145;
    const t234 = t132 + t233;
    const t235 = RQ + rpi1;
    const t236 = rpi2*t235 + t64;
    const t237 = RG2*t234 + t236;
    const t238 = RG1*t147;
    const t239 = t105*t125;
    const t240 = t239*t77;
    const t241 = t120*t125;
    const t242 = t121*t241;
    const t243 = t209*t242;
    const t244 = t140 + t44;
    const t245 = C2*(RB2*(RG2 + RQ) + RQ*t84 + t244 + t9);
    const t246 = RB2*t54;
    const t247 = L*(t111 + t246);
    const t248 = CB1*t247;
    const t249 = t241*t53;
    const t250 = t17*t249;
    const t251 = rpi1*t140 + t110;
    const t252 = B1*t17;
    const t253 = t252 + t51;
    const t254 = RI*t253 + t50;
    const t255 = C2*t254;
    const t256 = L*t89;
    const t257 = t168 + t93;
    const t258 = t257*t77;
    const t259 = CB1*t258 + t163*t209;
    const t260 = RQ*t103;
    const t261 = t161*t51;
    const t262 = t260*t53;
    const t263 = RE2*(CI*(L*(RB2*t134 + t117*t118 + t131) + t262) + t100*t159 + t256*(t104*t148 + t261)) + t105*t228 + t121*t260;
    const t264 = t121*t127;
    const t265 = RQ + t125;
    const t266 = RG2*t265;
    const t267 = t124 + t266;
    const t268 = t143 + t267;
    const t269 = t38*(RB2*t133 + t158);
    const t270 = C2*RQ;
    const t271 = t270*t53;
    const t272 = CI*RI;
    const t273 = L*t267;
    const t274 = t102*t191;
    const t275 = t140 + t93;
    const t276 = RG1*(rpi1 + t95) + t142;
    const t277 = t127*t53;
    const t278 = RG2*t14;
    const t279 = RB2*(t197 + t278);
    const t280 = rpi2*t36 + t154 + t64 + t85;
    const t281 = C2*RG1;
    const t282 = C2*RG2 + t120;
    const t283 = t281 + t282;
    const t284 = RB2*t14;
    const t285 = L*(t197 + t284) + t249;
    const t286 = t6 + t95;
    const t287 = C2*t286;
    const t288 = t121*t287;
    const t289 = C2*t253;
    const t290 = t120 + t272;
    const t291 = B1*L;
    const t292 = RG1*t132 + t133 + t168;
    const t293 = t36 + t66;
    const t294 = RC1 + t46;
    const t295 = RG2*t294 + t176;
    const t296 = C2*t210;
    const t297 = CB1*t51;
    const t298 = CI*t14;
    const t299 = t297 + t298;
    const t300 = L*(t120 + t299) + t104*t120;
    const t301 = RC1*t180;
    const t302 = L*t14 + t138;
    const t303 = t228 + t260;
    const t304 = RQ*t184;
    const t305 = L + t304;
    const t306 = L*t201;
    const t307 = rpi2*t51;
    const t308 = t120*t307;
    const t309 = L*t152;
    const t310 = RF + t29;
    const t311 = CI*t73;
    const t312 = t120 + t311;
    const t313 = RI*(t218 + t90) + t196;
    const t314 = RB2*(t200 + t276) + t16*t90;
    const t315 = L*t148;
    const t316 = t105 + t121;
    const t317 = L*t184;
    const t318 = t304*t53;
    const t319 = RC1*t31;
    const t320 = C3*t213;
    const t321 = C2*RC1;
    const t322 = C3*RQ;
    const t323 = t322*t53;
    const t324 = t209*t55;
    const t325 = t125*t55;
    const t326 = RG2*t208 + t124 + t165;
    const t327 = RQ*t209;
    const t328 = t121*t125;
    const t329 = t209*t51;
    const t330 = t125*t327;
    const t331 = t330*t53;
    const t332 = RE2*(CI*(t247 + t331) + t256*(t104 + t329) + t258) + t106*t125 + t327*t328;
    const t333 = L*t265;
    const t334 = t330 + t333;
    const t335 = C2*t252;
    const t336 = t257*t38;
    const t337 = CI*t5;
    const t338 = t289 + t337;
    const t339 = t17*t241*t51;
    const t340 = RG2 + t36;
    const t341 = t145*t17;
    const t342 = t341 + t51;
    const t343 = RI*t342 + t225;
    const t344 = t125*t270;
    const t345 = t121*t126;
    const t346 = CI*t72;
    const t347 = t141*t95;
    const t348 = L*rpi1;
    const t349 = t260*t51;
    const t350 = RB2*t95;
    const t351 = CI*RQ;
    const t352 = RE2*(L*(RB2*t99 + t88) + rpi1*t315*t89 + t346*t347 + t348*(t0 + t267) + t349 + t351*(t12*t350 + t350*t50 + t53*t83)) + RQ*t345;
    const t353 = RB2*t51;
    const t354 = t195 + t53;
    const t355 = t105*t126 + t349;
    const t356 = CI*t125;
    const t357 = t324*t356;
    const t358 = t125*t209;
    const t359 = t214*t358;
    const t360 = RG1*t234 + t237;
    const t361 = t10*t231 + t91*t97;
    const t362 = t132*t228;
    const t363 = CB1*t362;
    const t364 = RG2*(t235 + t66) + t236;
    const t365 = RB2*t194;
    const t366 = t365*t95;
    const t367 = t233 + t51;
    const t368 = RG2*t367;
    const t369 = t368 + t92;
    const t370 = RG2*t196 + rpi2*t50;
    const t371 = RI*t369 + t370;
    const t372 = t238 + t307 + t368;
    const t373 = t148*t214;
    const t374 = RB2*t223;
    const t375 = RB2*t343;
    const t376 = t105 + t213;
    const t377 = CI*(t229 + t262) + t103*t213 + t46*(t148*t210 + t161*t376);
    const t378 = C2*t46;
    const t379 = RB2 + t90;
    const t380 = L*t379;
    const t381 = t120*t353;
    const t382 = t197 + t72;
    const t383 = t270*t286;
    const t384 = RB2 + t341;
    const t385 = t270*t272;
    const t386 = C2*t221;
    const t387 = L*t194 + t138;
    const t388 = t383*t53;
    const t389 = t304*t51;
    const t390 = t389*t95;
    const t391 = rpi2*t297;
    const t392 = CI*rpi1;
    const t393 = t297 + t392;
    const t394 = RG2*t393;
    const t395 = t391 + t394;
    const t396 = RQ*t261;
    const t397 = L + t191;
    const t398 = L + RQ*t299;
    const t399 = RQ*t161;
    const t400 = t327*t53 + t55;
    const t401 = CI*t400;
    const t402 = t148*t376 + t396;
    const t403 = RB12*RC1;
    const t404 = B1*RE2;
    const t405 = RG2*(RB12*(RC1*(t404 + t60) + t59) + RC1*t59);
    const t406 = RG2*(RB12*t177 + t1);
    const t407 = RC1*t71;
    const t408 = RQ*t125;
    const t409 = RB2*RF;
    const t410 = RQ*(RB2 + t67);
    const t411 = t265 + t89;
    const t412 = t239 + t329*t408;
    const t413 = RE2*(L*(t409 + t410 + t64) + t348*t411 + t412) + t121*t408;
    const t414 = CB1*RF;
    const t415 = RB2*RG2;
    const t416 = t218 + t51;
    const t417 = RB2*t393;
    const t418 = RG2*t308 + t381*t95;
    const t419 = t355 + t362 + t402*t46;
    const t420 = t125*t214;
    const t421 = t125*t401 + t213*t358 + t46*(t209*t376 + t210);
    const t422 = t383*t51;
    const t423 = t209*t221;
    const t424 = RC1 + rpi2;
    const t425 = C*RQ;
    const t426 = t125 + t46;
    const t427 = RB1*t426;
    const t428 = RF*RI + rpi1*t73;
    const t429 = RB2 + t46;
    const t430 = t351*t429;
    const t431 = B2*t4;
    const t432 = RB1*RB2;
    const t433 = RB1*rpi2;
    const t434 = RB1 + t426;
    const t435 = RC1*t434 + t4 + t432 + t433;
    const t436 = C3*RG2;
    const t437 = C3*t45;
    const t438 = t353*(RE2*(C + t437) + t436);
    const t439 = C*RE2;
    const t440 = C3*RB2;
    const t441 = t436 + t439 + t440;
    const t442 = t272 + t441;
    const t443 = t298 + t441;
    const t444 = RB1*t436;
    const t445 = C*RB1;
    const t446 = RB1 + RG2;
    const t447 = C3*RB1;
    const t448 = RB1*RG2;
    const t449 = RB1 + t51;
    const t450 = RB1 + RF;
    const t451 = RE2*t450;
    const t452 = RB2*t449;
    const t453 = B1*t125;
    const t454 = RB1 + t145*t46 + t379 + t453;
    const t455 = t31*t449;
    const t456 = RC1*t454 + t452 + t455;
    const t457 = t436 + t445;
    const t458 = C + C3;
    const t459 = RE2*t458 + t436;
    const t460 = RF*t445 + t436*t450;
    const t461 = C*RF;
    const t462 = RB1 + t416;
    const t463 = C3*RF + C3*t218 + t447;
    const t464 = t16*t59;
    const t465 = B1*rpi2;
    const t466 = t321*t76;
    const t467 = -rpi1;
    const t468 = RF*t170 + t467;
    const t469 = RB1*(RB12 + RQ);
    const t470 = RB12*RQ + t469;
    const t471 = RG2*t470;
    const t472 = RB1 + RB12;
    const t473 = B1*RF;
    const t474 = RB12*rpi1;
    const t475 = RB12*RF;
    const t476 = RB12 + RF;
    const t477 = RB1*t476;
    const t478 = t100*t19;
    const t479 = RG2*(C2 + C3) + t281;
    const t480 = L*t436;
    const t481 = B1*RB1;
    const t482 = B1*t97;
    const t483 = RB1*t482;
    const t484 = B1*(RF*t45 + rpi2) + t467;
    const t485 = B1*(RB1 + t97) + t467;
    const t486 = RB2*t485;
    const t487 = t465 + t467;
    const t488 = RQ*t487;
    const t489 = t169*t473;
    const t490 = t488 + t489 - t91;
    const t491 = RB12*t414;
    const t492 = B1*t64;
    const t493 = RB12*t487;
    const t494 = B2*RB12 + RB12;
    const t495 = rpi2 + t494;
    const t496 = t473*t495 + t493;
    const t497 = RB12*(t467 + t473);
    const t498 = RB12*t95;
    const t499 = rpi2 + t46;
    const t500 = RG2*t499;
    const t501 = C2*(RG1*(RB2*t46 + t350 + t500) + t415*t499);
    const t502 = RB1*t403;
    const t503 = t188*t64;
    const t504 = t29*(CB1*t97 + t281);
    const t505 = t125*t497;
    const t506 = t209*t426;

    const denZRe = t37*t41*(RI*(RE2*t10*t32 + RQ*(RG2*(RB2*(RB1*(RE2*t36 + t2) + t35*(RG1 + t34)) + t2*(RC1*t34 + t4)) + t27 + t32*t33)) + RQ*t31*(RI*(rpi1*(RB1*t18 + RC1*(RB2*(RG2 + t21) + t16 + t20) + RG2*t20) + t30*t7) + t15*t24) + RQ*t4*t5*t8 + rpi2*t24*(RE2*t12 + RQ*(RE2*t14 + t12) + t13*t15) + t0*t1*t3 + t11*t4*(t7 + t9) + t15*(RG2*t25 + RQ*(RG2*(RB1*(t28 + t9) + RC1*(t22 + t28)) + t25 + t26) + t27));
    const denYIm = C*t75*t78*(RI*(t62 + t70) + rpi1*t74 + t63) + C3*t48*t58*(RB2*(RG2*(RG1 + t43) + t44 + t47) + t16*t43) + RB1*(C*t41*(RQ*t108 + t17*(rpi1*(t165*t97 + t74) + t166) + t175) + C3*(C*(RB12*(RC1*(RE2*(CI*(CB1*t199 + t184*t198) + t156*(t184*t191 + t187*t193) + t184*t189*t38*t45 + t184*t190) + t120*t186 + t130*t187*t95) + RE2*(CI*(C2*(L*t202 + t139) + t137) + t164 + t203*(t149 + t161)) + t123 + t130*(t103 + t127)) + t107 + t119*(RE2*(RI*t159 + t112*t118 + t113*t2 + t89*(RF*t3 + t160*t52)) + t7*(RI*(RG2*(RQ*t183 + t59) + t70) + rpi1*t87 + rpi1*(RI*(RG2*t13 + RQ*t46 + t143 + t71) + t141*t42) + t167))) + t182*(RB2*(RG1*t180 + t179) + RG1*t179))) + t37*(RB12*(RC1*(RE2*(CI*(C2*(L*(RI*(RB2*(RG1*(t147 + t51) + t146) + RG1*t146) + t118*(t116 + t141 + t142 + t144) + t2*(t109 + t140)) + t139) + t137) + t157*(C2*(RB2*t151*t50 + RI*t155 + t141*t2) + t150) + t164) + t123 + t130*(C2*(rpi2*(RQ*t6 + t9) + t129) + t127)) + RE2*t119*(t111*t16 + t112*t72 + t118*(RG1*t117 + RI*(RG1*RQ + t116) + t113) + t89*(t108 + t12*t18 + t16*t53)) + t107) + t100*t57*(RB2*(RE2*(RI*(RG1*(rpi1*t96 + t99) + RG2*t94) + rpi1*t88) + RQ*(t50*t83 + t52*t86) + t2*(t81 + t87)) + t16*(rpi1*(RI*(RQ*t43 + t71) + t81) + t82)));
    const denXRe = C*(RB12*(CI*RE2*t77*(RI*t68 + rpi1*(RI*t169 + t68 + t72) + t118*t97 + t72*t97) + RC1*(RE2*(CI*t256*(CB1*t53 + t255) + CI*(C2*(L*(RI*(t128*t145 + t146) + t114*t2 + t227 + t251) + t250) + t248) + t259) + t130*(t241 + t245) + t243) + t240) + t78*(rpi1*(t62 + t74) + t166)) + C2*t204*t207*t57 + RB1*(C*(RB12*(RC1*(RE2*(CI*(C2*(L*(RI*(RG2 + t293) + t196 + t224 + t284) + t138*t286) + t56) + t120*t156*t289 + t157*(t120*t5 + t255) + t291*(t120*t272 + t209*t290) + t292*t39) + t120*t288 + t130*(C2*(rpi2 + t6) + t282)) + RE2*(CI*(t209*t285 + t248) + t203*t283 + t259) + t125*t130*t283 + t243) + t119*(RE2*t17*(RI*t94 + rpi1*t68 + t246) + t175) + t240) + C3*(C*(RB12*(RC1*(RE2*(B2*(L*t290*t310 + rpi1*(L*t312 + t304*t311) + t184*t309 + t272*t304*t310) + CI*(t198 + t304*(t10 + t313)) + L*t187*t29 + t184*(RG2*t191 + t306 + t308) + t190) + t104*t305*t95 + t120*t185 + t186) + RE2*(B2*(t161*t316 + t315*(RF*t290 + rpi1*t312)) + C2*(L*t314 + t274) + CI*(L*(RG2*t197 + t279) + t202*t270 + t277) + t269) + t104*t303 + t122 + t264) + RC1*(RE2*(CI*(t199 + t318*t95) + t133*t317 + t189*t317 + t256*(t152*t184 + t193)) + t106*t95 + t185*t304) + t263) + RB12*(CI*(t103*t302 + t230) + t215 + t301*(t181 + t184*t300) + t46*(CI*(t161*t302 + t217) + t216)) + t212 + t296*(RB2*(t295 + t47) + RG1*t295)) + t182*(RB2*(RC1 + t17) + t17*t178 + t176)) + RB12*(C3*(RC1*(CI*(C2*(L*(RI*(RB2*(t237 + t238) + RG1*t237) + t118*(RG2*(t151 + t66) + t232 + t64) + t2*(RG2*t231 + t144)) + t139) + t230) + t215 + t46*(CI*(C2*(L*(RG1*t220 + t227) + t138*t160) + t217) + t216)) + t161*t211 + t212) + t209*t58*(t208 + t31)) + t161*t204*t205 + t37*(RB12*(RC1*(C2*t121*(RB2*(t115 + t232) + RG1*(t140 + t143)) + RE2*(B1*(C2*(L*(t101 + t129) + RQ*t102*t272) + t272*t273) + B2*CI*(L*(RB2*t53 + RQ*t192) + t271*t9) + C2*(L*(RB2*(t275 + t276) + RG1*t275) + t274) + CI*(L*(RI*t275 + t251 + t279) + t270*(t118*(rpi2*(RF + RG1) + t142 + t85) + t280*t72 + t44*(t278 + t53)) + t277) + t156*(C2*t155 + t149*t51) + t269) + t104*(L*t268 + t260) + t264) + t263) + RC1*t263);
    const denAIm = C*(RB12*(RC1*(RE2*(C2*(L*(RB2*(t340 + t97) + RQ*t293 + t244 + t92) + t339) + CI*(t194*t333 + t249 + t343*t344) + t256*(t297 + t338) + t333*t335 + t336) + t104*t334 + t121*t245 + t242) + t332) + RC1*t332) + RB1*(C*(RB12*(RC1*(RE2*(B2*(C2*(L*t253 + t254*t351) + t290*t291) + C2*(L*(t148 + t293) + t191*t286) + CI*(t386*(RG2 + RI + t6 + t66) + t387) + t214 + t283*t291 + t385*(t384 + t66)) + t104*(L + t383) + t162 + t288) + RE2*(B2*(L*(CI*t50 + CI*t52 + t191) + t209*t316) + CI*(t285 + t327*(t118 + t382)) + t209*(t308 + t380 + t381) + t336) + t104*t125*(L + t327) + t209*t328 + t242) + RC1*(RE2*(CI*(L*(RQ*t194 + t53) + t388) + t100*t292 + t188*t77 + t256*t338) + t106 + t121*t383) + t332) + C3*(C*(RB12*(RC1*(RE2*(B2*(RQ*t193 + t153*t184 + t309) + RQ*(CI*t313 + t395) + t201*t304 + t29*t305 + t306) + t105*t95 + t185 + t390) + RE2*(B2*(t148*t316 + t396) + L*(RB2*t90 + RG2*t379) + RQ*(RB2*(CI*(RG2*RI + t197) + t395) + RG2*(CI*t197 + t391)) + t270*t314) + t345 + t355) + RC1*(RE2*(L*t174 + rpi1*(L*t96 + RQ*t311*t95) + t272*t347 + t390) + RQ*t185) + t352) + RB12*(CI*(t103*t49 + t126*t302) + t103*t397 + t301*(t184*t398 + t300) + t363 + t46*(CI*(t148*t302 + t161*t221) + t161*t397 + t272*t399 + t373)) + t301*(CI*(t318 + t55) + t184*t213) + t377) + RB12*(RC1*(CI*(t287*t302 + t56) + t214*t287 + t300*t378) + t356*(t209*t302 + t56) + t359 + t46*(t181 + t209*t300)) + t296*(RB2*RC1 + t17*t294 + t176) + t357) + RB12*(C3*(RC1*(C2*(L*(RB2*(RG1*t95 + t364) + RG1*t364) + t274) + CI*(L*(RI*t237 + t361 + t366) + t270*(RB2*(RI*t372 + t2*t95 + t370) + RG1*t371) + t277) + t103*t291 + t363 + t46*(C2*(L*(RG1*(t132 + t218) + t374) + t160*t191) + CI*(L*(t220 + t365) + t150 + t270*(RG1*t354 + t375)) + t373)) + t377) + RC1*(CI*(C2*(L*(RI*t360 + t2*t231 + t227 + t361) + t250) + t125*t56) + t359 + t46*(CI*(C2*(L*t226 + t138*t17) + t56) + t209*t214)) + t209*t211 + t357) + t161*t319*t320 + t205*(C2*(t160*t323 + t17*t55) + t148*t204) + t207*t320*t321 + t37*(RB12*(RC1*(RE2*(B1*(t260 + t273) + B2*(L*(t153 + t353) + t0*t104 + t270*t51*t9) + L*(RB2*t66 + t109 + t266) + rpi1*t333 + t127*t51 + t270*(RB2*t280 + t44*(RG2 + t51)) + t351*(RB2*(rpi2*t194 + t219 + t53) + rpi2*t354)) + t121*t268 + t355) + t352) + RC1*t352) + t57*(C3*(t207*t271 + t326*t55) + RE2*t324 + t209*t325);
    const denBRe = C*(RB12*(RC1*(RE2*(B1*t334 + L*(B2*t188 + t265) + t344*(RF + t340) + t408*(rpi1*(CB1 + CI) + t145*t272 + t414)) + t121*t265 + t412) + t413) + RC1*t413) + RB1*(C*(RB12*(RC1*(RE2*(B2*(RQ*t338 + t291) + L + RQ*(C2*(t384 + t90) + CI*t194 + t297) + t291) + t316 + t422) + RE2*(B2*(t316 + t423) + RQ*(CI*t382 + t391 + t417) + t209*t410 + t380 + t423) + t328 + t412) + RC1*(RE2*(L*(t172 + t51) + t105 + t422) + RQ*t121) + t413) + C3*(RB12*(CI*t126*t49 + t301*(L + RQ*(t184 + t299)) + t303 + t418 + t46*(t148*t398 + t399)) + t301*(t376 + t389) + t419 + t425*(RB2*(RB12*t80 + RG2*(RB12*t60 + t59) + t79) + RG2*(RB12*(RC1*t183 + t80) + t424*t59) + t10*(RB12*t178 + RE2*t424) + t118*(RB12*t43 + RG2*(RB12 + RE2) + t71) + t403*(rpi1*t42 + t33 + t80) + t407*t51)) + RB12*(RC1*(CI*(t287*t49 + t302) + t214 + t287*t397 + t378*t398) + t356*(t209*t49 + t302) + t358*t397 + t420 + t46*(t209*t398 + t300)) + RC1*(CI*(t388 + t55) + t213*t287 + t376*t378) + t421) + RB12*(C3*(RC1*(B1*t228 + L*(t124 + t364 + t415) + t270*(RB2*t372 + RG1*t369) + t351*(t366 + t371) + t418 + t46*(L*(t132 + t145*t148) + RQ*(CI*(RI*t416 + t50) + t145*t346 + t394 + t417) + t270*(RB2*t342 + RG1*t416))) + t419) + RC1*(C2*(L*(t360 + t374) + t339) + CI*(L*(RI*t234 + rpi1*t231 + t365) + t249 + t270*(RI*(RG1*t367 + t369) + t2*t66 + t370 + t375)) + t420 + t46*(C2*(L*t223 + t17*t191) + CI*(t386*(t17 + t73) + t387) + t214 + t385*(RF + t341))) + t421) + RC1*t320*t326 + RQ*t37*(RB2*(RB12*(RC1*(RE2*(RF + t233 + t65) + t64) + t79) + t1*t64 + t405) + rpi1*(RB2*(RB12*(t176 + t71) + t406 + t407) + rpi2*t406) + rpi2*t405 + t403*t51*t71) + t319*(C3*t402 + t209*t213 + t401) + t321*(t17*t208*t213 + t207*t322*t51) + t57*(RE2*t400 + t323*t326 + t325 + t331);
    const denCIm = RB1*t428*t430 + RB12*(L*(RQ*(t125 + t294) + rpi2*t449 + t33 + t451 + t456) + RQ*(RB2*(C3*t455 + rpi1*(t445 + t459) + t451*t458 + t460) + RC1*(C2*(RB2*t462 + RE2*(t218 + t450) + RG1*t454 + RG2*t450 + rpi1*(RE2 + RG2) + rpi2*t462 + t31*t462) + CI*(RI*(B1*(RB2 + RE2) + RB2 + t34 + t51) + rpi1*(RF + t34) + t118 + t31*(RI*t145 + rpi1)) + RB2*(C*rpi1 + C3*t145*t31 + t145*t459 + t461) + RE2*(B2*(B1*t445 + C3*rpi1 + t463) + C3*t462 + t145*t445) + rpi2*(rpi1*t458 + t145*t439 + t145*t440 + t272 + t337 + t392 + t461 + t463) + t297*t434 + t436*t449 + t445*t51) + rpi2*(C*t451 + C3*t452 + rpi1*(t439 + t457) + t272*t449 + t392*t450 + t460) + t46*(RF*t457 + rpi1*t457 + t444)) + t191*t427 + t327*t426*t449 + t430*(RI*t450 + rpi1*(RB1 + t73))) + RQ*t329*t427 + RQ*(RB1*t438 + RB1*(rpi2*(RF*t443 + rpi1*t442) + t436*t46*t51) + RC1*(C2*t51*(RB2*t446 + RE2*t446 + RG1*t434 + rpi2*t446 + t31*t446 + t448) + CI*t428*(RB1 + t429) + RE2*t51*(t437*t446 + t445) + rpi2*(RF*(t443 + t447) + rpi1*(t442 + t447)) + t438 + t444*t51)) + t213*(t431 + t435);
    const denDRe = RQ*(RB12*(t206*t449 + t456) + t431*t51 + t435*t51);
    const numZRe = -C3*t40*t445*t57*(B1*RB2*(RQ*(RE2*t16 + RF*(t16 + t17*t46)) + t464) - t11*t28 + t188*t45*t464 + t19*t465*(RE2*t97 + t141));
    const numYIm = -CI*(RC1*rpi2*(t37*t478*(RE2*(B1*(RQ*t472 + t475 + t477) - t474) + t470*t473) + t481*t75*(C*(L*t141*t479 + RE2*(RF*(C2*(t19*t322 + t76) + t480) + RQ*t480 + t270*t76)) + C3*t478*t97)) + RC1*t100*t37*(RG1*(RE2*(B1*(RF*(RB2*(RG2*t472 + t470) + t471) + t148*t470*t65 + t415*t470) - t10*(RB12*(RB2 + RQ) + t469)) + t29*t409*t470) + t165*t468*t471) + t75*(C3*(L*RG2*t1*(C2*t170*t432*t97 + t425*(RB1*t468 - t118)) + RB1*(-L*t0*t10*t439 + t222*t321*(t315*t46*t97 + t415*(L*RF + RQ*(C*t59 + L))))) + t445*t466*(RE2*(B1*(RB2*t97 + t141*t45) - t221) + t188*t409)));
    const numXRe = -CI*(C3*(L*(C*RG2*(RB1*(RC1*t503 + RE2*(RC1*t488 + RC1*t489 - rpi1*t0)) + RB12*(RC1*(RE2*t490 + t503) + t165*(B1*RC1*RF - RB1*rpi1 - t221 - t35)) - RC1*t0*t33 + t502*(RE2*t484 + t492)) + RC1*(RB12*(C2*(t16*t499*(t467 + t482) + t486*(RG2*t46 + t47 + t86)) + t4*t45*t504 + t433*t504) + t483*t501)) + t188*t414*t501*t502) + RC1*t425*(C3*(C2*(RB2*(RB12*t30*t64 + RE2*RG2*(RB1*t496 + rpi2*t497) + RG1*(RE2*(t473*(RB1*(t494 + t95) + t498) - t474*t95 + t481*t498) + t475*t481*t95)) + t16*t497*t71) + t448*(t281*(RB12*t492 + RE2*t496) + t404*t64*t75)) + t125*t335*t4*t491) + t466*(C*(RE2*(RB1*(RQ*(t453 + t467) + t411*t473) + RB12*(RB1*t484 + t486 + t490)) + RF*t453*t469 + t125*t188*t475) + t426*t483*t75));
    const numAIm = -CI*(RC1*(L*(RB12*t485 + t483)*(t436*t499 + t506) + RB1*t188*t491*t506 + t322*(t481*(t476*t501 + t491*t500) + t497*t501)) + t425*(RC1*t209*(RB1*(RE2*(B1*(RB2*t476 + RF*t495) + t493) + t453*t475) + RE2*t505) + t436*(RB1*(RE2*(-RB12*t118 + RC1*t473*t495 + RC1*t493) + t403*t492) + t1*t505)));
    const numBRe = -RC1*t351*(B1*t477 + t497)*(C2*t18 + t43*t479);
    const numCIm = 0;
    const numDRe = 0;

    return [
      [ numDRe, numCIm, numBRe, numAIm, numXRe, numYIm, numZRe ],
      [ denDRe, denCIm, denBRe, denAIm, denXRe, denYIm, denZRe ]
    ];
  }

  
}