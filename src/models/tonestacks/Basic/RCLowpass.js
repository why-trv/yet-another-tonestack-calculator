import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class RCLowpass extends BaseTonestack {
  static definition() {
    return {
      id: 'rclp',
      name: 'RC Lowpass',
      components: {
        RIN: 1e3,
        RL: 1e6,
        RT: 10e3,
        C1: 10e-9,
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
    const { RIN, RT, C1, RL } = this.extractCoefficientVariables(controlValues);

    const b0 = RL;

    const a0 = RIN + RL + RT;
    const a1 = C1*RIN*RL + C1*RL*RT;

    return [
      [b0],
      [a0, a1]
    ];
  }
}