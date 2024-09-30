import { Princeton5F2A } from './Princeton5F2A';
import { testTonestack } from '../_testTonestack';

testTonestack(Princeton5F2A, function (controlValues) {
  const {
    RIN, RL, C1, C2, C3,
    RT: [RT2, RT1],
    RV: [RV2, RV1],
  } = this.processComponentValues(controlValues);

  // Transfer function denominator coefficients
  const denAIm = C1*C2*C3*RT1*RT2*RV1*RV2 + C1*C2*C3*RL*RT2*RV1*RV2
    + C1*C2*C3*RIN*RT2*RV1*RV2 + C1*C2*C3*RIN*RT1*RV1*RV2
    + C1*C2*C3*RIN*RL*RV1*RV2 + C1*C2*C3*RL*RT1*RT2*RV2 + C1*C2*C3*RIN*RT1*RT2*RV2
    + C1*C2*C3*RIN*RL*RT1*RV2 + C1*C2*C3*RL*RT1*RT2*RV1 + C1*C2*C3*RIN*RL*RT2*RV1
    + C1*C2*C3*RIN*RL*RT1*RV1 + C1*C2*C3*RIN*RL*RT1*RT2;

  const denBRe = C2*C3*RT2*RV1*RV2 + C1*C2*RT2*RV1*RV2 + C2*C3*RT1*RV1*RV2
    + C1*C3*RT1*RV1*RV2 + C2*C3*RL*RV1*RV2 + C1*C3*RL*RV1*RV2 + C1*C3*RIN*RV1*RV2
    + C1*C2*RIN*RV1*RV2 + C2*C3*RT1*RT2*RV2 + C1*C2*RL*RT2*RV2 + C1*C2*RIN*RT2*RV2
    + C2*C3*RL*RT1*RV2 + C1*C3*RL*RT1*RV2 + C1*C3*RIN*RT1*RV2 + C1*C2*RIN*RL*RV2
    + C2*C3*RL*RT2*RV1 + C1*C2*RL*RT2*RV1 + C2*C3*RL*RT1*RV1 + C1*C3*RL*RT1*RV1
    + C1*C3*RIN*RL*RV1 + C1*C2*RIN*RL*RV1 + C2*C3*RL*RT1*RT2 + C1*C2*RIN*RL*RT2
    + C1*C3*RIN*RL*RT1;

  const denCIm = C3*RV1*RV2 + C2*RV1*RV2 + C1*RV1*RV2 + C2*RT2*RV2 + C3*RT1*RV2
    + C2*RL*RV2 + C1*RL*RV2 + C1*RIN*RV2 + C3*RL*RV1 + C2*RL*RV1 + C1*RL*RV1
    + C2*RL*RT2 + C3*RL*RT1 + C1*RIN*RL;

  const denDRe = RV2 + RL;

  // Transfer function numerator coefficients
  const numAIm = C1*C2*C3*RL*RT2*RV1*RV2 + C1*C2*C3*RL*RT1*RT2*RV2;

  const numBRe = C1*C3*RL*RV1*RV2 + C1*C2*RL*RT2*RV2 + C1*C3*RL*RT1*RV2;

  const numCIm = C1*RL*RV2;

  const numDRe = 0;

  return [
    [numDRe, numCIm, numBRe, numAIm],
    [denDRe, denCIm, denBRe, denAIm]
  ];
});