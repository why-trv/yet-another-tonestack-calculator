import { Bassman5F6A } from '../Fender/Bassman5F6A';
import { Tapers, PotRole } from '~/utils/components';

export class Marshall extends Bassman5F6A {
  static definition() {
    return {
      id: 'mars',
      name: 'Marshall',
      schematic: 'Bassman5F6-A',
      components: {
        RIN: 1300,
        R1: 33e3,
        RT: 220e3,
        RB: 1e6,
        RM: 25e3,
        RL: 517e3,
        C1: 470e-12,
        C2: 22e-9,
        C3: 22e-9
      },
      controls: {
        RB: {
          taper: Tapers.LogB,
          role: PotRole.VR
        },
        RM: Tapers.Linear,
        RT: Tapers.Linear
      }
    };
  }
}

