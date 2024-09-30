import { FramusMidControl } from './FramusMidControl';
import { testTonestack } from '../_testTonestack';

testTonestack(FramusMidControl, function (controlValues) {
  const {
    RIN, R1, RL, C1, C2,
    RM: [RM2, RM1]
  } = this.processComponentValues(controlValues);

  // Transfer function denominator coefficients
  const denAIm = 0;

  const denBRe = C1*C2*RIN*RM1*RM2 + C1*C2*R1*RM1*RM2 + C1*C2*RIN*RL*RM2
    + C1*C2*R1*RL*RM2 + C1*C2*R1*RIN*RM2 + C1*C2*RIN*RL*RM1 + C1*C2*R1*RL*RM1
    + C1*C2*R1*RIN*RM1;

  const denCIm = C2*RM1*RM2 + C2*RL*RM2 + C2*RIN*RM2 + C2*RL*RM1 + C1*RIN*RM1 + C2*R1*RM1
    + C1*R1*RM1 + C2*RIN*RL + C1*RIN*RL + C2*R1*RL + C1*R1*RL + C2*R1*RIN
    + C1*R1*RIN;

  const denDRe = RM1 + RL + RIN;

  // Transfer function numerator coefficients
  const numAIm = 0;

  const numBRe = C1*C2*R1*RL*RM2 + C1*C2*R1*RL*RM1;

  const numCIm = C2*RL*RM2 + C2*R1*RL + C1*R1*RL;

  const numDRe = RL;

  return [
    [numDRe, numCIm, numBRe, numAIm],
    [denDRe, denCIm, denBRe, denAIm]
  ];
});