import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class RCHighpassShelving extends BaseTonestack {
  static definition() {
    return {
      id: 'rchs',
      name: 'RC Highpass Shelving',
      components: {
        RIN: 1e3,
        C1: 100e-9,
        RB: 100e3,
        C2: 100e-9,
        RL: 1e6,
      },
      controls: {
        RB: {
          taper: Tapers.LogA,
          role: PotRole.VR,
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, RB, C1, C2, RL } = this.extractCoefficientVariables(controlValues);

    const t0 = C1*RL;

    const b0 = 0;
    const b1 = t0;
    const b2 = C2*RB*t0;
    
    const a0 = 1;
    const a1 = C1*(RIN + RL) + C2*(RB + RL);
    const a2 = C1*C2*(RB*RIN + RL*(RB + RIN));

    return [
      [b0, b1, b2],
      [a0, a1, a2]
    ];
  }
}