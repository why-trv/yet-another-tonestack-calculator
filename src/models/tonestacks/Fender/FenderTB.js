import { FenderTMB } from './FenderTMB';
import { Tapers, PotRole } from '~/utils/components';

export class FenderTB extends FenderTMB {
  static definition() {
    return {
      id: 'ftb',
      name: 'Fender Treble-Bass',
      description: 'Same as Fender TMB, but with R<sub>M</sub> normally fixed at 6.8k (i.e. around 7.1 on 1–10 BF-style knobs)',
      schematic: 'FenderTB',
      components: {
        RIN: 38e3,
        RL: 1e6,
        RB: 250e3,
        RM: 6.8e3,
        RT: 250e3,
        R1: 100e3,
        C1: 250e-12,
        C2: 100e-9,
        C3: 47e-9
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
}