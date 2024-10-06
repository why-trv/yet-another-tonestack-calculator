import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class RCLowpassShelving extends BaseTonestack {
  static definition() {
    return {
      id: 'rcls',
      name: 'RC Lowpass Shelving',
      components: {
        RIN: 1e3,
        RT: 10e3,
        C1: 10e-9,
        R1: 10e3,
        RL: 1e6,
      },
      controls: {
        RT: {
          taper: Tapers.LogA,
          role: PotRole.VR,
          reverse: true,
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { RIN, R1, RT, C1, RL } = this.extractCoefficientVariables(controlValues);

    const t0 = R1*RL;
    const t1 = RIN + RT;

    const b0 = RL;
    const b1 = C1*t0;

    const a0 = RL + t1;
    const a1 = C1*(t0 + t1*(R1 + RL));

    return [
      [b0, b1],
      [a0, a1]
    ];
  }
}