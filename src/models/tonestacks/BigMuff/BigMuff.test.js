import { BigMuff } from './BigMuff';
import { testTonestack } from '../_testTonestack';

testTonestack(BigMuff, function (controlValues) {
  const { RIN, R1, R2, RT1, RT2, RL, C1, C2, C3 } = this.extractCoefficientVariables(controlValues);

  const b0 = 0;
  const b1 = C3*R2*RL + C3*RL*RT1;
  const b2 = C2*C3*R1*R2*RL + C2*C3*R2*RL*RT1 + C2*C3*R2*RL*RT2;
  const b3 = C1*C2*C3*R1*R2*RL*RT2;

  const a0 = R1 + R2 + RIN + RT1 + RT2;
  const a1 = C1*R1*R2 + C1*R1*RT1 + C1*R1*RT2 + C1*R2*RIN + C1*RIN*RT1 + C1*RIN*RT2 + C2*R1*R2 + C2*R1*RIN + C2*R2*RT1 + C2*R2*RT2 + C2*RIN*RT1 + C2*RIN*RT2 + C3*R1*R2 + C3*R1*RL + C3*R1*RT1 + C3*R2*RIN + C3*R2*RL + C3*R2*RT2 + C3*RIN*RL + C3*RIN*RT1 + C3*RL*RT1 + C3*RL*RT2 + C3*RT1*RT2;
  const a2 = C1*C2*R1*R2*RIN + C1*C2*R1*R2*RT1 + C1*C2*R1*R2*RT2 + C1*C2*R1*RIN*RT1 + C1*C2*R1*RIN*RT2 + C1*C2*R2*RIN*RT1 + C1*C2*R2*RIN*RT2 + C1*C3*R1*R2*RL + C1*C3*R1*R2*RT2 + C1*C3*R1*RL*RT1 + C1*C3*R1*RL*RT2 + C1*C3*R1*RT1*RT2 + C1*C3*R2*RIN*RL + C1*C3*R2*RIN*RT2 + C1*C3*RIN*RL*RT1 + C1*C3*RIN*RL*RT2 + C1*C3*RIN*RT1*RT2 + C2*C3*R1*R2*RIN + C2*C3*R1*R2*RL + C2*C3*R1*R2*RT1 + C2*C3*R1*RIN*RL + C2*C3*R1*RIN*RT1 + C2*C3*R2*RIN*RT1 + C2*C3*R2*RIN*RT2 + C2*C3*R2*RL*RT1 + C2*C3*R2*RL*RT2 + C2*C3*R2*RT1*RT2 + C2*C3*RIN*RL*RT1 + C2*C3*RIN*RL*RT2 + C2*C3*RIN*RT1*RT2;
  const a3 = C1*C2*C3*R1*R2*RIN*RL + C1*C2*C3*R1*R2*RIN*RT2 + C1*C2*C3*R1*R2*RL*RT1 + C1*C2*C3*R1*R2*RL*RT2 + C1*C2*C3*R1*R2*RT1*RT2 + C1*C2*C3*R1*RIN*RL*RT1 + C1*C2*C3*R1*RIN*RL*RT2 + C1*C2*C3*R1*RIN*RT1*RT2 + C1*C2*C3*R2*RIN*RL*RT1 + C1*C2*C3*R2*RIN*RL*RT2 + C1*C2*C3*R2*RIN*RT1*RT2;

  return [
    [b0, b1, b2, b3],
    [a0, a1, a2, a3]
  ];
});