import { RCLowpassShelving } from './RCLowpassShelving';
import { testTonestack } from '../_testTonestack';

testTonestack(RCLowpassShelving, function (controlValues) {
  const { RIN, R1, RT, C1, RL } = this.extractCoefficientVariables(controlValues);

  const b0 = RL;
  const b1 = C1*R1*RL;

  const a0 = RIN + RL + RT;
  const a1 = C1*R1*RIN + C1*R1*RL + C1*R1*RT + C1*RIN*RL + C1*RL*RT;

  return [
    [b0, b1],
    [a0, a1]
  ];
});