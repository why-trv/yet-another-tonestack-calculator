import { RCHighpass } from './RCHighpass';
import { testTonestack } from '../_testTonestack';

testTonestack(RCHighpass, function (controlValues) {
  const { RIN, RB, C1, RL } = this.extractCoefficientVariables(controlValues);

  const b0 = 0;
  const b1 = C1*RB*RL;

  const a0 = RB + RL;
  const a1 = C1*RB*RIN + C1*RB*RL + C1*RIN*RL;

  return [
    [b0, b1],
    [a0, a1]
  ];
});