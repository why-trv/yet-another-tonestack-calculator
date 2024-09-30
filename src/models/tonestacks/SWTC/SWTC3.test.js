import { SWTC3 } from './SWTC3';
import { testTonestack } from '../_testTonestack';

testTonestack(SWTC3, function (controlValues) {
  const {
    RIN, R1, R2, RL, C1,
    RT: [RT2, RT1],
    RV: [RV2, RV1]
  } = this.processComponentValues(controlValues);

  const denBRe = 0;

  const denCIm = C1*RT1*RT2*RV1*RV2 + C1*R2*RT2*RV1*RV2 + C1*RIN*RT1*RV1*RV2
    + C1*R1*RT1*RV1*RV2 + C1*R2*RIN*RV1*RV2 + C1*R1*R2*RV1*RV2 + C1*RL*RT1*RT2*RV2
    + C1*RIN*RT1*RT2*RV2 + C1*R2*RT1*RT2*RV2 + C1*R1*RT1*RT2*RV2
    + C1*R2*RL*RT2*RV2 + C1*R2*RIN*RT2*RV2 + C1*R1*R2*RT2*RV2 + C1*RIN*RL*RT1*RV2
    + C1*R1*RL*RT1*RV2 + C1*R2*RIN*RT1*RV2 + C1*R1*R2*RT1*RV2 + C1*R2*RIN*RL*RV2
    + C1*R1*R2*RL*RV2 + C1*RL*RT1*RT2*RV1 + C1*R2*RL*RT2*RV1 + C1*RIN*RL*RT1*RV1
    + C1*R1*RL*RT1*RV1 + C1*R2*RIN*RL*RV1 + C1*R1*R2*RL*RV1 + C1*RIN*RL*RT1*RT2
    + C1*R2*RL*RT1*RT2 + C1*R1*RL*RT1*RT2 + C1*R2*RIN*RL*RT2 + C1*R1*R2*RL*RT2
    + C1*R2*RIN*RL*RT1 + C1*R1*R2*RL*RT1;

  const denDRe = RT2*RV1*RV2 + RT1*RV1*RV2 + RIN*RV1*RV2 + R2*RV1*RV2 + R1*RV1*RV2
    + RL*RT2*RV2 + RIN*RT2*RV2 + R2*RT2*RV2 + R1*RT2*RV2 + RL*RT1*RV2
    + RIN*RT1*RV2 + R2*RT1*RV2 + R1*RT1*RV2 + RIN*RL*RV2 + R2*RL*RV2 + R1*RL*RV2
    + RL*RT2*RV1 + RL*RT1*RV1 + RIN*RL*RV1 + R2*RL*RV1 + R1*RL*RV1 + RIN*RL*RT2
    + R2*RL*RT2 + R1*RL*RT2 + RIN*RL*RT1 + R2*RL*RT1 + R1*RL*RT1;

  const numBRe = 0;

  const numCIm = C1*RL*RT1*RT2*RV2 + C1*R2*RL*RT2*RV2;

  const numDRe = RL*RT2*RV2 + RL*RT1*RV2;

  return [
    [numDRe, numCIm, numBRe],
    [denDRe, denCIm, denBRe]
  ];
});