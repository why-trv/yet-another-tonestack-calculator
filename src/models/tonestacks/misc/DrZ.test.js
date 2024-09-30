import { DrZ } from './DrZ';
import { testTonestack } from '../_testTonestack';

testTonestack(DrZ, function (controlValues) {
  const {
    RIN, R1, R2, RL, C1, C2, C3,
    RT: [RT2, RT1]
  } = this.processComponentValues(controlValues);

  // Transfer function denominator coefficients
  const denAIm = C1*C2*C3*R2*RIN*RL*RT1*RT2 + C1*C2*C3*R1*RIN*RL*RT1*RT2
    + C1*C2*C3*R1*R2*RL*RT1*RT2 + C1*C2*C3*R1*R2*RIN*RT1*RT2
    + C1*C2*C3*R1*R2*RIN*RL*RT2;

  const denBRe = C1*C3*RIN*RL*RT1*RT2 + C2*C3*R2*RL*RT1*RT2 + C1*C2*R2*RL*RT1*RT2
    + C2*C3*R1*RL*RT1*RT2 + C1*C3*R1*RL*RT1*RT2 + C1*C2*R1*RL*RT1*RT2
    + C1*C3*R2*RIN*RT1*RT2 + C1*C2*R2*RIN*RT1*RT2 + C1*C2*R1*RIN*RT1*RT2
    + C2*C3*R1*R2*RT1*RT2 + C1*C3*R1*R2*RT1*RT2 + C1*C3*R2*RIN*RL*RT2
    + C2*C3*R1*R2*RL*RT2 + C1*C3*R1*R2*RL*RT2 + C1*C2*R1*R2*RL*RT2
    + C1*C2*R1*R2*RIN*RT2 + C1*C2*R2*RIN*RL*RT1 + C1*C2*R1*RIN*RL*RT1
    + C1*C2*R1*R2*RL*RT1 + C1*C2*R1*R2*RIN*RT1 + C1*C2*R1*R2*RIN*RL;

  const denCIm = C3*RL*RT1*RT2 + C1*RL*RT1*RT2 + C1*RIN*RT1*RT2 + C3*R2*RT1*RT2
    + C2*R2*RT1*RT2 + C1*R2*RT1*RT2 + C2*R1*RT1*RT2 + C1*R1*RT1*RT2 + C3*R2*RL*RT2
    + C1*R2*RL*RT2 + C1*R2*RIN*RT2 + C2*R1*R2*RT2 + C1*R1*R2*RT2 + C1*RIN*RL*RT1
    + C2*R2*RL*RT1 + C2*R1*RL*RT1 + C1*R1*RL*RT1 + C1*R2*RIN*RT1 + C2*R1*R2*RT1
    + C1*R1*R2*RT1 + C1*R2*RIN*RL + C2*R1*R2*RL + C1*R1*R2*RL;

  const denDRe = RT1*RT2 + R2*RT2 + RL*RT1 + R2*RT1 + R2*RL;

  // Transfer function numerator coefficients
  const numAIm = C1*C2*C3*R1*R2*RL*RT1*RT2;

  const numBRe = C1*C2*R2*RL*RT1*RT2 + C1*C2*R1*RL*RT1*RT2 + C1*C2*R1*R2*RL*RT2 + C1*C2*R1*R2*RL*RT1;

  const numCIm = C1*RL*RT1*RT2 + C1*R2*RL*RT2;

  const numDRe = 0;

  return [
    [numDRe, numCIm, numBRe, numAIm],
    [denDRe, denCIm, denBRe, denAIm]
  ];
});