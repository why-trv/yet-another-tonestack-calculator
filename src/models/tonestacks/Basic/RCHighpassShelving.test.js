import { RCHighpassShelving } from './RCHighpassShelving';
import { testTonestack } from '../_testTonestack';

testTonestack(RCHighpassShelving, function (controlValues) {
  const { RIN, RB, C1, C2, RL } = this.extractCoefficientVariables(controlValues);

  const b0 = 0;
  const b1 = C1*RL;
  const b2 = C1*C2*RB*RL;

  const a0 = 1;
  const a1 = C1*RIN + C1*RL + C2*RB + C2*RL;
  const a2 = C1*C2*RB*RIN + C1*C2*RB*RL + C1*C2*RIN*RL;

  return [
    [b0, b1, b2],
    [a0, a1, a2]
  ];
});