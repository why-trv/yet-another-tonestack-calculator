import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class BossHM2 extends BaseTonestack {
  static definition() {
    return {
      id: 'hm2',
      name: 'Boss HM-2',
      schematic: 'BossHM2',
      description: 'Opamp bias voltage node V<sub>B</sub> is virtually equivalent to ground for the purpose of AC analysis',
      components: {
        RIN: 1e3,
        RL: 10e3,
        R1: 3.3e3,
        R2: 3.3e3,
        R3: 10e3,
        R4: 100e3,
        R5: 330,
        R6: 82e3,
        R7: 330,
        R8: 100e3,
        R9: 330,
        RB: 10e3,
        RT: 10e3,
        C1: 470e-12,
        C2: 10e-6,
        C3: 1.5e-6,
        C4: 68e-9,
        C5: 150e-9,
        C6: 6.8e-9,
        C7: 100e-9,
        C8: 4.7e-9,
      },
      controls: {
        RB: Tapers.Linear,
        RT: Tapers.Linear,
      },
      magnitudePlotRange: [-36, 24]
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, R3, R4, R5, R6, R7, R8, R9, RT2, RT1, RB2, RB1, RL, C1, C2, C3, C4, C5, C6, C7, C8,
    } = this.extractCoefficientVariables(controlValues);

    // Automatic circuit analysis done using QSapecNG.
    // Expanded coefficients refactored using sympy to reduce the number of operations.
    // Original operations: 78471 (*, +, -)
    // Optimized operations: 2051 (38.26x less)
    const t0 = RB1 + RB2;
    const t1 = RT1 + RT2;
    const t2 = t0*t1;
    const t3 = C2*RL;
    const t4 = C3*t1;
    const t5 = C5*RT2;
    const t6 = R2*RT2;
    const t7 = R9*RT1;
    const t8 = R9 + RT1;
    const t9 = RT2*t8;
    const t10 = t7 + t9;
    const t11 = C5*R7;
    const t12 = C4*R5;
    const t13 = C1*R2;
    const t14 = C3*R5;
    const t15 = C6*R7;
    const t16 = C8*R9;
    const t17 = t15 + t16;
    const t18 = t11*t13;
    const t19 = RT1*t18;
    const t20 = R5*RB2;
    const t21 = R5 + RB2;
    const t22 = RB1*t21;
    const t23 = t20 + t22;
    const t24 = t13*t23;
    const t25 = R2*RB2;
    const t26 = t23 + t25;
    const t27 = RT1*t26;
    const t28 = RB1*RB2;
    const t29 = R4*t0;
    const t30 = t28 + t29;
    const t31 = t1*t12;
    const t32 = t1*t15;
    const t33 = C7 + C8;
    const t34 = R9*t33;
    const t35 = RB2*t11;
    const t36 = C5 + C7;
    const t37 = R7*RT2;
    const t38 = R7 + R9;
    const t39 = RT1*RT2;
    const t40 = R7*RT1;
    const t41 = C5*C7;
    const t42 = C7*R9;
    const t43 = RT2*t36;
    const t44 = t42 + t43;
    const t45 = t1*t16;
    const t46 = RT2*(t11 + t42) + t45;
    const t47 = t36*t6;
    const t48 = C7*R8;
    const t49 = t11 + t48;
    const t50 = t1*t13;
    const t51 = t47 + t50;
    const t52 = C5*R6;
    const t53 = t12 + t52;
    const t54 = t15*t45;
    const t55 = R7*t7;
    const t56 = C8*t55;
    const t57 = R6*t1;
    const t58 = t15*t57;
    const t59 = R7 + RT1;
    const t60 = RT2*(RT1*t15 + t16*t59) + t56 + t58;
    const t61 = C5*t60;
    const t62 = C8*R8;
    const t63 = C5 + C6;
    const t64 = R7*t63;
    const t65 = t62 + t64;
    const t66 = t65*t7;
    const t67 = C5*R9;
    const t68 = t16 + t64;
    const t69 = RT1*(t67 + t68);
    const t70 = C7*(RT2*(R9*t65 + t69) + t66);
    const t71 = t42 + t68;
    const t72 = C1*RT1;
    const t73 = C7*t63;
    const t74 = C1*C6;
    const t75 = C1 + C6;
    const t76 = C5*t75 + t74;
    const t77 = C6*t11;
    const t78 = t16*(t39 + t57);
    const t79 = t77*t78;
    const t80 = C6*R6;
    const t81 = t11*t80;
    const t82 = t40*t62;
    const t83 = t63*t82;
    const t84 = C5*R8;
    const t85 = t64 + t84;
    const t86 = RT1*(C8*t85 + t77);
    const t87 = C7*(R9*(RT2*(t62*t64 + t86) + t83) + t10*t81);
    const t88 = C1 + C7;
    const t89 = R7*t75;
    const t90 = R7*t76;
    const t91 = R2*(C1*t54 + C5*(C1*t56 + RT2*(t16*t89 + t17*t72)) + C7*(C1*t66 + RT2*(C1*t69 + R9*(C8*(C1*R8 + t85) + t90))) + t81*(RT2*t88 + t72)) + t79 + t87;
    const t92 = R5*RB1;
    const t93 = R5 + RB1;
    const t94 = RB2*t93;
    const t95 = t92 + t94;
    const t96 = R4*RB1;
    const t97 = R4 + RB1;
    const t98 = RB2*t97;
    const t99 = t96 + t98;
    const t100 = t15*t99;
    const t101 = RT2*t59;
    const t102 = C5*t99;
    const t103 = C1*t99;
    const t104 = RB2*t64;
    const t105 = RB2*t34 + t104;
    const t106 = RT1*t36;
    const t107 = C1*t95;
    const t108 = RB2*t16;
    const t109 = C1*t92 + C1*t94;
    const t110 = t108 + t109;
    const t111 = RB2*t15;
    const t112 = t111*t57;
    const t113 = RB2*(R7 + t93) + t92;
    const t114 = t89*t95;
    const t115 = RB2*t17;
    const t116 = RT1*(t109 + t115);
    const t117 = R5*t0;
    const t118 = C1*RB1;
    const t119 = RB2*RT1;
    const t120 = t119*t38;
    const t121 = C8*(RB2*(R8 + t93) + t92);
    const t122 = t109 + t111;
    const t123 = R8*RT1;
    const t124 = RT2*(R8 + RT1);
    const t125 = t123 + t124;
    const t126 = C6*C7;
    const t127 = t126*t16;
    const t128 = t127*(R6*t125 + R8*t39);
    const t129 = t11*t128;
    const t130 = t11*t74*t78;
    const t131 = C8*RT2;
    const t132 = C1*t9 + R9*(t131 + t72);
    const t133 = R2*(C7*(R9*(C1*t83 + RT2*(C1*t86 + t62*t90)) + t132*t81) + t130) + t129;
    const t134 = t107*t15;
    const t135 = t125*t16;
    const t136 = RB2*t62;
    const t137 = RB1 + RT1;
    const t138 = RT2*t137;
    const t139 = RB2*t7;
    const t140 = R6*t15;
    const t141 = R7 + R8;
    const t142 = C8*t141;
    const t143 = t7*(t118 + t62);
    const t144 = R8*RB1;
    const t145 = R8 + RB1;
    const t146 = C1*t98 + R4*t118;
    const t147 = t108 + t146;
    const t148 = RB2*(R7 + t97) + t96;
    const t149 = t89*t99;
    const t150 = RT1*(t115 + t146);
    const t151 = t136 + t146;
    const t152 = RB2*(R8 + t97) + t96;
    const t153 = C8*t152;
    const t154 = t111 + t146;
    const t155 = R8*t40;
    const t156 = R7*R8;
    const t157 = RT1*t141;
    const t158 = R9*RT2;
    const t159 = t103*t15;
    const t160 = R7*t103;
    const t161 = C8*t7;
    const t162 = t151*t7;
    const t163 = C4*t14;
    const t164 = C5*t6;
    const t165 = R6 + R8;
    const t166 = R6*t39;
    const t167 = R6*RT1;
    const t168 = R6 + RT1;
    const t169 = RT2*t168 + t167;
    const t170 = R8*t169 + t166;
    const t171 = R8*t1;
    const t172 = C7*t163;
    const t173 = C5*C6;
    const t174 = t16*t173;
    const t175 = C3*t28;
    const t176 = C7*t175;
    const t177 = t171 + t39;
    const t178 = C3*C4;
    const t179 = t178*t30;
    const t180 = t179*t41;
    const t181 = C3 + C4;
    const t182 = t0*t181;
    const t183 = R4*RB2;
    const t184 = R4 + RB2;
    const t185 = RB1*t184 + t183;
    const t186 = R6*R8;
    const t187 = RT2*t186;
    const t188 = t127*t163*t18;
    const t189 = R1 + RIN;
    const t190 = C2*(R3 + RL);
    const t191 = t1*t190;
    const t192 = R1 + RT2;
    const t193 = RB2 + RIN;
    const t194 = RB1*t1;
    const t195 = t15*t194;
    const t196 = R4 + RIN;
    const t197 = R5 + RIN;
    const t198 = RB1*t197 + t94;
    const t199 = RIN*t95;
    const t200 = C2*R3;
    const t201 = t16 + t3;
    const t202 = t200 + t201;
    const t203 = C8*t36 + t41;
    const t204 = R1*RT1;
    const t205 = C5*RIN;
    const t206 = C7*RIN;
    const t207 = R7 + RIN;
    const t208 = t17 + t3;
    const t209 = C5*(RT1*t207 + t101);
    const t210 = t200 + t208 + t42;
    const t211 = t206 + t210;
    const t212 = C7*RT1;
    const t213 = t210 + t212;
    const t214 = R8 + RIN;
    const t215 = RT2 + t189;
    const t216 = t13*t215;
    const t217 = t106*t216;
    const t218 = t12*t217;
    const t219 = C6 + C7;
    const t220 = t215*t219;
    const t221 = RT1*t220;
    const t222 = C6*t215;
    const t223 = t212*t222;
    const t224 = t13*t223;
    const t225 = RT2*t80;
    const t226 = R6 + RT2;
    const t227 = C6*(t189 + t226);
    const t228 = t12 + t80;
    const t229 = C7*t215;
    const t230 = C6*t52;
    const t231 = t12*t63 + t230;
    const t232 = C5*(RT1*(t12*t227 + t228*t229) + t12*t225) + t12*t223 + t231*t50;
    const t233 = C5*t215;
    const t234 = RT1*t233;
    const t235 = t212*t215;
    const t236 = t235 + t50;
    const t237 = t50*t63;
    const t238 = t227 + t229;
    const t239 = t190*(R7*(C5*(RT1*(t12 + t238) + RT2*t228) + C6*(t235 + t31) + t237) + t12*(t234 + t236) + t217);
    const t240 = RIN + RT2;
    const t241 = C7*(RT1*t240 + t171 + t204);
    const t242 = t234 + t241;
    const t243 = t1*t33;
    const t244 = C7*t50;
    const t245 = t212*t233;
    const t246 = t244 + t245;
    const t247 = C8*(t242 + t50) + t243*(t12 + t64) + t246;
    const t248 = t13*t245;
    const t249 = t234*t48;
    const t250 = t33*t50;
    const t251 = C5*RT1;
    const t252 = RIN*RT1;
    const t253 = C7*C8;
    const t254 = t192*t251*t33 + t203*t252 + t253*(t177 + t204);
    const t255 = C6*t241;
    const t256 = C5*(RT1*t222 + t241) + t255;
    const t257 = t50*t73;
    const t258 = t173*t235;
    const t259 = t257 + t258;
    const t260 = C8*(t13*t242 + t249) + R7*(C8*(t237 + t256) + t231*t243 + t259) + t12*(t250 + t254) + t248;
    const t261 = R9*(t190*t247 + t260);
    const t262 = RIN*RT2;
    const t263 = RB2 + RT2;
    const t264 = t219*(R1*t263 + RB2*t240 + t262);
    const t265 = RT1*(RT2 + t207) + t204 + t37;
    const t266 = C6*t189;
    const t267 = R1 + t196;
    const t268 = C4*t267;
    const t269 = t229 + t268;
    const t270 = C6*RT1;
    const t271 = t269*t270;
    const t272 = RT2*t268;
    const t273 = C7*t39;
    const t274 = t1*t52;
    const t275 = C6*RT2;
    const t276 = R5*(C5*(RT1*(t227 + t269) + t225 + t272) + t237 + t271) + t12*t267*t275 + t266*(t273 + t274);
    const t277 = R1 + t197;
    const t278 = t191*t33;
    const t279 = t189*t39;
    const t280 = t277*t64;
    const t281 = RT2*t48;
    const t282 = R8 + RT2;
    const t283 = C7*t282;
    const t284 = RT1*(t283 + t5) + t281;
    const t285 = C8*t189;
    const t286 = C4*R4;
    const t287 = t286 + t48;
    const t288 = C7*RT2;
    const t289 = t189*(C4 + C7) + t288;
    const t290 = RT1*(t287 + t289);
    const t291 = t234 + t50;
    const t292 = t1*t268;
    const t293 = C7*t292 + t244;
    const t294 = R5*(C4*t131*(R1 + R4) + C8*(RT2*(C4*RIN + t48) + t290 + t291) + t245 + t293) + t189*t244 + t243*t280 + t279*t41 + t285*(t284 + t50);
    const t295 = t13*t235;
    const t296 = t189*t273;
    const t297 = t189*t50;
    const t298 = t12 + t15;
    const t299 = C5*t265;
    const t300 = RB2*t12;
    const t301 = R4*RIN;
    const t302 = R4 + RT2;
    const t303 = R1*t302;
    const t304 = RT2*t196 + t301 + t303;
    const t305 = C4*t304;
    const t306 = t251*t305;
    const t307 = t212*t305;
    const t308 = t189*t72;
    const t309 = R5*(t13*(RT1*(t215*t36 + t268) + t272) + t306 + t307) + t308*t47;
    const t310 = RT2*t287;
    const t311 = t192 + t214;
    const t312 = C7*t311;
    const t313 = t286 + t312;
    const t314 = RT1*t313 + t310;
    const t315 = t234 + t314;
    const t316 = C7*t286;
    const t317 = C8*(t315 + t50) + t1*(t11*t33 + t15*t33 + t316) + t246;
    const t318 = t15 + t286;
    const t319 = t235*t286;
    const t320 = t1*t286;
    const t321 = t235 + t320;
    const t322 = C6*t321;
    const t323 = t286 + t80;
    const t324 = R7*(C5*(RT1*(t238 + t286) + RT2*t323) + t237 + t322) + t13*(t234 + t321) + t234*t286 + t319;
    const t325 = RB2*t14;
    const t326 = C5*(RT1*(t220 + t80) + t225) + t223;
    const t327 = RB2*t239 + t236*t35*t80 + t300*(R7*(t237 + t326) + t217);
    const t328 = R7*(t12*(t13*t326 + t223*t52) + t224*t52);
    const t329 = C5*t219;
    const t330 = t126 + t329;
    const t331 = RT1*t330;
    const t332 = t216*t331;
    const t333 = t190*(R7*(t232 + t332) + t218);
    const t334 = C8*t249;
    const t335 = C8*(R1 + t282);
    const t336 = t173*t295;
    const t337 = R8*RT2;
    const t338 = t215*t48;
    const t339 = RT1*t173;
    const t340 = t338*t339;
    const t341 = C8*(t13*t256 + t340) + t230*(t250 + t253*(RT1*t311 + t337)) + t336;
    const t342 = R7*(t12*(C5*(RT1*(C6*C8*(R6 + t192) + C7*(t335 + t80)) + t131*t80 + t288*(t62 + t80)) + C8*(RT1*t205*t219 + t237 + t255) + t259) + t341) + t12*(t13*t254 + t334) + t13*t334;
    const t343 = t190*t260 + t342;
    const t344 = R9*t343;
    const t345 = t12*t13;
    const t346 = t106*t304*t345;
    const t347 = t6*t74;
    const t348 = t189*t212*t347;
    const t349 = t50*t52;
    const t350 = t268*t275;
    const t351 = C4*C6;
    const t352 = C4*(R4*t240 + t262 + t303);
    const t353 = t266*t52;
    const t354 = R5*(C5*(RT1*(C7*(t215*t80 + t352) + t351*(R1*(R6 + t302) + t196*t226 + t301)) + t272*t80) + C6*(t307 + t349) + t13*(C5*(RT1*(t220 + t268) + t272) + t271 + t350)) + t353*(t273 + t50);
    const t355 = t308*t6;
    const t356 = t39*t48;
    const t357 = C7*t13;
    const t358 = C4*(R4*RT2 + t303);
    const t359 = RT2*t33;
    const t360 = t281 + t290;
    const t361 = t272 + t360;
    const t362 = t272*t48;
    const t363 = R1*(R8 + t302) + t196*t282 + t301;
    const t364 = C4*t363;
    const t365 = t212*t364;
    const t366 = t362 + t365;
    const t367 = t274*t33;
    const t368 = t126*t177;
    const t369 = C5*(t1*t48 + t219*t39) + t368;
    const t370 = RT1*(t189*(C4 + C6) + t275 + t286) + t272;
    const t371 = C6*R1 + C6*RIN + t275;
    const t372 = C5*(RT1*(t268 + t312 + t371) + t272 + t281) + C6*t360 + t350;
    const t373 = R5*(C8*(t13*(t234 + t361) + t366) + t251*(C7*(t192*t62 + t358) + C8*t358 + RIN*(C4*t359 + C8*t287 + t316)) + t357*(RT1*(t233 + t268) + t272)) + R7*(R5*(C6*t367 + C8*(t237 + t372) + t126*t292 + t257 + t370*t41) + t173*t296 + t266*t367 + t285*(t237 + t369) + t297*t73) + t285*(C5*t356 + t13*t284) + t355*t41;
    const t374 = t15*t295;
    const t375 = t217*t286;
    const t376 = t13*t321 + t319;
    const t377 = t221*t286;
    const t378 = RT2*t286;
    const t379 = RT1*(t220 + t286) + t378;
    const t380 = t241*t286;
    const t381 = t234*t287 + t380;
    const t382 = RT1*(t222 + t286) + t378;
    const t383 = C5*(RT1*(t313 + t371) + t310) + C6*t314;
    const t384 = C8*(t13*t315 + t381) + R7*(C6*t1*(t316 + t33*t52) + C8*(t237 + t383) + t257 + t382*t41) + t245*t286 + t357*(t234 + t320);
    const t385 = t167*t229*t77;
    const t386 = t13*t385;
    const t387 = R7*t300*(t230*t236 + t332) + RB2*t333 + RB2*t386;
    const t388 = t300*t386;
    const t389 = t190*t328;
    const t390 = RB2*t389;
    const t391 = C8*t13;
    const t392 = R7*(t12*t341 + t230*t241*t391 + t340*t391) + t334*t345;
    const t393 = t190*t342 + t392;
    const t394 = R9*t393;
    const t395 = C8*t286;
    const t396 = R8*t222;
    const t397 = C5*(RT1*(C7*(t286*t311 + t396) + t222*t286) + t281*t286) + t255*t286;
    const t398 = C8*(t13*t381 + t249*t286) + R7*(C8*(t13*t383 + t397) + t230*(C8*t50 + RT1*(C7*(t286 + t335) + t395) + t244 + t253*(t252 + t337) + t286*t359) + t258*t286 + t357*(C5*t382 + C6*t320)) + t248*t286;
    const t399 = t345*t385;
    const t400 = R7*(R5*(t13*t305*t331 + t230*(t13*(t235 + t292) + t307)) + t348*t52);
    const t401 = t285*t48;
    const t402 = C4*(RT1*t363 + t267*t337);
    const t403 = t173*t307;
    const t404 = C5*(RT1*(C7*(t364 + t396) + t304*t351) + t362);
    const t405 = R5*(C5*t13*t307 + C8*(t13*(C7*t402 + t251*(t338 + t352)) + t306*t48)) + R7*(C5*t348 + R5*(C8*(C6*t365 + t13*t372 + t350*t48 + t404) + t230*(C8*(t361 + t50) + t293) + t357*(C5*t370 + t268*t270 + t350) + t403) + t285*(t13*t369 + t173*t356) + t353*(t177*t253 + t250)) + t164*t401*t72;
    const t406 = t126*t18;
    const t407 = t12*t406;
    const t408 = R9*(C8*t407*(RT1*(R1*t165 + R6*(RT2 + t214) + R8*t240) + t187) + t190*t392);
    const t409 = t12*t48;
    const t410 = R6*t183;
    const t411 = t183*t204;
    const t412 = R9*t168 + t167;
    const t413 = R1*RB1 + t99;
    const t414 = RT2*t413;
    const t415 = R6*t184;
    const t416 = R6 + t184;
    const t417 = RB1*RT1;
    const t418 = RB1*RT2;
    const t419 = R6*t99;
    const t420 = t163*t406;
    const t421 = R8*t168 + t167;
    const t422 = RT2*t421;
    const t423 = R8*t98;
    const t424 = RIN*(RT1*(R6*t185 + t144*(R4 + R6) + t423) + t418*t421) + t123*t410 + t165*t411 + t413*t422 + t417*(R1*(R8*t416 + t415) + t184*t186);
    const t425 = R8*t59 + t40;
    const t426 = t163*t41;
    const t427 = t178*t99;
    const t428 = R6*RT2;
    const t429 = C7*t0;
    const t430 = C3*t418*t48*t52 + RT1*(C5*(C3*(C7*(RB1*(R5*t165 + R6*RB2 + R8*(R6 + t263) + t428) + t165*t20) + t12*t418) + t12*t165*t429 + t163*(R6*RB1 + t99)) + t172*(t144 + t418 + t99)) + t163*t418*(t48 + t52);
    const t431 = R1*RB2;
    const t432 = R1 + RB2;

    const b0 = 0;
    const b1 = t2*t3;
    const b2 = t3*(RB2*t4*(R2 + RB1) + t0*(C7*(t10 + t6) + t1*(t11 + t12 + t13 + t14 + t17) + t5*(R2 + RT1)));
    const b3 = t3*(C3*(RT1*t24 + RT2*(R5*t25*t36 + t11*t22 + t24 + t35*(R2 + R5) + t36*(R2*t22 + t27)) + t1*t26*t34 + t11*t27 + t26*t32 + t31*(t25 + t30)) + t0*t19 + t0*(t12*(RT1*(t11 + t44) + t46 + t51) + t13*(RT1*t44 + t46) + t15*(RT1*(t44 + t53) + RT2*(t42 + t53) + t45 + t51) + t16*(RT1*(t43 + t49) + RT2*t49 + t47) + t41*(R9*(t40 + t6) + t37*(R2 + R9) + t38*t39)));
    const b4 = t3*(C3*(R2*(C5*(RT2*(t113*t16 + t114 + t116) + t110*t40 + t112) + C7*(RT2*(C5*(R9*t113 + t120) + R9*(t121 + t122) + t116 + t64*t95) + t7*(C1*t117 + RB2*(t118 + t65))) + t107*t45 + t110*t32) + t12*(C7*t10*t99 + R2*(RT1*(t103 + t105) + RT2*(RB2*t106 + t102 + t105 + t88*t96 + t88*t98)) + t1*t100 + t102*(t101 + t40) + t45*t99) + t54*t95 + t61*t95 + t70*t95) + t0*(t12*(R2*(RT2*(R7*(t73 + t76) + R9*(C7*(C1 + C5) + C8*(C1 + t36)) + t36*t72) + t71*t72) + t54 + t61 + t70) + t91));
    const b5 = t3*(C3*(R2*(C5*(RT2*(RT1*(t122*t16 + t134) + t114*t16) + t107*t56 + t110*t58) + C7*(C5*(R9*t111*t138 + RB2*(R7*t143 + RT2*(R9*(C8*(R7*t145 + t144) + R7*t118) + RT1*(t118*t38 + t141*t16))) + t117*(C1*t55 + RT2*(R9*(t142 + t89) + t38*t72)) + t140*(RT2*(RB2*(t8 + t93) + t92) + t139)) + t107*t135 + t15*(RT2*(R9*(t107 + t121) + RT1*t110) + t7*(t109 + t136))) + t134*t45) + t12*(R2*(C5*(RT2*(t148*t16 + t149 + t150) + t112 + t147*t40) + C7*(RT2*(C5*(R9*t148 + t120) + R9*(t153 + t154) + t100 + t11*t99 + t150) + t7*(t104 + t151)) + t103*t45 + t147*t32) + t100*t45 + t102*t60 + t70*t99) + t79*t95 + t87*t95) + t0*(t12*t91 + t133));
    const b6 = t3*(C3*(R2*(C7*(C5*(C1*t16*t28*(RT2*(t156 + t157) + t155) + t111*(R6*(RT2*(R9*(C8*t145 + t118) + RT1*(t118 + t16)) + t143) + t158*(RT1*t118 + t137*t62)) + t117*(R9*(C1*t82 + RT2*(t62*t89 + t72*(t142 + t15))) + t132*t140)) + t134*t135) + t130*t95) + t12*(R2*(C5*(RT2*(RT1*(t154*t16 + t159) + t149*t16) + t147*t58 + t160*t161) + C7*(C5*(R7*t162 + RT2*(R9*(C8*(R7*t152 + R8*t99) + t160) + RT1*(R9*(RB2*t142 + t103) + t160)) + t140*(RT2*(RB2*(t8 + t97) + t96) + t139) + t15*t158*(RB2*(RT1 + t97) + t96)) + t103*t135 + t15*(RT2*(R9*(t103 + t153) + RT1*t147) + t162)) + t159*t45) + t79*t99 + t87*t99) + t129*t95) + t0*(t12*t133 + t128*t18));
    const b7 = t3*(C1*t161*t163*t164*t30*t48 + R7*(t13*(R5*(C6*(t16*(C5*t169*t179 + C7*(t177*(t178*t28 + t178*t29 + t182*t52) + t182*t39*t84)) + t180*(R9*t169 + t166)) + t16*t177*t180) + t170*t174*t176) + t172*t174*(R8*RB2*t137*t6 + RB2*(R2*R6*(t138 + t171) + RB1*t170) + t29*(t165*t6 + t170))));
    const b8 = t185*t188*t3*(RT1*(RT2*t165 + t186) + t187);

    const a0 = t2;
    const a1 = t0*(RT1*(C5*(R7 + t192) + C7*(R9 + t192) + RIN*t36 + t17) + RT2*(t11 + t15 + t34) + t191 + t31 + t50) + t4*(RB1*(t189 + t21) + t20);
    const a2 = C3*(C5*(RT1*(R7*t198 + t199) + t101*t198) + C7*(RT1*(R9*t198 + t199) + t198*t9) + R1*(C5*(RB1*t101 + RT1*(R7*RB1 + t95)) + C7*(RB1*t9 + RT1*(RB1*(R5 + R9) + t94)) + RB1*t31 + t194*(t13 + t202) + t195) + t1*(t117*t15 + t13*t198 + t198*t202) + t193*t195 + t31*(RB1*t196 + t98)) + t0*(C2*(R3*(RT1*(t205 + t206 + t71) + RT2*(t106 + t71)) + RL*t45) + C5*(RT1*(RIN*t15 + t16*t207 + t207*t3) + RT2*(R7*t201 + RT1*t208) + t58) + C7*(RT1*(R9*(C8*t214 + t205 + t3 + t64) + RIN*t3 + RIN*t64) + RT2*(R9*(t3 + t65) + RT1*(t201 + t64 + t67))) + t12*(RT1*(t13 + t211) + RT2*(t13 + t213) + t209) + t13*(RT1*t211 + RT2*t213 + t209) + t201*t32 + t204*(R7*(t173 + t73) + R9*t203 + t12*t36 + t13*t36 + t190*t36));
    const a3 = RB1*(C3*(C5*(t13*(RB2*t265 + t189*t37 + t189*t40) + t264*t40) + R7*(t266*t50 + t276) + R9*(t277*t278 + t294) + RB2*(R9*(t247 + t278) + t15*(t236 + t274) + t295) + t190*(C5*t279 + R5*(RT1*(t286 + t289) + t272 + t291) + RB2*t50 + RB2*(RT1*(t229 + t298) + RT2*t298 + t299) + t1*t280 + t296 + t297) + t300*(t236 + t299 + t32) + t309) + R7*(t224 + t232) + t18*t221 + t218 + t239 + t261) + RB2*t261 + t111*t295 + t119*t18*t220 + t325*(R9*(t278 + t317) + t190*(RT1*(t229 + t318) + RT2*t318 + t299 + t50) + t324) + t327;
    const a4 = RB1*(C3*(R7*(t348 + t354) + R9*(t190*t294 + t373) + RB2*(t261 + t374) + t19*t264 + t190*(R7*(t189*t237 + t276 + t279*t329) + t309) + t327 + t346) + t328 + t333 + t344) + RB2*t344 + t325*(R9*(t190*t317 + t384) + t11*(t13*t379 + t377) + t15*t376 + t190*t324 + t375 + t81*(t321 + t50)) + t387;
    const a5 = RB1*(C3*(R9*(RB2*t343 + t190*t373 + t405) + t190*(R7*(t330*t355 + t354) + t346) + t387 + t400) + t389 + t394 + t399) + RB2*t394 + t325*(R9*(t190*t384 + t398) + t18*t377 + t190*(R7*(C5*(RT1*(t227*t286 + t229*t323) + t225*t286) + C6*(t319 + t349) + t13*(C5*t379 + t322)) + t375) + t286*t374 + t376*t81) + t388 + t390;
    const a6 = RB1*(C3*(R9*(R7*(R5*(C8*(t13*(t126*t402 + t404) + t305*t339*t48) + t13*t403 + t230*(C8*(t13*t361 + t366) + t244*t268)) + t13*t285*t368*t52 + t251*t347*t401) + RB2*t393 + t190*t405 + t251*t304*t391*t409) + t167*t407*(R1*(RT2 + t184) + RB2*RIN + RT2*(RIN + t184) + t301) + t190*t400 + t390) + t190*t399 + t408) + RB2*t408 + t190*t388 + t325*(R7*t190*(t230*t376 + t286*t332) + R9*(R7*(C8*(t13*t397 + t286*t340) + t230*(C8*(t13*t314 + t380) + t316*t50) + t286*t336) + t13*t249*t395 + t190*t398) + t286*t386);
    const a7 = t16*(t190*(t13*t426*(R1*t157*t183 + RIN*(RT1*(R7*t185 + t144*(R4 + R7) + t423) + t418*t425) + t155*t183 + t414*t425 + t417*(R1*(R7*t184 + R8*(R7 + t184)) + t156*t184)) + t15*(t13*(R1*t430 + R5*RT2*(t427*t48 + t52*(t182*t48 + t427)) + RIN*t430 + RT1*(C5*(R5*(RT2*t427 + t429*(R6*(C3*R8 + RT2*t181) + t181*t337)) + R6*t0*t409 + t163*t419 + t176*(R8*t226 + t428)) + t163*t283*t99) + t175*t281*t52) + t424*t426)) + t420*t424) + t190*t420*(RIN*(RT1*(R9*(RB1*t416 + t183) + t419) + t412*t418) + t410*t7 + t411*(R6 + R9) + t412*t414 + t417*(R1*(R9*t416 + t415) + R9*t415));
    const a8 = t188*t190*(RB1*(R6*(RT1*(R8*t432 + RIN*(R8 + RB2) + t431) + t124*(R1 + t193)) + t123*(RIN*t263 + RT2*t432 + t431)) + t29*(RT1*(R1*R6 + R8*(R1 + R6) + RIN*t165) + t422));

    return [
      [b0, b1, b2, b3, b4, b5, b6, b7, b8],
      [a0, a1, a2, a3, a4, a5, a6, a7, a8]
    ];
  }
}