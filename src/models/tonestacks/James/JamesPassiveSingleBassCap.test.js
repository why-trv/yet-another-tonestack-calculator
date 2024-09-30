import { JamesPassiveSingleBassCap } from './JamesPassiveSingleBassCap';
import { testTonestack } from '../_testTonestack';

testTonestack(JamesPassiveSingleBassCap, function (controlValues) {
  const {
    RIN, R1, R2, R3, RL, CB, CT1, CT2,
    RT: [RT2, RT1],
    RB: [RB2, RB1]
  } = this.processComponentValues(controlValues);

  // Transfer function denominator coefficients
  const denXRe = 0;

  const denAIm = CB*CT1*CT2*RB2*RIN*RL*RT1*RT2 + CB*CT1*CT2*RB1*RIN*RL*RT1*RT2
    + CB*CT1*CT2*R2*RB2*RL*RT1*RT2 + CB*CT1*CT2*R1*RB2*RL*RT1*RT2
    + CB*CT1*CT2*R2*RB1*RL*RT1*RT2 + CB*CT1*CT2*R1*RB1*RL*RT1*RT2
    + CB*CT1*CT2*RB1*RB2*RIN*RT1*RT2 + CB*CT1*CT2*R3*RB2*RIN*RT1*RT2
    + CB*CT1*CT2*R2*RB2*RIN*RT1*RT2 + CB*CT1*CT2*R3*RB1*RIN*RT1*RT2
    + CB*CT1*CT2*R2*RB1*RIN*RT1*RT2 + CB*CT1*CT2*R2*RB1*RB2*RT1*RT2
    + CB*CT1*CT2*R1*RB1*RB2*RT1*RT2 + CB*CT1*CT2*R2*R3*RB2*RT1*RT2
    + CB*CT1*CT2*R1*R3*RB2*RT1*RT2 + CB*CT1*CT2*R1*R2*RB2*RT1*RT2
    + CB*CT1*CT2*R2*R3*RB1*RT1*RT2 + CB*CT1*CT2*R1*R3*RB1*RT1*RT2
    + CB*CT1*CT2*R1*R2*RB1*RT1*RT2 + CB*CT1*CT2*RB1*RB2*RIN*RL*RT2
    + CB*CT1*CT2*R3*RB2*RIN*RL*RT2 + CB*CT1*CT2*R1*RB2*RIN*RL*RT2
    + CB*CT1*CT2*R3*RB1*RIN*RL*RT2 + CB*CT1*CT2*R1*RB1*RIN*RL*RT2
    + CB*CT1*CT2*R2*RB1*RB2*RL*RT2 + CB*CT1*CT2*R1*RB1*RB2*RL*RT2
    + CB*CT1*CT2*R2*R3*RB2*RL*RT2 + CB*CT1*CT2*R1*R3*RB2*RL*RT2
    + CB*CT1*CT2*R1*R2*RB2*RL*RT2 + CB*CT1*CT2*R2*R3*RB1*RL*RT2
    + CB*CT1*CT2*R1*R3*RB1*RL*RT2 + CB*CT1*CT2*R1*R2*RB1*RL*RT2
    + CB*CT1*CT2*R2*RB1*RB2*RIN*RT2 + CB*CT1*CT2*R1*RB1*RB2*RIN*RT2
    + CB*CT1*CT2*R2*R3*RB2*RIN*RT2 + CB*CT1*CT2*R1*R3*RB2*RIN*RT2
    + CB*CT1*CT2*R1*R2*RB2*RIN*RT2 + CB*CT1*CT2*R2*R3*RB1*RIN*RT2
    + CB*CT1*CT2*R1*R3*RB1*RIN*RT2 + CB*CT1*CT2*R1*R2*RB1*RIN*RT2
    + CB*CT1*CT2*RB1*RB2*RIN*RL*RT1 + CB*CT1*CT2*R3*RB2*RIN*RL*RT1
    + CB*CT1*CT2*R2*RB2*RIN*RL*RT1 + CB*CT1*CT2*R3*RB1*RIN*RL*RT1
    + CB*CT1*CT2*R2*RB1*RIN*RL*RT1 + CB*CT1*CT2*R2*RB1*RB2*RL*RT1
    + CB*CT1*CT2*R1*RB1*RB2*RL*RT1 + CB*CT1*CT2*R2*R3*RB2*RL*RT1
    + CB*CT1*CT2*R1*R3*RB2*RL*RT1 + CB*CT1*CT2*R1*R2*RB2*RL*RT1
    + CB*CT1*CT2*R2*R3*RB1*RL*RT1 + CB*CT1*CT2*R1*R3*RB1*RL*RT1
    + CB*CT1*CT2*R1*R2*RB1*RL*RT1 + CB*CT1*CT2*R2*RB1*RB2*RIN*RL
    + CB*CT1*CT2*R1*RB1*RB2*RIN*RL + CB*CT1*CT2*R2*R3*RB2*RIN*RL
    + CB*CT1*CT2*R1*R3*RB2*RIN*RL + CB*CT1*CT2*R1*R2*RB2*RIN*RL
    + CB*CT1*CT2*R2*R3*RB1*RIN*RL + CB*CT1*CT2*R1*R3*RB1*RIN*RL
    + CB*CT1*CT2*R1*R2*RB1*RIN*RL;

  const denBRe = CT1*CT2*RIN*RL*RT1*RT2 + CT1*CT2*RB2*RL*RT1*RT2 + CT1*CT2*RB1*RL*RT1*RT2
    + CT1*CT2*R2*RL*RT1*RT2 + CT1*CT2*R1*RL*RT1*RT2 + CT1*CT2*RB2*RIN*RT1*RT2
    + CT1*CT2*R3*RIN*RT1*RT2 + CT1*CT2*R2*RIN*RT1*RT2 + CT1*CT2*RB1*RB2*RT1*RT2
    + CT1*CT2*R3*RB2*RT1*RT2 + CT1*CT2*R1*RB2*RT1*RT2 + CT1*CT2*R3*RB1*RT1*RT2
    + CT1*CT2*R2*RB1*RT1*RT2 + CT1*CT2*R2*R3*RT1*RT2 + CT1*CT2*R1*R3*RT1*RT2
    + CT1*CT2*R1*R2*RT1*RT2 + CB*CT2*RB2*RIN*RL*RT2 + CT1*CT2*RB1*RIN*RL*RT2
    + CB*CT2*RB1*RIN*RL*RT2 + CT1*CT2*R3*RIN*RL*RT2 + CT1*CT2*R1*RIN*RL*RT2
    + CT1*CT2*RB1*RB2*RL*RT2 + CT1*CT2*R3*RB2*RL*RT2 + CB*CT2*R2*RB2*RL*RT2
    + CT1*CT2*R1*RB2*RL*RT2 + CB*CT2*R1*RB2*RL*RT2 + CT1*CT2*R3*RB1*RL*RT2
    + CT1*CT2*R2*RB1*RL*RT2 + CB*CT2*R2*RB1*RL*RT2 + CB*CT2*R1*RB1*RL*RT2
    + CT1*CT2*R2*R3*RL*RT2 + CT1*CT2*R1*R3*RL*RT2 + CT1*CT2*R1*R2*RL*RT2
    + CT1*CT2*RB1*RB2*RIN*RT2 + CB*CT2*RB1*RB2*RIN*RT2 + CT1*CT2*R3*RB2*RIN*RT2
    + CB*CT2*R3*RB2*RIN*RT2 + CB*CT2*R2*RB2*RIN*RT2 + CT1*CT2*R1*RB2*RIN*RT2
    + CT1*CT2*R3*RB1*RIN*RT2 + CB*CT2*R3*RB1*RIN*RT2 + CT1*CT2*R2*RB1*RIN*RT2
    + CB*CT2*R2*RB1*RIN*RT2 + CT1*CT2*R2*R3*RIN*RT2 + CT1*CT2*R1*R3*RIN*RT2
    + CT1*CT2*R1*R2*RIN*RT2 + CB*CT2*R2*RB1*RB2*RT2 + CB*CT2*R1*RB1*RB2*RT2
    + CB*CT2*R2*R3*RB2*RT2 + CB*CT2*R1*R3*RB2*RT2 + CB*CT2*R1*R2*RB2*RT2
    + CB*CT2*R2*R3*RB1*RT2 + CB*CT2*R1*R3*RB1*RT2 + CB*CT2*R1*R2*RB1*RT2
    + CT1*CT2*RB2*RIN*RL*RT1 + CB*CT1*RB2*RIN*RL*RT1 + CB*CT1*RB1*RIN*RL*RT1
    + CT1*CT2*R3*RIN*RL*RT1 + CT1*CT2*R2*RIN*RL*RT1 + CT1*CT2*RB1*RB2*RL*RT1
    + CT1*CT2*R3*RB2*RL*RT1 + CB*CT1*R2*RB2*RL*RT1 + CT1*CT2*R1*RB2*RL*RT1
    + CB*CT1*R1*RB2*RL*RT1 + CT1*CT2*R3*RB1*RL*RT1 + CT1*CT2*R2*RB1*RL*RT1
    + CB*CT1*R2*RB1*RL*RT1 + CB*CT1*R1*RB1*RL*RT1 + CT1*CT2*R2*R3*RL*RT1
    + CT1*CT2*R1*R3*RL*RT1 + CT1*CT2*R1*R2*RL*RT1 + CB*CT1*RB1*RB2*RIN*RT1
    + CB*CT1*R3*RB2*RIN*RT1 + CB*CT1*R2*RB2*RIN*RT1 + CB*CT1*R3*RB1*RIN*RT1
    + CB*CT1*R2*RB1*RIN*RT1 + CB*CT1*R2*RB1*RB2*RT1 + CB*CT1*R1*RB1*RB2*RT1
    + CB*CT1*R2*R3*RB2*RT1 + CB*CT1*R1*R3*RB2*RT1 + CB*CT1*R1*R2*RB2*RT1
    + CB*CT1*R2*R3*RB1*RT1 + CB*CT1*R1*R3*RB1*RT1 + CB*CT1*R1*R2*RB1*RT1
    + CT1*CT2*RB1*RB2*RIN*RL + CB*CT2*RB1*RB2*RIN*RL + CB*CT1*RB1*RB2*RIN*RL
    + CT1*CT2*R3*RB2*RIN*RL + CB*CT2*R3*RB2*RIN*RL + CB*CT1*R3*RB2*RIN*RL
    + CB*CT2*R2*RB2*RIN*RL + CT1*CT2*R1*RB2*RIN*RL + CB*CT1*R1*RB2*RIN*RL
    + CT1*CT2*R3*RB1*RIN*RL + CB*CT2*R3*RB1*RIN*RL + CB*CT1*R3*RB1*RIN*RL
    + CT1*CT2*R2*RB1*RIN*RL + CB*CT2*R2*RB1*RIN*RL + CB*CT1*R1*RB1*RIN*RL
    + CT1*CT2*R2*R3*RIN*RL + CT1*CT2*R1*R3*RIN*RL + CT1*CT2*R1*R2*RIN*RL
    + CB*CT2*R2*RB1*RB2*RL + CB*CT1*R2*RB1*RB2*RL + CB*CT2*R1*RB1*RB2*RL
    + CB*CT1*R1*RB1*RB2*RL + CB*CT2*R2*R3*RB2*RL + CB*CT1*R2*R3*RB2*RL
    + CB*CT2*R1*R3*RB2*RL + CB*CT1*R1*R3*RB2*RL + CB*CT2*R1*R2*RB2*RL
    + CB*CT1*R1*R2*RB2*RL + CB*CT2*R2*R3*RB1*RL + CB*CT1*R2*R3*RB1*RL
    + CB*CT2*R1*R3*RB1*RL + CB*CT1*R1*R3*RB1*RL + CB*CT2*R1*R2*RB1*RL
    + CB*CT1*R1*R2*RB1*RL + CB*CT1*R2*RB1*RB2*RIN + CB*CT1*R1*RB1*RB2*RIN
    + CB*CT1*R2*R3*RB2*RIN + CB*CT1*R1*R3*RB2*RIN + CB*CT1*R1*R2*RB2*RIN
    + CB*CT1*R2*R3*RB1*RIN + CB*CT1*R1*R3*RB1*RIN + CB*CT1*R1*R2*RB1*RIN;

  const denCIm = CT2*RIN*RL*RT2 + CT2*RB2*RL*RT2 + CT2*RB1*RL*RT2 + CT2*R2*RL*RT2
    + CT2*R1*RL*RT2 + CT2*RB2*RIN*RT2 + CT2*R3*RIN*RT2 + CT2*R2*RIN*RT2
    + CT2*RB1*RB2*RT2 + CT2*R3*RB2*RT2 + CT2*R1*RB2*RT2 + CT2*R3*RB1*RT2
    + CT2*R2*RB1*RT2 + CT2*R2*R3*RT2 + CT2*R1*R3*RT2 + CT2*R1*R2*RT2
    + CT1*RIN*RL*RT1 + CT1*RB2*RL*RT1 + CT1*RB1*RL*RT1 + CT1*R2*RL*RT1
    + CT1*R1*RL*RT1 + CT1*RB2*RIN*RT1 + CT1*R3*RIN*RT1 + CT1*R2*RIN*RT1
    + CT1*RB1*RB2*RT1 + CT1*R3*RB2*RT1 + CT1*R1*RB2*RT1 + CT1*R3*RB1*RT1
    + CT1*R2*RB1*RT1 + CT1*R2*R3*RT1 + CT1*R1*R3*RT1 + CT1*R1*R2*RT1
    + CT2*RB2*RIN*RL + CB*RB2*RIN*RL + CT1*RB1*RIN*RL + CB*RB1*RIN*RL
    + CT2*R3*RIN*RL + CT1*R3*RIN*RL + CT2*R2*RIN*RL + CT1*R1*RIN*RL
    + CT2*RB1*RB2*RL + CT1*RB1*RB2*RL + CT2*R3*RB2*RL + CT1*R3*RB2*RL
    + CB*R2*RB2*RL + CT2*R1*RB2*RL + CT1*R1*RB2*RL + CB*R1*RB2*RL + CT2*R3*RB1*RL
    + CT1*R3*RB1*RL + CT2*R2*RB1*RL + CT1*R2*RB1*RL + CB*R2*RB1*RL + CB*R1*RB1*RL
    + CT2*R2*R3*RL + CT1*R2*R3*RL + CT2*R1*R3*RL + CT1*R1*R3*RL + CT2*R1*R2*RL
    + CT1*R1*R2*RL + CT1*RB1*RB2*RIN + CB*RB1*RB2*RIN + CT1*R3*RB2*RIN
    + CB*R3*RB2*RIN + CB*R2*RB2*RIN + CT1*R1*RB2*RIN + CT1*R3*RB1*RIN
    + CB*R3*RB1*RIN + CT1*R2*RB1*RIN + CB*R2*RB1*RIN + CT1*R2*R3*RIN
    + CT1*R1*R3*RIN + CT1*R1*R2*RIN + CB*R2*RB1*RB2 + CB*R1*RB1*RB2 + CB*R2*R3*RB2
    + CB*R1*R3*RB2 + CB*R1*R2*RB2 + CB*R2*R3*RB1 + CB*R1*R3*RB1 + CB*R1*R2*RB1;

  const denDRe = RIN*RL + RB2*RL + RB1*RL + R2*RL + R1*RL + RB2*RIN + R3*RIN + R2*RIN
    + RB1*RB2 + R3*RB2 + R1*RB2 + R3*RB1 + R2*RB1 + R2*R3 + R1*R3 + R1*R2;

  // Transfer function numerator coefficients
  const numXRe = 0;

  const numAIm = CB*CT1*CT2*R2*RB2*RL*RT1*RT2 + CB*CT1*CT2*R2*RB1*RL*RT1*RT2
    + CB*CT1*CT2*R2*RB1*RB2*RL*RT2 + CB*CT1*CT2*R1*RB1*RB2*RL*RT2
    + CB*CT1*CT2*R2*R3*RB2*RL*RT2 + CB*CT1*CT2*R1*R3*RB2*RL*RT2
    + CB*CT1*CT2*R1*R2*RB2*RL*RT2 + CB*CT1*CT2*R2*R3*RB1*RL*RT2
    + CB*CT1*CT2*R1*R3*RB1*RL*RT2 + CB*CT1*CT2*R1*R2*RB1*RL*RT2;

  const numBRe = CT1*CT2*RB2*RL*RT1*RT2 + CT1*CT2*R2*RL*RT1*RT2 + CT1*CT2*RB1*RB2*RL*RT2
    + CT1*CT2*R3*RB2*RL*RT2 + CB*CT2*R2*RB2*RL*RT2 + CT1*CT2*R1*RB2*RL*RT2
    + CT1*CT2*R3*RB1*RL*RT2 + CT1*CT2*R2*RB1*RL*RT2 + CB*CT2*R2*RB1*RL*RT2
    + CT1*CT2*R2*R3*RL*RT2 + CT1*CT2*R1*R3*RL*RT2 + CT1*CT2*R1*R2*RL*RT2
    + CB*CT1*R2*RB2*RL*RT1 + CB*CT1*R2*RB1*RL*RT1 + CB*CT1*R2*RB1*RB2*RL
    + CB*CT1*R1*RB1*RB2*RL + CB*CT1*R2*R3*RB2*RL + CB*CT1*R1*R3*RB2*RL
    + CB*CT1*R1*R2*RB2*RL + CB*CT1*R2*R3*RB1*RL + CB*CT1*R1*R3*RB1*RL
    + CB*CT1*R1*R2*RB1*RL;

  const numCIm = CT2*RB2*RL*RT2 + CT2*R2*RL*RT2 + CT1*RB2*RL*RT1 + CT1*R2*RL*RT1
    + CT1*RB1*RB2*RL + CT1*R3*RB2*RL + CB*R2*RB2*RL + CT1*R1*RB2*RL
    + CT1*R3*RB1*RL + CT1*R2*RB1*RL + CB*R2*RB1*RL + CT1*R2*R3*RL + CT1*R1*R3*RL
    + CT1*R1*R2*RL;

  const numDRe = RB2*RL + R2*RL;

  return [
    [numDRe, numCIm, numBRe, numAIm],
    [denDRe, denCIm, denBRe, denAIm]
  ];
});