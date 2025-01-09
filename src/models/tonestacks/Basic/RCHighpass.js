import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class RCHighpass extends BaseTonestack {
  static definition() {
    return {
      id: 'rchp',
      name: 'RC Highpass',
      components: {
        RIN: 1e3,
        RL: 1e6,
        RB: 100e3,
        C1: 100e-9,
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
    const { RIN, RB, C1, RL } = this.extractCoefficientVariables(controlValues);

    const b0 = 0;
    const b1 = C1*RB*RL;

    const a0 = RB + RL;
    const a1 = C1*(RB*(RIN + RL) + RIN*RL);

    return [
      [b0, b1],
      [a0, a1]
    ];
  }
}