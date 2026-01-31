import { BaseTonestack } from '../BaseTonestack';
import { Tapers, PotRole } from '~/utils/components';

export class SallenKeyLowpass extends BaseTonestack {
  static definition() {
    return {
      id: 'skl0',
      name: 'Sallen–Key Low-pass (Butterworth, unity)',
      description: 'R1A and R1B are typically one dual-ganged pot. For butterworth response (12dB/octave and no resonant peak), set C1 to twice C2. For higher Q, increase that ratio. R2 and R3 are optional, and should have the same value, which sets an upper bound on the frequency control.',
      schematic: 'SallenKeyLowpass',
      components: {
        R1A: 1e6,
        R1B: 1e6,
        R2: 1e3,
        R3: 1e3,
        RL: 1e6,
        C1: 2.2e-9,
        C2: 1.1e-9,
        E: 631e3,
        E_Ac: 100e-12,
        E_Ro: 100e-12,
      },
      controls: {
        R1A: {
          taper: Tapers.LogC,
          role: PotRole.VR,
          reverse: true,
        },
        R1B: {
          taper: Tapers.LogC,
          role: PotRole.VR,
          reverse: true,
        },
      }
    };
  }

  calculateCoefficients(controlValues) {
    const { R1A, R1B, R2, R3, RL, C1, C2, E, E_Ac, E_Ro } = this.extractCoefficientVariables(controlValues);

    const b0 = 2*E*RL + E_Ac*RL;
    const b1 = 2*C1*E_Ro*RL;
    const b2 = 2*C1*C2*E_Ro*R1B*RL + 2*C1*C2*E_Ro*R3*RL;

    const a0 = 2*E*RL - E_Ac*RL + 2*E_Ro + 2*RL;
    const a1 = -2*C1*E_Ac*R1A*RL - 2*C1*E_Ac*R2*RL + 2*C1*E_Ro*R1A + 2*C1*E_Ro*R2 + 2*C1*E_Ro*RL + 2*C1*R1A*RL + 2*C1*R2*RL + 2*C2*E*R1A*RL + 2*C2*E*R1B*RL + 2*C2*E*R2*RL + 2*C2*E*R3*RL - C2*E_Ac*R1A*RL - C2*E_Ac*R1B*RL - C2*E_Ac*R2*RL - C2*E_Ac*R3*RL + 2*C2*E_Ro*R1A + 2*C2*E_Ro*R1B + 2*C2*E_Ro*R2 + 2*C2*E_Ro*R3 + 2*C2*R1A*RL + 2*C2*R1B*RL + 2*C2*R2*RL + 2*C2*R3*RL;
    const a2 = 2*C1*C2*E*R1A*R1B*RL + 2*C1*C2*E*R1A*R3*RL + 2*C1*C2*E*R1B*R2*RL + 2*C1*C2*E*R2*R3*RL - C1*C2*E_Ac*R1A*R1B*RL - C1*C2*E_Ac*R1A*R3*RL - C1*C2*E_Ac*R1B*R2*RL - C1*C2*E_Ac*R2*R3*RL + 2*C1*C2*E_Ro*R1A*R1B + 2*C1*C2*E_Ro*R1A*R3 + 2*C1*C2*E_Ro*R1A*RL + 2*C1*C2*E_Ro*R1B*R2 + 2*C1*C2*E_Ro*R1B*RL + 2*C1*C2*E_Ro*R2*R3 + 2*C1*C2*E_Ro*R2*RL + 2*C1*C2*E_Ro*R3*RL + 2*C1*C2*R1A*R1B*RL + 2*C1*C2*R1A*R3*RL + 2*C1*C2*R1B*R2*RL + 2*C1*C2*R2*R3*RL;

    return [
      [b0, b1, b2],
      [a0, a1, a2]
    ];
  }
}