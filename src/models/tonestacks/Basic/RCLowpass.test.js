import { RCLowpass } from './RCLowpass';
import { testTonestack } from '../_testTonestack';

testTonestack(RCLowpass, function (controlValues) {
  const { RIN, RT, C1, RL } = this.extractCoefficientVariables(controlValues);

  const t0 = RIN + RT;

  const b0 = RL;
  const a0 = RL + t0;
  const a1 = C1*RL*t0;

  return [
    [b0],
    [a0, a1]
  ];
});