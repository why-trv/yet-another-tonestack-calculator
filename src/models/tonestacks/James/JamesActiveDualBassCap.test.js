import { JamesActiveDualBassCap } from './JamesActiveDualBassCap';
import { testTonestack } from '../_testTonestack';

testTonestack(JamesActiveDualBassCap, function (controlValues) {
  const {
    RIN, R1, R2, R3, RF, CB1, CB2, CT1, CT2,
    RT: [RT2, RT1],
    RB: [RB2, RB1]
  } = this.processComponentValues(controlValues);

  // Transfer function denominator coefficients
  const denXRe = (-CB1*CB2*CT1*CT2*RB1*RB2*RIN*RT1*RT2)
    - CB1*CB2*CT1*CT2*R1*RB1*RB2*RT1*RT2 - CB1*CB2*CT1*CT2*R3*RB1*RB2*RIN*RT2
    - CB1*CB2*CT1*CT2*R1*RB1*RB2*RIN*RT2 - CB1*CB2*CT1*CT2*R3*RB1*RB2*RIN*RT1
    - CB1*CB2*CT1*CT2*R2*RB1*RB2*RIN*RT1 - CB1*CB2*CT1*CT2*R2*R3*RB1*RB2*RT1
    - CB1*CB2*CT1*CT2*R1*R3*RB1*RB2*RT1 - CB1*CB2*CT1*CT2*R1*R2*RB1*RB2*RT1
    - CB1*CB2*CT1*CT2*R2*R3*RB1*RB2*RIN - CB1*CB2*CT1*CT2*R1*R3*RB1*RB2*RIN
    - CB1*CB2*CT1*CT2*R1*R2*RB1*RB2*RIN;

  const denAIm = (-CB2*CT1*CT2*RB2*RIN*RT1*RT2) - CB1*CT1*CT2*RB1*RIN*RT1*RT2
    - CB2*CT1*CT2*RB1*RB2*RT1*RT2 - CB2*CT1*CT2*R1*RB2*RT1*RT2
    - CB1*CT1*CT2*R1*RB1*RT1*RT2 - CB2*CT1*CT2*RB1*RB2*RIN*RT2
    - CB1*CB2*CT2*RB1*RB2*RIN*RT2 - CB2*CT1*CT2*R3*RB2*RIN*RT2
    - CB2*CT1*CT2*R1*RB2*RIN*RT2 - CB1*CT1*CT2*R3*RB1*RIN*RT2
    - CB1*CT1*CT2*R1*RB1*RIN*RT2 - CB1*CB2*CT2*R1*RB1*RB2*RT2
    - CB1*CT1*CT2*RB1*RB2*RIN*RT1 - CB1*CB2*CT1*RB1*RB2*RIN*RT1
    - CB2*CT1*CT2*R3*RB2*RIN*RT1 - CB2*CT1*CT2*R2*RB2*RIN*RT1
    - CB1*CT1*CT2*R3*RB1*RIN*RT1 - CB1*CT1*CT2*R2*RB1*RIN*RT1
    - CB2*CT1*CT2*R3*RB1*RB2*RT1 - CB1*CT1*CT2*R3*RB1*RB2*RT1
    - CB2*CT1*CT2*R2*RB1*RB2*RT1 - CB1*CT1*CT2*R1*RB1*RB2*RT1
    - CB1*CB2*CT1*R1*RB1*RB2*RT1 - CB2*CT1*CT2*R2*R3*RB2*RT1
    - CB2*CT1*CT2*R1*R3*RB2*RT1 - CB2*CT1*CT2*R1*R2*RB2*RT1
    - CB1*CT1*CT2*R2*R3*RB1*RT1 - CB1*CT1*CT2*R1*R3*RB1*RT1
    - CB1*CT1*CT2*R1*R2*RB1*RT1 - CB2*CT1*CT2*R3*RB1*RB2*RIN
    - CB1*CT1*CT2*R3*RB1*RB2*RIN - CB1*CB2*CT2*R3*RB1*RB2*RIN
    - CB1*CB2*CT1*R3*RB1*RB2*RIN - CB2*CT1*CT2*R2*RB1*RB2*RIN
    - CB1*CB2*CT2*R2*RB1*RB2*RIN - CB1*CT1*CT2*R1*RB1*RB2*RIN
    - CB1*CB2*CT1*R1*RB1*RB2*RIN - CB2*CT1*CT2*R2*R3*RB2*RIN
    - CB2*CT1*CT2*R1*R3*RB2*RIN - CB2*CT1*CT2*R1*R2*RB2*RIN
    - CB1*CT1*CT2*R2*R3*RB1*RIN - CB1*CT1*CT2*R1*R3*RB1*RIN
    - CB1*CT1*CT2*R1*R2*RB1*RIN - CB1*CB2*CT2*R2*R3*RB1*RB2
    - CB1*CB2*CT2*R1*R3*RB1*RB2 - CB1*CB2*CT2*R1*R2*RB1*RB2;

  const denBRe = (-CT1*CT2*RIN*RT1*RT2) - CT1*CT2*RB1*RT1*RT2 - CT1*CT2*R1*RT1*RT2
    - CB2*CT2*RB2*RIN*RT2 - CT1*CT2*RB1*RIN*RT2 - CB1*CT2*RB1*RIN*RT2
    - CT1*CT2*R3*RIN*RT2 - CT1*CT2*R1*RIN*RT2 - CB2*CT2*RB1*RB2*RT2
    - CB2*CT2*R1*RB2*RT2 - CB1*CT2*R1*RB1*RT2 - CT1*CT2*RB2*RIN*RT1
    - CB2*CT1*RB2*RIN*RT1 - CB1*CT1*RB1*RIN*RT1 - CT1*CT2*R3*RIN*RT1
    - CT1*CT2*R2*RIN*RT1 - CT1*CT2*RB1*RB2*RT1 - CB2*CT1*RB1*RB2*RT1
    - CT1*CT2*R3*RB2*RT1 - CT1*CT2*R1*RB2*RT1 - CB2*CT1*R1*RB2*RT1
    - CT1*CT2*R3*RB1*RT1 - CT1*CT2*R2*RB1*RT1 - CB1*CT1*R1*RB1*RT1
    - CT1*CT2*R2*R3*RT1 - CT1*CT2*R1*R3*RT1 - CT1*CT2*R1*R2*RT1
    - CT1*CT2*RB1*RB2*RIN - CB1*CT2*RB1*RB2*RIN - CB2*CT1*RB1*RB2*RIN
    - CB1*CB2*RB1*RB2*RIN - CT1*CT2*R3*RB2*RIN - CB2*CT2*R3*RB2*RIN
    - CB2*CT1*R3*RB2*RIN - CB2*CT2*R2*RB2*RIN - CT1*CT2*R1*RB2*RIN
    - CB2*CT1*R1*RB2*RIN - CT1*CT2*R3*RB1*RIN - CB1*CT2*R3*RB1*RIN
    - CB1*CT1*R3*RB1*RIN - CT1*CT2*R2*RB1*RIN - CB1*CT2*R2*RB1*RIN
    - CB1*CT1*R1*RB1*RIN - CT1*CT2*R2*R3*RIN - CT1*CT2*R1*R3*RIN
    - CT1*CT2*R1*R2*RIN - CB2*CT2*R3*RB1*RB2 - CB1*CT2*R3*RB1*RB2
    - CB2*CT2*R2*RB1*RB2 - CB1*CT2*R1*RB1*RB2 - CB1*CB2*R1*RB1*RB2
    - CB2*CT2*R2*R3*RB2 - CB2*CT2*R1*R3*RB2 - CB2*CT2*R1*R2*RB2
    - CB1*CT2*R2*R3*RB1 - CB1*CT2*R1*R3*RB1 - CB1*CT2*R1*R2*RB1;

  const denCIm = (-CT2*RIN*RT2) - CT2*RB1*RT2 - CT2*R1*RT2 - CT1*RIN*RT1 - CT1*RB1*RT1
    - CT1*R1*RT1 - CT2*RB2*RIN - CB2*RB2*RIN - CT1*RB1*RIN - CB1*RB1*RIN
    - CT2*R3*RIN - CT1*R3*RIN - CT2*R2*RIN - CT1*R1*RIN - CT2*RB1*RB2
    - CB2*RB1*RB2 - CT2*R3*RB2 - CT2*R1*RB2 - CB2*R1*RB2 - CT2*R3*RB1 - CT2*R2*RB1
    - CB1*R1*RB1 - CT2*R2*R3 - CT2*R1*R3 - CT2*R1*R2;

  const denDRe = (- RIN) - RB1 - R1;

  // Transfer function numerator coefficients
  const numXRe = CB1*CB2*CT1*CT2*RB1*RB2*RF*RT1*RT2 + CB1*CB2*CT1*CT2*R2*RB1*RB2*RT1*RT2
    + CB1*CB2*CT1*CT2*R3*RB1*RB2*RF*RT2 + CB1*CB2*CT1*CT2*R1*RB1*RB2*RF*RT2
    + CB1*CB2*CT1*CT2*R2*R3*RB1*RB2*RT2 + CB1*CB2*CT1*CT2*R1*R3*RB1*RB2*RT2
    + CB1*CB2*CT1*CT2*R1*R2*RB1*RB2*RT2 + CB1*CB2*CT1*CT2*R3*RB1*RB2*RF*RT1
    + CB1*CB2*CT1*CT2*R2*RB1*RB2*RF*RT1 + CB1*CB2*CT1*CT2*R2*R3*RB1*RB2*RF
    + CB1*CB2*CT1*CT2*R1*R3*RB1*RB2*RF + CB1*CB2*CT1*CT2*R1*R2*RB1*RB2*RF;

  const numAIm = CB2*CT1*CT2*RB2*RF*RT1*RT2 + CB1*CT1*CT2*RB1*RF*RT1*RT2
    + CB1*CT1*CT2*RB1*RB2*RT1*RT2 + CB2*CT1*CT2*R2*RB2*RT1*RT2
    + CB1*CT1*CT2*R2*RB1*RT1*RT2 + CB2*CT1*CT2*RB1*RB2*RF*RT2
    + CB1*CB2*CT2*RB1*RB2*RF*RT2 + CB2*CT1*CT2*R3*RB2*RF*RT2
    + CB2*CT1*CT2*R1*RB2*RF*RT2 + CB1*CT1*CT2*R3*RB1*RF*RT2
    + CB1*CT1*CT2*R1*RB1*RF*RT2 + CB2*CT1*CT2*R3*RB1*RB2*RT2
    + CB1*CT1*CT2*R3*RB1*RB2*RT2 + CB2*CT1*CT2*R2*RB1*RB2*RT2
    + CB1*CB2*CT2*R2*RB1*RB2*RT2 + CB1*CT1*CT2*R1*RB1*RB2*RT2
    + CB2*CT1*CT2*R2*R3*RB2*RT2 + CB2*CT1*CT2*R1*R3*RB2*RT2
    + CB2*CT1*CT2*R1*R2*RB2*RT2 + CB1*CT1*CT2*R2*R3*RB1*RT2
    + CB1*CT1*CT2*R1*R3*RB1*RT2 + CB1*CT1*CT2*R1*R2*RB1*RT2
    + CB1*CT1*CT2*RB1*RB2*RF*RT1 + CB1*CB2*CT1*RB1*RB2*RF*RT1
    + CB2*CT1*CT2*R3*RB2*RF*RT1 + CB2*CT1*CT2*R2*RB2*RF*RT1
    + CB1*CT1*CT2*R3*RB1*RF*RT1 + CB1*CT1*CT2*R2*RB1*RF*RT1
    + CB1*CB2*CT1*R2*RB1*RB2*RT1 + CB2*CT1*CT2*R3*RB1*RB2*RF
    + CB1*CT1*CT2*R3*RB1*RB2*RF + CB1*CB2*CT2*R3*RB1*RB2*RF
    + CB1*CB2*CT1*R3*RB1*RB2*RF + CB2*CT1*CT2*R2*RB1*RB2*RF
    + CB1*CB2*CT2*R2*RB1*RB2*RF + CB1*CT1*CT2*R1*RB1*RB2*RF
    + CB1*CB2*CT1*R1*RB1*RB2*RF + CB2*CT1*CT2*R2*R3*RB2*RF
    + CB2*CT1*CT2*R1*R3*RB2*RF + CB2*CT1*CT2*R1*R2*RB2*RF
    + CB1*CT1*CT2*R2*R3*RB1*RF + CB1*CT1*CT2*R1*R3*RB1*RF
    + CB1*CT1*CT2*R1*R2*RB1*RF + CB1*CB2*CT1*R2*R3*RB1*RB2
    + CB1*CB2*CT1*R1*R3*RB1*RB2 + CB1*CB2*CT1*R1*R2*RB1*RB2;

  const numBRe = CT1*CT2*RF*RT1*RT2 + CT1*CT2*RB2*RT1*RT2 + CT1*CT2*R2*RT1*RT2
    + CB2*CT2*RB2*RF*RT2 + CT1*CT2*RB1*RF*RT2 + CB1*CT2*RB1*RF*RT2
    + CT1*CT2*R3*RF*RT2 + CT1*CT2*R1*RF*RT2 + CT1*CT2*RB1*RB2*RT2
    + CB1*CT2*RB1*RB2*RT2 + CT1*CT2*R3*RB2*RT2 + CB2*CT2*R2*RB2*RT2
    + CT1*CT2*R1*RB2*RT2 + CT1*CT2*R3*RB1*RT2 + CT1*CT2*R2*RB1*RT2
    + CB1*CT2*R2*RB1*RT2 + CT1*CT2*R2*R3*RT2 + CT1*CT2*R1*R3*RT2
    + CT1*CT2*R1*R2*RT2 + CT1*CT2*RB2*RF*RT1 + CB2*CT1*RB2*RF*RT1
    + CB1*CT1*RB1*RF*RT1 + CT1*CT2*R3*RF*RT1 + CT1*CT2*R2*RF*RT1
    + CB1*CT1*RB1*RB2*RT1 + CB2*CT1*R2*RB2*RT1 + CB1*CT1*R2*RB1*RT1
    + CT1*CT2*RB1*RB2*RF + CB1*CT2*RB1*RB2*RF + CB2*CT1*RB1*RB2*RF
    + CB1*CB2*RB1*RB2*RF + CT1*CT2*R3*RB2*RF + CB2*CT2*R3*RB2*RF
    + CB2*CT1*R3*RB2*RF + CB2*CT2*R2*RB2*RF + CT1*CT2*R1*RB2*RF
    + CB2*CT1*R1*RB2*RF + CT1*CT2*R3*RB1*RF + CB1*CT2*R3*RB1*RF
    + CB1*CT1*R3*RB1*RF + CT1*CT2*R2*RB1*RF + CB1*CT2*R2*RB1*RF
    + CB1*CT1*R1*RB1*RF + CT1*CT2*R2*R3*RF + CT1*CT2*R1*R3*RF + CT1*CT2*R1*R2*RF
    + CB2*CT1*R3*RB1*RB2 + CB1*CT1*R3*RB1*RB2 + CB2*CT1*R2*RB1*RB2
    + CB1*CB2*R2*RB1*RB2 + CB1*CT1*R1*RB1*RB2 + CB2*CT1*R2*R3*RB2
    + CB2*CT1*R1*R3*RB2 + CB2*CT1*R1*R2*RB2 + CB1*CT1*R2*R3*RB1
    + CB1*CT1*R1*R3*RB1 + CB1*CT1*R1*R2*RB1;

  const numCIm = CT2*RF*RT2 + CT2*RB2*RT2 + CT2*R2*RT2 + CT1*RF*RT1 + CT1*RB2*RT1
    + CT1*R2*RT1 + CT2*RB2*RF + CB2*RB2*RF + CT1*RB1*RF + CB1*RB1*RF + CT2*R3*RF
    + CT1*R3*RF + CT2*R2*RF + CT1*R1*RF + CT1*RB1*RB2 + CB1*RB1*RB2 + CT1*R3*RB2
    + CB2*R2*RB2 + CT1*R1*RB2 + CT1*R3*RB1 + CT1*R2*RB1 + CB1*R2*RB1 + CT1*R2*R3
    + CT1*R1*R3 + CT1*R1*R2;

  const numDRe = RF + RB2 + R2;

  return [
    [numDRe, numCIm, numBRe, numAIm, numXRe],
    [denDRe, denCIm, denBRe, denAIm, denXRe]
  ];
});