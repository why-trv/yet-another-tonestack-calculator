import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class BlackstarHT5 extends BaseTonestack {
  static definition() {
    return {
      id: 'bht5',
      name: 'Blackstar HT5',
      components: {
        RIN: 47e3,
        RT: 47e3,
        RB: 100e3,
        RM: 2.2e3,
        RISF: 10e3,
        R1: 4.7e3,
        R2: 6.8e3,
        R3: 22e3,
        R4: 1e3,
        RL: 470e3,
        C1: 220e-9,
        C2: 470e-9,
        C3: 4.7e-9,
        C4: 220e-9,
        C5: 100e-9,
        CIN: 22e-6
      },
      controls: {
        RB: Tapers.LogA,
        RM: Tapers.Linear,
        RT: Tapers.Linear,
        RISF: Tapers.LogA
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R1, R2, R3, R4, RL, C1, C2, C3, C4, C5, CIN,
      RT: [RT2, RT1],
      RISF: [RI11, RI12],
      RM: [RM],
      RB: [RB]
    } = this.processComponentValues(controlValues);

    const RI21 = RI12;

    // Transfer function denominator coefficients    
    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 71381 (*, +, -)
    // Optimized operations: 2242 (31.84x less)

    const t0 = R4 + RB;
    const t1 = RL + RT2;
    const t2 = t0*(RL*RT2 + RT1*t1);
    const t3 = R3 + RI21;
    const t4 = RM*t3;
    const t5 = RB*RL;
    const t6 = R4 + RT2;
    const t7 = RB + RL;
    const t8 = t6 + t7;
    const t9 = RL*t6 + RT1*t8 + t5;
    const t10 = CIN*RIN;
    const t11 = R1 + RI12;
    const t12 = C1*t11;
    const t13 = C2*RI11;
    const t14 = C3*C4;
    const t15 = t13*t14;
    const t16 = C5*t15;
    const t17 = t12*t16;
    const t18 = RM*RT1;
    const t19 = RL*t0;
    const t20 = R3*t19;
    const t21 = RM*t0;
    const t22 = R2*t21;
    const t23 = R2 + t0;
    const t24 = RM*t23;
    const t25 = R2*R4;
    const t26 = R2*RB;
    const t27 = t25 + t26;
    const t28 = t24 + t27;
    const t29 = R3*t28;
    const t30 = t22 + t29;
    const t31 = RL + RT1;
    const t32 = RT2*t31;
    const t33 = t18*t19;
    const t34 = RL + t0;
    const t35 = R4*RL + t5;
    const t36 = RM*(RT1*t34 + t35) + RT1*t19;
    const t37 = RM + t11;
    const t38 = RI12 + RM;
    const t39 = t0*t38;
    const t40 = R2*t39;
    const t41 = R3*t23 + t27;
    const t42 = R2 + RB;
    const t43 = R2 + RI12;
    const t44 = R4*t43;
    const t45 = t26 + t44;
    const t46 = RI12*t42 + t45;
    const t47 = t24 + t46;
    const t48 = R3*t47;
    const t49 = RI21*t47;
    const t50 = R1*(RI21*t23 + t41) + t40 + t48 + t49;
    const t51 = t0 + t38;
    const t52 = R3*t51;
    const t53 = R2*RL;
    const t54 = t19*t38;
    const t55 = RM*t34;
    const t56 = RI12 + RL;
    const t57 = RI12*t7 + t5;
    const t58 = R4*t56 + t57;
    const t59 = t55 + t58;
    const t60 = R2*t59 + t54;
    const t61 = R3*t34;
    const t62 = t19 + t61;
    const t63 = R2*t62;
    const t64 = RL*t23 + t27;
    const t65 = RT1*(R1*(RI21*t64 + t20 + t63) + R3*t40 + RI21*t60 + t20*t38 + t53*(t39 + t52)) + t32*t50;
    const t66 = CIN*t13;
    const t67 = C4*R2;
    const t68 = C3*t3;
    const t69 = t11*t66;
    const t70 = CIN*RL;
    const t71 = t0*t70;
    const t72 = R2 + RM;
    const t73 = t13*t72;
    const t74 = t11*t73;
    const t75 = RI12*t19 + RM*t58;
    const t76 = C2*t75;
    const t77 = R2*RI12;
    const t78 = RI11*t43 + t77;
    const t79 = t21*t70;
    const t80 = R2 + RI11;
    const t81 = t21*t80;
    const t82 = t35 + t55;
    const t83 = R2*t82;
    const t84 = C5*t3;
    const t85 = RI21*t28;
    const t86 = t30 + t85;
    const t87 = t69*t86;
    const t88 = R4*RI21;
    const t89 = RI21*t7 + t61;
    const t90 = t35 + t88 + t89;
    const t91 = CIN*t90;
    const t92 = C3*t74;
    const t93 = RM*t19;
    const t94 = t83 + t93;
    const t95 = t13*t94;
    const t96 = CIN*t11;
    const t97 = C2*R1;
    const t98 = C2 + CIN;
    const t99 = t75 + t83;
    const t100 = RI21*t99;
    const t101 = R3*t82;
    const t102 = t101 + t93;
    const t103 = R2*t102;
    const t104 = R3*t75;
    const t105 = RI12*t93 + t104;
    const t106 = RI21*t82;
    const t107 = CIN*(t102 + t106);
    const t108 = C2*t101 + C2*t106;
    const t109 = R2*t11;
    const t110 = R1*t3;
    const t111 = RI12*t3*t79 + t110*t79;
    const t112 = t0 + t3;
    const t113 = t112*t70;
    const t114 = CIN*t112;
    const t115 = t114*t92;
    const t116 = RI11*t28;
    const t117 = C2*t116;
    const t118 = t117*t96;
    const t119 = RM*(RI12 + t0);
    const t120 = R4*RI12;
    const t121 = RB*RI12;
    const t122 = t120 + t121;
    const t123 = t119 + t122;
    const t124 = R2*t123;
    const t125 = RM*(t0 + t43);
    const t126 = t121 + t125 + t45;
    const t127 = R3*t126;
    const t128 = t13*(t124 + t127);
    const t129 = RI21*t0;
    const t130 = RI12*RM;
    const t131 = CIN*t130;
    const t132 = CIN*t21;
    const t133 = t110*t132;
    const t134 = RM + t0;
    const t135 = RI21*t134;
    const t136 = R3*t134;
    const t137 = RM*(RI21 + t0);
    const t138 = t136 + t137;
    const t139 = t129 + t138;
    const t140 = CIN*R2;
    const t141 = R2*RI11;
    const t142 = RI11*t29;
    const t143 = t0 + t80;
    const t144 = RM*t143;
    const t145 = RB*RI11;
    const t146 = R4*t80 + t26;
    const t147 = t145 + t146;
    const t148 = t144 + t147;
    const t149 = R3*t148;
    const t150 = t149 + t81;
    const t151 = RI12*t150 + t141*t21 + t142;
    const t152 = RI21*t126;
    const t153 = R2 + R3;
    const t154 = C2*t153;
    const t155 = R1*(C2*t135 + CIN*t139 + t134*t154) + t152*t98;
    const t156 = t29 + t94;
    const t157 = t156 + t85;
    const t158 = t21*t43;
    const t159 = t127 + t158;
    const t160 = t136 + t82;
    const t161 = t135 + t160;
    const t162 = R1*t161;
    const t163 = RB*RI21 + t138 + t88;
    const t164 = t163*t70;
    const t165 = C3*t19;
    const t166 = t13*t67;
    const t167 = t166*t68;
    const t168 = t3*t72;
    const t169 = RI12*t94;
    const t170 = t13*t169;
    const t171 = RM*t80;
    const t172 = C4*t84;
    const t173 = C3*t90;
    const t174 = C3*t13;
    const t175 = t11*t174;
    const t176 = t175*t86;
    const t177 = R3*RI11;
    const t178 = RL*t30;
    const t179 = RI11*RM;
    const t180 = t179*t19;
    const t181 = RI11 + RI12;
    const t182 = RI11*t19;
    const t183 = RI11*t7;
    const t184 = RI11 + RL;
    const t185 = R4*t184 + t5;
    const t186 = t183 + t185;
    const t187 = RM*t186;
    const t188 = t182 + t187;
    const t189 = RI12*t188 + t180 + t181*t83;
    const t190 = t188 + t83;
    const t191 = C3*RL;
    const t192 = RI12*RI21;
    const t193 = t73*(R1*R3 + R1*RB + R1*(R4 + RI21) + t192);
    const t194 = R3*t72;
    const t195 = C3 + C4;
    const t196 = RB*t195;
    const t197 = R4*t195;
    const t198 = t197 + t67;
    const t199 = RM*t198;
    const t200 = RI12*t13;
    const t201 = RI21*t148;
    const t202 = t150 + t201;
    const t203 = RI12*t148 + t116;
    const t204 = RI21*t203;
    const t205 = t151 + t204;
    const t206 = R1*t202 + t205;
    const t207 = C3*t206;
    const t208 = t11 + t72;
    const t209 = C3*t208;
    const t210 = t13*t209;
    const t211 = t210*t84;
    const t212 = CIN*t0;
    const t213 = C2*t141;
    const t214 = C3*t213;
    const t215 = t34*t38;
    const t216 = t141*t34;
    const t217 = t171 + t78;
    const t218 = R1*t64;
    const t219 = t66*(t218 + t60);
    const t220 = C4*t3;
    const t221 = C5*t208;
    const t222 = C3*t50*t66;
    const t223 = RI12 + t72;
    const t224 = RI21*t223;
    const t225 = t224*t98;
    const t226 = CIN*t223;
    const t227 = t226*t62;
    const t228 = C2*RI21;
    const t229 = t228*t34 + t91;
    const t230 = R2*RM;
    const t231 = R3*t223;
    const t232 = t230 + t231 + t77;
    const t233 = RI11*t34;
    const t234 = C2*t233;
    const t235 = t110*t71 + t3*t39*t70;
    const t236 = t114*t210;
    const t237 = t13*t232;
    const t238 = t66*(R1*t23 + t47);
    const t239 = t13*t223;
    const t240 = t141 + t27;
    const t241 = t143*t38 + t240;
    const t242 = CIN*t241;
    const t243 = RI11*t228;
    const t244 = R3*t143;
    const t245 = t147 + t244;
    const t246 = RI21*t143 + t245;
    const t247 = t177*t72;
    const t248 = t0*(t141 + t171);
    const t249 = RL + t3;
    const t250 = R1*(t23*t249 + t27) + t49;
    const t251 = t48 + t60;
    const t252 = R3 + t0;
    const t253 = t223*t70;
    const t254 = t252*t253;
    const t255 = R4 + RM;
    const t256 = R2 + RL;
    const t257 = R3*RL;
    const t258 = t257*t38;
    const t259 = R1*t112;
    const t260 = RI21*t51 + t52;
    const t261 = t122 + t21 + t259 + t260;
    const t262 = t168*t175;
    const t263 = t234*t72;
    const t264 = t263*t96;
    const t265 = RM*t181 + t78;
    const t266 = RI11 + t72;
    const t267 = t53 + t82;
    const t268 = t267 + t27;
    const t269 = CIN*t80;
    const t270 = R1*t80;
    const t271 = RI12*t80;
    const t272 = RI11*t82;
    const t273 = CIN*t189 + R1*(C2*t272 + CIN*t190) + t13*t99;
    const t274 = R1*RM;
    const t275 = R1*(t3 + t80);
    const t276 = RL*t136 + t272;
    const t277 = RI12*t132;
    const t278 = t11*t140;
    const t279 = C3*(RI11*(CIN*t159 + t155) + t128 + t133 + t163*t278 + t277*t3) + t118;
    const t280 = t3 + t34;
    const t281 = t73*t96;
    const t282 = RI12*RL;
    const t283 = RM*t56;
    const t284 = C3*RI12;
    const t285 = C3*t77;
    const t286 = C3*t231 + t195*t44 + t196*t223;
    const t287 = CIN*t265;
    const t288 = t239 + t287;
    const t289 = t252 + t72;
    const t290 = RI12*(R3 + t80);
    const t291 = t116 + t134*t275 + t134*t290 + t152 + t30;
    const t292 = CIN*t203 + R1*(CIN*t148 + t13*t134);
    const t293 = t152 + t162;
    const t294 = R2*t160 + R3*t123 + t75;
    const t295 = t0 + t184;
    const t296 = t145 + t185;
    const t297 = RM*t295 + t296;
    const t298 = RM*t25;
    const t299 = RI11 + t56;
    const t300 = RI12*t29 + t142;
    const t301 = C1*RIN;
    const t302 = C3*t80;
    const t303 = t13*t60;
    const t304 = t174*t50;
    const t305 = RI11 + RM;
    const t306 = R3*t186 + t182 + t63;
    const t307 = R4*t299;
    const t308 = R2*(t183 + t307 + t55 + t57) + t186*t38;
    const t309 = RL*t143 + t147;
    const t310 = R3*(t144 + t240);
    const t311 = RI11*t0*t72 + RI12*t245 + RI21*t241 + t22 + t310;
    const t312 = C3*(R1*t266 + t265);
    const t313 = t112*t312;
    const t314 = RI12*t72;
    const t315 = t13*t314;
    const t316 = RI12*t117;
    const t317 = t234*t314;
    const t318 = R1*(C5*t190 + t117) + t316;
    const t319 = C3*t34;
    const t320 = t223*t234;
    const t321 = CIN*t308 + R1*(CIN*t309 + t234) + t320;
    const t322 = RI21*t43 + t194;
    const t323 = RM*(RI21 + t80) + t141 + t290 + t322;
    const t324 = R1*t212;
    const t325 = CIN*t39;
    const t326 = t114 + t228;
    const t327 = t225 + t226*t252;
    const t328 = C3*(RI11*(R1*(t154 + t326) + t327) + t140*t261 + t237 + t3*t324 + t3*t325) + t238;
    const t329 = t208*t66;
    const t330 = R3 + t34;
    const t331 = C3*RI21;
    const t332 = t146 + t183;
    const t333 = R4*RI11;
    const t334 = R2*t330;
    const t335 = R1*t280;
    const t336 = RI11*(t226*t330 + t98*(t224 + t335)) + t239*t330;
    const t337 = CIN*t266;
    const t338 = t119 + t46;
    const t339 = R1*(t13 + t337);
    const t340 = t186 + t55;
    const t341 = t126*t13 + t292;
    const t342 = C5*(R1*t82 + t99) + t341;
    const t343 = R3*t0;
    const t344 = RI11*t55;
    const t345 = t186 + t61;
    const t346 = R2*t34;
    const t347 = t340 + t346;
    const t348 = CIN*RM;
    const t349 = C3*(C4*t291 + RI11*(R1*(C2*t289 + t326) + t327) + t109*t114 + t114*t130 + t13*(t231 + t338) + t259*t348) + t281;
    const t350 = C4*RB;
    const t351 = R4 + RIN;
    const t352 = RI11*RT2;
    const t353 = t351*t352;
    const t354 = RIN + RT2;
    const t355 = RT2*t351;
    const t356 = C4*t37;
    const t357 = C3*t356;
    const t358 = RI11*RT1;
    const t359 = RI11*t37;
    const t360 = t11 + t305;
    const t361 = RT1 + RT2;
    const t362 = RB*t361;
    const t363 = RI11 + t351;
    const t364 = R1*RT1;
    const t365 = R1*RT2;
    const t366 = RB*(R2*(t360 + t361) + t359 + t361*t38 + t364 + t365) + RT1*t363*t37;
    const t367 = RI12*RT1 + t358 + t364;
    const t368 = RM*t351;
    const t369 = RI11 + RIN;
    const t370 = t11 + t369;
    const t371 = RIN + t255;
    const t372 = RIN + t6;
    const t373 = RI11*t372;
    const t374 = R1*t372 + RI12*t372 + t373;
    const t375 = RT1*(t255 + t370) + RT2*t371 + t368 + t374;
    const t376 = RI21 + t361;
    const t377 = R1*RI11;
    const t378 = RI11 + t11;
    const t379 = RI12*t305 + t179;
    const t380 = t10*(R2*t378 + t274 + t377 + t379);
    const t381 = R4*RT1;
    const t382 = RT1*RT2;
    const t383 = RL*t361;
    const t384 = R4*RT2 + RI21*t8 + t362 + t381 + t382 + t383;
    const t385 = RIN + RM;
    const t386 = R1*t385;
    const t387 = RIN*t38 + t379;
    const t388 = R2*t370 + t377 + t386 + t387;
    const t389 = C5*t388;
    const t390 = RI21 + RT2;
    const t391 = R4 + RI11;
    const t392 = RB*t208;
    const t393 = t195*t376*t392;
    const t394 = C4*RT1;
    const t395 = C3*t361;
    const t396 = RT1 + t6;
    const t397 = R4*t395 + t331*t396;
    const t398 = t255 + t378;
    const t399 = C4*t390;
    const t400 = t351*t356;
    const t401 = t10*t208;
    const t402 = R2*RIN;
    const t403 = RIN*RM;
    const t404 = RIN + t72;
    const t405 = C1*(R1*t404 + RI12*t404 + t402 + t403);
    const t406 = RT1*t351;
    const t407 = RIN + RT1;
    const t408 = t407 + t6;
    const t409 = t331*t408 + t351*t395;
    const t410 = t11 + t371;
    const t411 = RI11*t351;
    const t412 = R4*RIN;
    const t413 = R1*t351 + t412;
    const t414 = t368 + t412;
    const t415 = RT2*t385 + t414;
    const t416 = R4*RM;
    const t417 = R1*t414 + RI12*t414 + RM*t412;
    const t418 = C4*(RI11*(R1*t255 + RI12*t255 + t416) + t417);
    const t419 = RM*RT2;
    const t420 = RIN + t305;
    const t421 = RT1*(R1*t420 + t387);
    const t422 = C4*t255;
    const t423 = t370*t422;
    const t424 = RIN + t181;
    const t425 = RIN*t361;
    const t426 = t367 + t374 + t412 + t425;
    const t427 = RB*(R1*(t369 + t72) + R2*t424 + t387);
    const t428 = R4 + RL;
    const t429 = t352*t428;
    const t430 = t1*t363 + t333 + t412;
    const t431 = RT2*t407;
    const t432 = t381 + t412 + t431;
    const t433 = RL*t408 + t432;
    const t434 = C3*(RIN*t381 + RT2*(t406 + t412) + t351*t383);
    const t435 = RIN + t31;
    const t436 = t331*t435;
    const t437 = t1 + t11 + t420;
    const t438 = RL + t6;
    const t439 = t412 + t416;
    const t440 = R1*t438 + RI11*t438 + RI12*t438 + t1*t371 + t439;
    const t441 = RB + t6;
    const t442 = RIN + t1;
    const t443 = t3 + t361;
    const t444 = t208*t443;
    const t445 = R1*RIN + t141 + t270 + t402;
    const t446 = C4*t443;
    const t447 = RB*t443;
    const t448 = C5*RT2 + t10;
    const t449 = RT1 + t3;
    const t450 = t298*t449;
    const t451 = RT2*(t168 + t230);
    const t452 = R4*t72 + t230;
    const t453 = RT2*(R3*t452 + RI21*t452 + t298);
    const t454 = C1*t14;
    const t455 = RM + RT1;
    const t456 = R3*t455 + RI21*t455 + t18;
    const t457 = RI11 + RT1;
    const t458 = R3*t457;
    const t459 = RM*t391 + t333;
    const t460 = RIN*t70;
    const t461 = C5*t460;
    const t462 = t0*t361;
    const t463 = C1*R1;
    const t464 = C3*R2;
    const t465 = C4*t462;
    const t466 = C1 + C2;
    const t467 = C3*t441;
    const t468 = C4*(C2*R4 + C2*RB + t467) + t466*t467;
    const t469 = RI11*t208;
    const t470 = R1*t441;
    const t471 = R2*t441 + t462;
    const t472 = C1*t464*t470 + C1*t467*(t274 + t314) + C4*(C3*(R2*(t462 + t470) + t0*t364 + t0*t365) + RM*(C3*t471 + t0*t12) + t284*t471);

    const denZRe = t10*t17*(R2*(R3*t2 + RI21*t2 + RM*(R3*t9 + RI21*t9 + t2)) + t2*t4);
    const denYIm = RIN*(C1*(RT1*(C5*(C4*(C3*(RI11*(CIN*(t103 + t105) + R1*(t107 + t108) + t100*t98 + t83*t97) + t107*t109 + t111 + t13*(R2*(t101 + t75) + t104)) + t95*t96) + t91*t92) + t14*t87) + RT2*(C4*(C3*t87 + C5*(C3*(RI11*(R1*(t108 + t164) + R2*(C2*t162 + t135*(C2*t56 + t70)) + RI21*(t123*t70 + t76) + t159*t70) + t109*t164 + t111 + t13*(R2*(t136*t56 + t75) + t104)) + t157*t69)) + C5*(RT1*(C4*(C3*t128 + C3*(CIN*t151 + RI11*t155 + t129*t131 + t133 + t140*(R1*t139 + RI12*t135)) + t118) + t115) + t113*t92)) + t21*t67*t68*t69 + t84*(C3*(C4*(R1*(t13*t83 + t70*t81) + t78*t79) + RI11*t67*t76 + t71*t74) + C4*t69*(RL*t28 + t22))) + C5*t14*t66*(R2*t19*t3*t37 + t65)) + t17*(R2*(R3*t36 + t33) + RI21*(R2*t36 + t28*t32 + t33) + t18*t20 + t30*t32);
    const denXRe = C1*(C5*t11*t13*t165*t168 + RT1*(C4*(C5*(C3*(R1*(R3*t188 + RI21*t190 + t103 + t180) + R3*t21*t77 + RI11*(t105 + t53*(t136 + t21)) + RI12*t178 + RI21*t189 + t177*t22) + R1*t95 + t170) + t176) + C5*t173*t74) + RT2*(C4*(C5*(RL*t207 + t13*(R1*t157 + RI12*t85) + t156*t200) + t176) + C5*(RT1*(C3*t193 + C4*(C3*t205 + R1*(C3*t202 + t117)) + t200*(C3*t194 + t195*t25 + t196*t72 + t199)) + t112*t191*t74)) + t11*t167*t21 + t172*(C3*t78*t93 + R1*(t165*t171 + t95) + t170)) + RIN*(RT1*(C4*(C5*(C3*(RI11*(R1*(t154*t34 + t229) + t225*t34 + t227) + t140*(R1*t90 + R3*t59 + RI21*t59 + t54) + t232*t234 + t235) + t219) + t222) + t174*t221*t91) + RT2*(C4*(C5*(C3*(R2*t261*t70 + RI11*(R1*(C2*(RL*t153 + t41) + t113 + t228*(t0 + t256)) + RI21*(C2*(R2*(t255 + t56) + t215 + t26) + t253) + t254) + t13*(R2*(t215 + t257) + t258 + t48) + t235) + t66*(t250 + t251)) + t222) + C5*(RT1*(C4*(C3*t237 + C3*(CIN*(RI12*(t147 + t177) + t247 + t248 + t48) + R1*(CIN*t246 + RI11*t154 + t243) + RI21*(t239 + t242)) + t238) + t236) + t113*t210)) + t211*t71 + t220*(C5*(C3*(R1*(C2*t216 + t71*t80) + t217*t71) + t214*t215 + t219) + t212*t214*t37)) + t16*t65 + t165*t166*t37*t84 + t301*(RT1*(C4*(C5*(C3*(R2*(t276 + t75) + R3*t158 + R3*t93 + RI12*t276 + t100 + t180 + t275*t82) + t273) + t279) + C5*(C3*(RI11*(R1*(C2*(t61 + t82) + t229) + t227 + t34*(R2*t97 + t225)) + t109*t91 + t13*(R2*(t257 + t58) + t0*t231 + t258 + t75) + t130*t91 + t274*t91) + t264) + t115) + RT2*(C4*(C5*(C3*(R1*(RI21*(R2*t255 + t26 + t297) + t149 + t276 + t83) + RI11*(RB*(RM*t256 + t53) + RL*(RM*(R2 + R4) + t25) + t298) + RI12*(t136*t184 + t272 + t83) + RI21*(R2*t134*t299 + RI12*t297 + t184*t21) + t178 + t300) + R1*t132*t249 + RI11*(CIN*t294 + t293*t98) + t13*(t127 + t99) + t161*t278 + t249*t277) + t279) + C5*(C3*(RI11*(R1*(C2*(t194 + t257 + t268) + t113 + t228*(RL + t72)) + RI21*(C2*(RI12*t256 + t283 + t53) + t253) + t254) + RM*t259*t70 + t109*t113 + t113*t130 + t13*(R2*(R3*t56 + t58) + R3*(t282 + t283) + t75)) + RT1*(C3*(R1*(t114*t266 + t13*t289 + t243) + RI21*t288 + t252*t287) + C4*(C3*t291 + t292) + t13*(RM*(C4*RI12 + t198 + t284) + t285 + t286) + t281) + t280*t281) + t115) + t212*t262 + t220*(C3*(R1*(t134*t213 + t21*t269) + t124*t13 + t132*t78) + C5*(C3*(R2*t188 + t180 + t270*t82 + t271*t82) + t273) + t118) + t84*(C3*(R1*(t13*t268 + t266*t71) + t13*(R2*t58 + t75) + t265*t71) + t264));
    const denAIm = C1*RT2*(C4*(C5*(RI11*(RI12*t136 + t99) + t169 + t204 + t300) + R1*(C5*(t149 + t190 + t201) + t117) + t207 + t316) + C5*(RL*t313 + RT1*(C4*(RI11*t126 + RI12*t28) + R1*(C4*t148 + t73) + t313 + t315) + t280*t74) + t112*t92) + C1*(RT1*(C3*(C4*t206 + t193 + t252*t315) + C4*(C5*t189 + t318) + C5*(t233*t72*t97 + t312*(R4*(RI21 + RL) + t5 + t89) + t317)) + t0*t262 + t220*(C3*t21*(t270 + t78) + C5*(RI11*t83 + RI12*t190 + t180) + t318) + t84*(R1*(t165*t266 + t263) + t165*t265 + t317)) + RIN*(RT1*(C4*(C5*(t319*(t275 + t323) + t321) + t328) + t221*(C3*t234 + CIN*(t173 + t234)) + t236) + RT2*(C4*(C5*(C3*(R1*(R3*t295 + RI21*(t34 + t80) + t183 + t333 + t334) + R2*(t257 + t305*t34) + RI12*(t244 + t257 + t332 + t53) + RI21*(R2*(t134 + t56) + t141 + t295*t38) + RM*(t233 + t257) + t310) + t140*(t260 + t335 + t59) + t249*t324 + t249*t325 + t336) + t328) + C5*(RT1*(C3*(R1*(t114 + t13) + t114*t223) + C4*(C3*t323 + R1*(C3*R3 + CIN*t143 + t13 + t302 + t331) + t242) + t195*t239 + t329) + t209*(t113 + t13*t330 + t243) + t280*t329) + t236) + t220*t238 + t68*(R1*(t166 + t212*(C4*t80 + t13)) + t166*t38 + t212*(C4*t217 + t239)) + t84*(C4*(t319*(t217 + t270) + t321) + CIN*t208*t234 + t209*(t234 + t71))) + RT1*(C4*(C5*(C3*(R1*(RI21*t309 + t306) + R3*t248 + RI12*t306 + RI21*t308 + RM*t257*(RI11 + t0) + t180 + t53*(R3*(t0 + t305) + t0*t305)) + t13*t218 + t303) + t304) + t13*t173*t221) + RT2*(C4*(C5*(t13*t250 + t13*t251 + t191*(R1*t246 + t311)) + t304) + C5*(RL*t112*t210 + RT1*(C4*(C3*t311 + R1*(C3*t246 + t13*t23)) + t13*(C4*t77 + t199 + t286) + t174*(t224 + t259)))) + t0*t167*t37 + t172*(R1*(t13*t64 + t19*t302) + t165*t217 + t303) + t19*t211 + t301*(RT1*(C4*t342 + C5*(C3*(R1*(t34*(RI21 + RM) + t345 + t346) + R2*t345 + R3*t55 + RI12*t343 + RI12*(t257 + t347) + t224*t34 + t344 + t93) + t320 + t34*(t287 + t339)) + t349) + RT2*(C4*(C5*(t293 + t294) + t341) + C5*RT1*(C3*(R1*(t112 + t266) + RI12*(t252 + t266) + t137 + t179 + t240 + t322) + C4*t0*t43 + C4*t125 + R1*(C4*R4 + RM*(C4 + CIN) + t13 + t269 + t350) + t288) + C5*(C3*(R1*(R3*(RM + t184) + RI11*RL + RI21*(t184 + t72) + t296 + t334 + t55) + RI12*t194 + RI12*(R3*t184 + t347) + RI21*(RM*t299 + t282 + t53 + t78) + RL*RM*t252 + t216 + t247 + t252*t53 + t344) + t131*t280 + t278*t280 + t335*t348 + t336) + t349) + t168*t69 + t220*(C3*(RM*(RI11*t42 + t146) + t0*t141 + t134*t270 + t134*t271) + t342) + t68*(R1*(t0*t337 + t13*(t0 + t72)) + t0*t287 + t13*t338) + t84*(C3*(R1*(t267 + t332) + R2*(t181*t7 + t307 + t5) + RI12*t340 + t187) + t34*(t288 + t339)));
    const denBRe = C1*(t376*t380 + t384*t389) + C1*(C3*R1*t369*t88 + C3*t192*(t373 + t415) + R2*(RT1*t423 + RT2*t422*(RI12 + RIN) + t331*t426 + t422*(R1*RI21 + RI21*t424 + t352 + t365)) + RB*t388*(C4*t376 + t331) + RM*t331*(t411 + t413) + RT1*t418 + t331*(RI11*(R1*t354 + t419) + RIN*t419 + RT2*t386 + t421) + t390*t418 + t395*(R2*(t181*t351 + t413) + t37*t411 + t417 + t427)) + C3*t67*(RI12*t355 + RI21*t375 + t351*t365 + t351*(RM*t361 + t367) + t353) + C5*(R2*(C4*(RI21*t440 + RT2*(RI12*t428 + RL*t371 + t439) + t365*t428 + t429) + RL*t331*t372 + t331*(RL*RT1 + t432) + t394*t440 + t434) + RB*(R2*(C4*RT2*(RL + t11 + t385) + C4*(RI21*t437 + t352) + t394*t437 + t436) + t209*(RIN*RT1 + t383 + t431) + t356*(RI21*(RI11 + t354) + RL*t390 + RT2*t369) + t37*(t394*(t1 + t369) + t436)) + t356*(RI21*t430 + RT2*(RL*t351 + t412) + t429) + t37*(t331*t433 + t394*t430 + t434) + t384*t401) + R3*(C1*(C3*(R1*t415 + RI12*t415 + t37*t373 + t403*t6 + t421 + t427) + R2*(C3*t426 + t423) + t350*t388 + t380 + t389*t8 + t418) + C5*(C4*(R2*t440 + RB*(R1*t442 + R2*t437 + t359 + t38*t442)) + t209*(RB*t435 + t433) + t356*t430 + t401*t8) + t10*(C4*(R1*R4 + R2*t398 + t120 + t359 + t392 + t416) + t209*(RB + t396)) + t13*(C4*(R2*t410 + t392) + t209*(t407 + t441) + t221*t8 + t400 + t401 + t405) + t14*(R2*t375 + t366) + t357*(t355 + t373)) + t10*(R2*(t394*t398 + t397 + t398*t399) + t356*t390*t391 + t37*(t391*t394 + t397) + t393) + t13*(R2*(t394*t410 + t399*t410 + t409) + t221*t384 + t37*(C4*t406 + t409) + t376*t401 + t376*t405 + t390*t400 + t393) + t14*(RI21*t366 + t351*t358*t37 + t362*(R2*t360 + t359)) + t357*(RI21*(RI11*t354 + t333 + t355) + t353);
    const denCIm = C1*t443*(RI12*t385 + RM*(R1 + t369) + t271 + t445) + t13*t444 + t208*(C5*RL*t443 + C5*t382 + CIN*t425 + R3*t448 + R4*t443*(C5 + t195) + RI21*t448 + t447*(C4 + C5)) + t209*(R3*(RIN + t361) + RI21*RT1 + RI21*t354 + t425 + t447) + t446*(t38*(RIN + t80) + t445);
    const denDRe = t444;
    const numZRe = t11*t16*t301*t70*(t22*t361 + t3*(R2*(R4*(RM + RT2) + RB*RM + RT2*(RB + RM)) + t21*t361));
    const numYIm = t461*(RI11*t454*(RB*(t230*t449 + t451) + t450 + t453) + t11*(t13*(C1*(C3*t72*(RB*RT1 + RT2*t112 + t129 + t343 + t381) + t21*t446) + t14*(R2*t0*t449 + RT1*t129 + RT1*t343 + RT2*(t23*t3 + t27))) + t454*(RM*t129*t457 + RM*t26*t449 + RM*(RB*t458 + t0*t358) + RT2*(R2*(R3*t255 + RI21*t255 + t416) + R3*t459 + RB*(R3*t266 + RI21*t266 + t171) + RI21*t459 + RM*t333) + t416*t458 + t450)) + t15*(RB*(R2*t456 + t18*t3 + t451) + t25*t456 + t381*t4 + t453));
    const numXRe = t461*(C1*t285*t462 + R3*t472 + RI21*(t468*t469 + t472) + t12*t21*t395 + t462*t463*t464 + t465*(RM*(C1*RI12 + t463 + t464) + t11*t464) + t469*(C3*t462*t466 + R3*t468 + t465*(C2 + C3)));
    const numAIm = t221*t460*(RT2*t68 + t195*t447 + t197*t443);
    const numBRe = 0;
    const numCIm = 0;
    const numDRe = 0;

return [
      [ numDRe, numCIm, numBRe, numAIm, numXRe, numYIm, numZRe ],
      [ denDRe, denCIm, denBRe, denAIm, denXRe, denYIm, denZRe ]
    ];
  }

  
}
