import { BigMuff } from './BigMuff';
import { testTonestack } from '../_testTonestack';

testTonestack(BigMuff, function (controlValues) {
  const {
    RIN, R1, R2, RL, C1, C2,
    RM: [RM2, RM1]
  } = this.processComponentValues(controlValues);

  // Transfer function denominator coefficients
  const denAIm = 0;

  const denBRe = C1*C2*R2*RIN*RM1*RM2 + C1*C2*R1*RIN*RM1*RM2 + C1*C2*R1*R2*RM1*RM2
    + C1*C2*R2*RIN*RL*RM2 + C1*C2*R1*RIN*RL*RM2 + C1*C2*R1*R2*RL*RM2
    + C1*C2*R1*R2*RIN*RM2 + C1*C2*R2*RIN*RL*RM1 + C1*C2*R1*RIN*RL*RM1
    + C1*C2*R1*R2*RL*RM1 + C1*C2*R1*R2*RIN*RL;

  const denCIm = C2*RIN*RM1*RM2 + C1*RIN*RM1*RM2 + C1*R2*RM1*RM2 + C2*R1*RM1*RM2
    + C2*RIN*RL*RM2 + C1*RIN*RL*RM2 + C1*R2*RL*RM2 + C2*R1*RL*RM2 + C2*R2*RIN*RM2
    + C1*R2*RIN*RM2 + C2*R1*R2*RM2 + C2*RIN*RL*RM1 + C1*RIN*RL*RM1 + C1*R2*RL*RM1
    + C2*R1*RL*RM1 + C1*R2*RIN*RM1 + C1*R1*RIN*RM1 + C1*R1*R2*RM1 + C2*R2*RIN*RL
    + C1*R1*RIN*RL + C2*R1*R2*RL + C1*R1*R2*RL + C1*R1*R2*RIN;

  const denDRe = RM1*RM2 + RL*RM2 + R2*RM2 + RL*RM1 + RIN*RM1 + R1*RM1 + RIN*RL
    + R2*RL + R1*RL + R2*RIN + R1*R2;

  // Transfer function numerator coefficients
  const numAIm = 0;

  const numBRe = C1*C2*R1*R2*RL*RM2;

  const numCIm = C1*R2*RL*RM2 + C1*R2*RL*RM1 + C1*R1*R2*RL;

  const numDRe = RL*RM1 + R2*RL;

  return [
    [numDRe, numCIm, numBRe, numAIm],
    [denDRe, denCIm, denBRe, denAIm]
  ];
});