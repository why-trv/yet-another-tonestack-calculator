import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class Crate extends BaseTonestack {
  static definition() {
    return {
      id: 'crte',
      name: 'Crate',
      components: {
        RIN: 1e3,
        RT: 250e3,
        RB: 250e3,
        RM: 50e3,
        R1: 68e3,
        R2: 47e3,
        R3: 22e3,
        R4: 10e3,
        RL: 1e6,
        C1: 220e-12,
        C2: 47e-9,
        C3: 220e-9,
        C4: 4.7e-9
      },
      controls: {
        RB: {
          taper: Tapers.LogA,
          role: PotRole.VR
        },
        RM: {
          taper: Tapers.LogA,
          role: PotRole.VR
        },
        RT: Tapers.Linear
      }
    };
  }

  calculateCoefficients(controlValues) {
    let {
      RIN, R1, R2, R3, R4, RL, C1, C2, C3, C4, RT2, RT1, RM, RB      
    } = this.extractCoefficientVariables(controlValues);

    RB += R4;
    RT1 = RT1 + R3;
    RM = RM * R2 / (RM + R2);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations. 
    // Original operations: 1059 (*, +, -)
    // Optimized operations: 153 (6.92x less)
    const t0 = R1*RIN;
    const t1 = R1 + RIN;
    const t2 = RT1*t1;
    const t3 = RT1 + RT2;
    const t4 = C2*C3;
    const t5 = RB*t4;
    const t6 = C1*C4*RM*t5;
    const t7 = RL*RT2;
    const t8 = RL + RT2;
    const t9 = RT1*t8 + t7;
    const t10 = C1*(R1*t9 + RIN*(R1*t8 + t9));
    const t11 = C2 + C3;
    const t12 = t1*t8;
    const t13 = t12*t4;
    const t14 = RIN + RL;
    const t15 = C3*C4;
    const t16 = R1*RL;
    const t17 = R1 + t3;
    const t18 = C3 + C4;
    const t19 = C2*t18;
    const t20 = RIN*RT2;
    const t21 = R1*RT2;
    const t22 = RIN + RT2;
    const t23 = t15 + t19;
    const t24 = C1*t18;
    const t25 = RB + RT2;
    const t26 = C1*t25;
    const t27 = RB + t8;
    const t28 = RM*t18;
    const t29 = C2*RB;

    const denYIm = 0;
    const denXRe = t6*(RL*(t0 + t1*t3) + RT2*(t0 + t2));
    const denAIm = RM*(RB*(C1*(t15*(R1*t14 + RIN*RL + t2) + t19*(RIN*t17 + RT1*(R1 + t8) + t16 + t7)) + C4*t13) + t10*(C4*t11 + t4)) + t10*t5;
    const denBRe = C1*t11*(RL*(R1*t22 + t2 + t20) + RT1*t20 + t21*(RIN + RT1)) + RB*(C1*(C2*(R1*RT1 + RL*t17 + RT1*t22 + t0 + t20) + C3*(t0 + t1*(RL + RT1))) + RM*(t1*t15 + t19*(t1 + t8) + t24*(RT1 + t14)) + t13) + RM*(t12*t23 + t24*(RL*(RIN + t3) + RT1*RT2 + t20));
    const denCIm = C2*(R1*t27 + RB*t8) + RL*t26 + t27*(C1*RT1 + C3*R1 + RIN*(C1 + t11) + t28);
    const denDRe = t27;
    const numYIm = 0;
    const numXRe = RT2*t16*t6;
    const numAIm = C1*RL*(RM*(R1*t23*t25 + RB*t19*t3) + t21*t5);
    const numBRe = RL*(t26*(R1*t11 + t28) + t29*(C1*t3 + t28));
    const numCIm = RL*(t26 + t29);
    const numDRe = 0;

return [
      [numDRe, numCIm, numBRe, numAIm, numXRe],
      [denDRe, denCIm, denBRe, denAIm, denXRe]
    ];
  }
}