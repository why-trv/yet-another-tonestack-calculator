import { SWTC1 } from './SWTC1';
import { testTonestack } from '../_testTonestack';

testTonestack(SWTC1, function (controlValues) {
  const {
    RIN, R1, RL, C1,
    RT: [RT2, RT1],
    RV: [RV2, RV1]
  } = this.processComponentValues(controlValues);

  const denBRe = 0;

  const denCIm = C1*RT1*RV1*RV2 + C1*RIN*RV1*RV2 + C1*R1*RV1*RV2 + C1*RT1*RT2*RV2
    + C1*RIN*RT2*RV2 + C1*R1*RT2*RV2 + C1*RL*RT1*RV2 + C1*RIN*RL*RV2
    + C1*R1*RL*RV2 + C1*RL*RT1*RV1 + C1*RIN*RL*RV1 + C1*R1*RL*RV1 + C1*RL*RT1*RT2
    + C1*RIN*RL*RT2 + C1*R1*RL*RT2;

  const denDRe = RV1*RV2 + RT2*RV2 + RT1*RV2 + RL*RV2 + RIN*RV2 + R1*RV2 + RL*RV1 + RL*RT2 + RL*RT1 + RIN*RL + R1*RL;

  const numBRe = 0;

  const numCIm = 0;

  const numDRe = RL*RV2;

  return [
    [numDRe, numCIm, numBRe],
    [denDRe, denCIm, denBRe]
  ];
});