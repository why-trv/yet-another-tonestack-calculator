import { JamesPassiveDualBassCap } from './JamesPassiveDualBassCap';
import { testTonestack } from '../_testTonestack';

testTonestack(JamesPassiveDualBassCap, function (controlValues) {
  const {
    RIN, R1, R2, R3, RL, CB1, CB2, CT1, CT2,
    RT: [RT2, RT1],
    RB: [RB2, RB1]
  } = this.processComponentValues(controlValues);

  // Transfer function denominator coefficients
  const denXRe = CB1*CB2*CT1*CT2*RB1*RB2*RIN*RL*RT1*RT2
    + CB1*CB2*CT1*CT2*R2*RB1*RB2*RL*RT1*RT2
    + CB1*CB2*CT1*CT2*R1*RB1*RB2*RL*RT1*RT2
    + CB1*CB2*CT1*CT2*R3*RB1*RB2*RIN*RT1*RT2
    + CB1*CB2*CT1*CT2*R2*RB1*RB2*RIN*RT1*RT2
    + CB1*CB2*CT1*CT2*R2*R3*RB1*RB2*RT1*RT2
    + CB1*CB2*CT1*CT2*R1*R3*RB1*RB2*RT1*RT2
    + CB1*CB2*CT1*CT2*R1*R2*RB1*RB2*RT1*RT2
    + CB1*CB2*CT1*CT2*R3*RB1*RB2*RIN*RL*RT2
    + CB1*CB2*CT1*CT2*R1*RB1*RB2*RIN*RL*RT2 + CB1*CB2*CT1*CT2*R2*R3*RB1*RB2*RL*RT2
    + CB1*CB2*CT1*CT2*R1*R3*RB1*RB2*RL*RT2 + CB1*CB2*CT1*CT2*R1*R2*RB1*RB2*RL*RT2
    + CB1*CB2*CT1*CT2*R2*R3*RB1*RB2*RIN*RT2
    + CB1*CB2*CT1*CT2*R1*R3*RB1*RB2*RIN*RT2
    + CB1*CB2*CT1*CT2*R1*R2*RB1*RB2*RIN*RT2
    + CB1*CB2*CT1*CT2*R3*RB1*RB2*RIN*RL*RT1
    + CB1*CB2*CT1*CT2*R2*RB1*RB2*RIN*RL*RT1 + CB1*CB2*CT1*CT2*R2*R3*RB1*RB2*RL*RT1
    + CB1*CB2*CT1*CT2*R1*R3*RB1*RB2*RL*RT1 + CB1*CB2*CT1*CT2*R1*R2*RB1*RB2*RL*RT1
    + CB1*CB2*CT1*CT2*R2*R3*RB1*RB2*RIN*RL + CB1*CB2*CT1*CT2*R1*R3*RB1*RB2*RIN*RL
    + CB1*CB2*CT1*CT2*R1*R2*RB1*RB2*RIN*RL;

  const denAIm = CB2*CT1*CT2*RB2*RIN*RL*RT1*RT2 + CB1*CT1*CT2*RB1*RIN*RL*RT1*RT2
    + CB2*CT1*CT2*RB1*RB2*RL*RT1*RT2 + CB1*CT1*CT2*RB1*RB2*RL*RT1*RT2
    + CB2*CT1*CT2*R2*RB2*RL*RT1*RT2 + CB2*CT1*CT2*R1*RB2*RL*RT1*RT2
    + CB1*CT1*CT2*R2*RB1*RL*RT1*RT2 + CB1*CT1*CT2*R1*RB1*RL*RT1*RT2
    + CB1*CT1*CT2*RB1*RB2*RIN*RT1*RT2 + CB2*CT1*CT2*R3*RB2*RIN*RT1*RT2
    + CB2*CT1*CT2*R2*RB2*RIN*RT1*RT2 + CB1*CT1*CT2*R3*RB1*RIN*RT1*RT2
    + CB1*CT1*CT2*R2*RB1*RIN*RT1*RT2 + CB2*CT1*CT2*R3*RB1*RB2*RT1*RT2
    + CB1*CT1*CT2*R3*RB1*RB2*RT1*RT2 + CB2*CT1*CT2*R2*RB1*RB2*RT1*RT2
    + CB1*CT1*CT2*R1*RB1*RB2*RT1*RT2 + CB2*CT1*CT2*R2*R3*RB2*RT1*RT2
    + CB2*CT1*CT2*R1*R3*RB2*RT1*RT2 + CB2*CT1*CT2*R1*R2*RB2*RT1*RT2
    + CB1*CT1*CT2*R2*R3*RB1*RT1*RT2 + CB1*CT1*CT2*R1*R3*RB1*RT1*RT2
    + CB1*CT1*CT2*R1*R2*RB1*RT1*RT2 + CB2*CT1*CT2*RB1*RB2*RIN*RL*RT2
    + CB1*CB2*CT2*RB1*RB2*RIN*RL*RT2 + CB2*CT1*CT2*R3*RB2*RIN*RL*RT2
    + CB2*CT1*CT2*R1*RB2*RIN*RL*RT2 + CB1*CT1*CT2*R3*RB1*RIN*RL*RT2
    + CB1*CT1*CT2*R1*RB1*RIN*RL*RT2 + CB2*CT1*CT2*R3*RB1*RB2*RL*RT2
    + CB1*CT1*CT2*R3*RB1*RB2*RL*RT2 + CB2*CT1*CT2*R2*RB1*RB2*RL*RT2
    + CB1*CB2*CT2*R2*RB1*RB2*RL*RT2 + CB1*CT1*CT2*R1*RB1*RB2*RL*RT2
    + CB1*CB2*CT2*R1*RB1*RB2*RL*RT2 + CB2*CT1*CT2*R2*R3*RB2*RL*RT2
    + CB2*CT1*CT2*R1*R3*RB2*RL*RT2 + CB2*CT1*CT2*R1*R2*RB2*RL*RT2
    + CB1*CT1*CT2*R2*R3*RB1*RL*RT2 + CB1*CT1*CT2*R1*R3*RB1*RL*RT2
    + CB1*CT1*CT2*R1*R2*RB1*RL*RT2 + CB2*CT1*CT2*R3*RB1*RB2*RIN*RT2
    + CB1*CT1*CT2*R3*RB1*RB2*RIN*RT2 + CB1*CB2*CT2*R3*RB1*RB2*RIN*RT2
    + CB2*CT1*CT2*R2*RB1*RB2*RIN*RT2 + CB1*CB2*CT2*R2*RB1*RB2*RIN*RT2
    + CB1*CT1*CT2*R1*RB1*RB2*RIN*RT2 + CB2*CT1*CT2*R2*R3*RB2*RIN*RT2
    + CB2*CT1*CT2*R1*R3*RB2*RIN*RT2 + CB2*CT1*CT2*R1*R2*RB2*RIN*RT2
    + CB1*CT1*CT2*R2*R3*RB1*RIN*RT2 + CB1*CT1*CT2*R1*R3*RB1*RIN*RT2
    + CB1*CT1*CT2*R1*R2*RB1*RIN*RT2 + CB1*CB2*CT2*R2*R3*RB1*RB2*RT2
    + CB1*CB2*CT2*R1*R3*RB1*RB2*RT2 + CB1*CB2*CT2*R1*R2*RB1*RB2*RT2
    + CB1*CT1*CT2*RB1*RB2*RIN*RL*RT1 + CB1*CB2*CT1*RB1*RB2*RIN*RL*RT1
    + CB2*CT1*CT2*R3*RB2*RIN*RL*RT1 + CB2*CT1*CT2*R2*RB2*RIN*RL*RT1
    + CB1*CT1*CT2*R3*RB1*RIN*RL*RT1 + CB1*CT1*CT2*R2*RB1*RIN*RL*RT1
    + CB2*CT1*CT2*R3*RB1*RB2*RL*RT1 + CB1*CT1*CT2*R3*RB1*RB2*RL*RT1
    + CB2*CT1*CT2*R2*RB1*RB2*RL*RT1 + CB1*CB2*CT1*R2*RB1*RB2*RL*RT1
    + CB1*CT1*CT2*R1*RB1*RB2*RL*RT1 + CB1*CB2*CT1*R1*RB1*RB2*RL*RT1
    + CB2*CT1*CT2*R2*R3*RB2*RL*RT1 + CB2*CT1*CT2*R1*R3*RB2*RL*RT1
    + CB2*CT1*CT2*R1*R2*RB2*RL*RT1 + CB1*CT1*CT2*R2*R3*RB1*RL*RT1
    + CB1*CT1*CT2*R1*R3*RB1*RL*RT1 + CB1*CT1*CT2*R1*R2*RB1*RL*RT1
    + CB1*CB2*CT1*R3*RB1*RB2*RIN*RT1 + CB1*CB2*CT1*R2*RB1*RB2*RIN*RT1
    + CB1*CB2*CT1*R2*R3*RB1*RB2*RT1 + CB1*CB2*CT1*R1*R3*RB1*RB2*RT1
    + CB1*CB2*CT1*R1*R2*RB1*RB2*RT1 + CB2*CT1*CT2*R3*RB1*RB2*RIN*RL
    + CB1*CT1*CT2*R3*RB1*RB2*RIN*RL + CB1*CB2*CT2*R3*RB1*RB2*RIN*RL
    + CB1*CB2*CT1*R3*RB1*RB2*RIN*RL + CB2*CT1*CT2*R2*RB1*RB2*RIN*RL
    + CB1*CB2*CT2*R2*RB1*RB2*RIN*RL + CB1*CT1*CT2*R1*RB1*RB2*RIN*RL
    + CB1*CB2*CT1*R1*RB1*RB2*RIN*RL + CB2*CT1*CT2*R2*R3*RB2*RIN*RL
    + CB2*CT1*CT2*R1*R3*RB2*RIN*RL + CB2*CT1*CT2*R1*R2*RB2*RIN*RL
    + CB1*CT1*CT2*R2*R3*RB1*RIN*RL + CB1*CT1*CT2*R1*R3*RB1*RIN*RL
    + CB1*CT1*CT2*R1*R2*RB1*RIN*RL + CB1*CB2*CT2*R2*R3*RB1*RB2*RL
    + CB1*CB2*CT1*R2*R3*RB1*RB2*RL + CB1*CB2*CT2*R1*R3*RB1*RB2*RL
    + CB1*CB2*CT1*R1*R3*RB1*RB2*RL + CB1*CB2*CT2*R1*R2*RB1*RB2*RL
    + CB1*CB2*CT1*R1*R2*RB1*RB2*RL + CB1*CB2*CT1*R2*R3*RB1*RB2*RIN
    + CB1*CB2*CT1*R1*R3*RB1*RB2*RIN + CB1*CB2*CT1*R1*R2*RB1*RB2*RIN;

  const denBRe = CT1*CT2*RIN*RL*RT1*RT2 + CT1*CT2*RB2*RL*RT1*RT2
    + CT1*CT2*RB1*RL*RT1*RT2 + CT1*CT2*R2*RL*RT1*RT2 + CT1*CT2*R1*RL*RT1*RT2
    + CT1*CT2*RB2*RIN*RT1*RT2 + CT1*CT2*R3*RIN*RT1*RT2 + CT1*CT2*R2*RIN*RT1*RT2
    + CT1*CT2*RB1*RB2*RT1*RT2 + CT1*CT2*R3*RB2*RT1*RT2 + CT1*CT2*R1*RB2*RT1*RT2
    + CT1*CT2*R3*RB1*RT1*RT2 + CT1*CT2*R2*RB1*RT1*RT2 + CT1*CT2*R2*R3*RT1*RT2
    + CT1*CT2*R1*R3*RT1*RT2 + CT1*CT2*R1*R2*RT1*RT2 + CB2*CT2*RB2*RIN*RL*RT2
    + CT1*CT2*RB1*RIN*RL*RT2 + CB1*CT2*RB1*RIN*RL*RT2 + CT1*CT2*R3*RIN*RL*RT2
    + CT1*CT2*R1*RIN*RL*RT2 + CT1*CT2*RB1*RB2*RL*RT2 + CB2*CT2*RB1*RB2*RL*RT2
    + CB1*CT2*RB1*RB2*RL*RT2 + CT1*CT2*R3*RB2*RL*RT2 + CB2*CT2*R2*RB2*RL*RT2
    + CT1*CT2*R1*RB2*RL*RT2 + CB2*CT2*R1*RB2*RL*RT2 + CT1*CT2*R3*RB1*RL*RT2
    + CT1*CT2*R2*RB1*RL*RT2 + CB1*CT2*R2*RB1*RL*RT2 + CB1*CT2*R1*RB1*RL*RT2
    + CT1*CT2*R2*R3*RL*RT2 + CT1*CT2*R1*R3*RL*RT2 + CT1*CT2*R1*R2*RL*RT2
    + CT1*CT2*RB1*RB2*RIN*RT2 + CB1*CT2*RB1*RB2*RIN*RT2 + CT1*CT2*R3*RB2*RIN*RT2
    + CB2*CT2*R3*RB2*RIN*RT2 + CB2*CT2*R2*RB2*RIN*RT2 + CT1*CT2*R1*RB2*RIN*RT2
    + CT1*CT2*R3*RB1*RIN*RT2 + CB1*CT2*R3*RB1*RIN*RT2 + CT1*CT2*R2*RB1*RIN*RT2
    + CB1*CT2*R2*RB1*RIN*RT2 + CT1*CT2*R2*R3*RIN*RT2 + CT1*CT2*R1*R3*RIN*RT2
    + CT1*CT2*R1*R2*RIN*RT2 + CB2*CT2*R3*RB1*RB2*RT2 + CB1*CT2*R3*RB1*RB2*RT2
    + CB2*CT2*R2*RB1*RB2*RT2 + CB1*CT2*R1*RB1*RB2*RT2 + CB2*CT2*R2*R3*RB2*RT2
    + CB2*CT2*R1*R3*RB2*RT2 + CB2*CT2*R1*R2*RB2*RT2 + CB1*CT2*R2*R3*RB1*RT2
    + CB1*CT2*R1*R3*RB1*RT2 + CB1*CT2*R1*R2*RB1*RT2 + CT1*CT2*RB2*RIN*RL*RT1
    + CB2*CT1*RB2*RIN*RL*RT1 + CB1*CT1*RB1*RIN*RL*RT1 + CT1*CT2*R3*RIN*RL*RT1
    + CT1*CT2*R2*RIN*RL*RT1 + CT1*CT2*RB1*RB2*RL*RT1 + CB2*CT1*RB1*RB2*RL*RT1
    + CB1*CT1*RB1*RB2*RL*RT1 + CT1*CT2*R3*RB2*RL*RT1 + CB2*CT1*R2*RB2*RL*RT1
    + CT1*CT2*R1*RB2*RL*RT1 + CB2*CT1*R1*RB2*RL*RT1 + CT1*CT2*R3*RB1*RL*RT1
    + CT1*CT2*R2*RB1*RL*RT1 + CB1*CT1*R2*RB1*RL*RT1 + CB1*CT1*R1*RB1*RL*RT1
    + CT1*CT2*R2*R3*RL*RT1 + CT1*CT2*R1*R3*RL*RT1 + CT1*CT2*R1*R2*RL*RT1
    + CB1*CT1*RB1*RB2*RIN*RT1 + CB2*CT1*R3*RB2*RIN*RT1 + CB2*CT1*R2*RB2*RIN*RT1
    + CB1*CT1*R3*RB1*RIN*RT1 + CB1*CT1*R2*RB1*RIN*RT1 + CB2*CT1*R3*RB1*RB2*RT1
    + CB1*CT1*R3*RB1*RB2*RT1 + CB2*CT1*R2*RB1*RB2*RT1 + CB1*CT1*R1*RB1*RB2*RT1
    + CB2*CT1*R2*R3*RB2*RT1 + CB2*CT1*R1*R3*RB2*RT1 + CB2*CT1*R1*R2*RB2*RT1
    + CB1*CT1*R2*R3*RB1*RT1 + CB1*CT1*R1*R3*RB1*RT1 + CB1*CT1*R1*R2*RB1*RT1
    + CT1*CT2*RB1*RB2*RIN*RL + CB1*CT2*RB1*RB2*RIN*RL + CB2*CT1*RB1*RB2*RIN*RL
    + CB1*CB2*RB1*RB2*RIN*RL + CT1*CT2*R3*RB2*RIN*RL + CB2*CT2*R3*RB2*RIN*RL
    + CB2*CT1*R3*RB2*RIN*RL + CB2*CT2*R2*RB2*RIN*RL + CT1*CT2*R1*RB2*RIN*RL
    + CB2*CT1*R1*RB2*RIN*RL + CT1*CT2*R3*RB1*RIN*RL + CB1*CT2*R3*RB1*RIN*RL
    + CB1*CT1*R3*RB1*RIN*RL + CT1*CT2*R2*RB1*RIN*RL + CB1*CT2*R2*RB1*RIN*RL
    + CB1*CT1*R1*RB1*RIN*RL + CT1*CT2*R2*R3*RIN*RL + CT1*CT2*R1*R3*RIN*RL
    + CT1*CT2*R1*R2*RIN*RL + CB2*CT2*R3*RB1*RB2*RL + CB1*CT2*R3*RB1*RB2*RL
    + CB2*CT1*R3*RB1*RB2*RL + CB1*CT1*R3*RB1*RB2*RL + CB2*CT2*R2*RB1*RB2*RL
    + CB2*CT1*R2*RB1*RB2*RL + CB1*CB2*R2*RB1*RB2*RL + CB1*CT2*R1*RB1*RB2*RL
    + CB1*CT1*R1*RB1*RB2*RL + CB1*CB2*R1*RB1*RB2*RL + CB2*CT2*R2*R3*RB2*RL
    + CB2*CT1*R2*R3*RB2*RL + CB2*CT2*R1*R3*RB2*RL + CB2*CT1*R1*R3*RB2*RL
    + CB2*CT2*R1*R2*RB2*RL + CB2*CT1*R1*R2*RB2*RL + CB1*CT2*R2*R3*RB1*RL
    + CB1*CT1*R2*R3*RB1*RL + CB1*CT2*R1*R3*RB1*RL + CB1*CT1*R1*R3*RB1*RL
    + CB1*CT2*R1*R2*RB1*RL + CB1*CT1*R1*R2*RB1*RL + CB2*CT1*R3*RB1*RB2*RIN
    + CB1*CT1*R3*RB1*RB2*RIN + CB1*CB2*R3*RB1*RB2*RIN + CB2*CT1*R2*RB1*RB2*RIN
    + CB1*CB2*R2*RB1*RB2*RIN + CB1*CT1*R1*RB1*RB2*RIN + CB2*CT1*R2*R3*RB2*RIN
    + CB2*CT1*R1*R3*RB2*RIN + CB2*CT1*R1*R2*RB2*RIN + CB1*CT1*R2*R3*RB1*RIN
    + CB1*CT1*R1*R3*RB1*RIN + CB1*CT1*R1*R2*RB1*RIN + CB1*CB2*R2*R3*RB1*RB2
    + CB1*CB2*R1*R3*RB1*RB2 + CB1*CB2*R1*R2*RB1*RB2;

  const denCIm = CT2*RIN*RL*RT2 + CT2*RB2*RL*RT2 + CT2*RB1*RL*RT2 + CT2*R2*RL*RT2
    + CT2*R1*RL*RT2 + CT2*RB2*RIN*RT2 + CT2*R3*RIN*RT2 + CT2*R2*RIN*RT2
    + CT2*RB1*RB2*RT2 + CT2*R3*RB2*RT2 + CT2*R1*RB2*RT2 + CT2*R3*RB1*RT2
    + CT2*R2*RB1*RT2 + CT2*R2*R3*RT2 + CT2*R1*R3*RT2 + CT2*R1*R2*RT2
    + CT1*RIN*RL*RT1 + CT1*RB2*RL*RT1 + CT1*RB1*RL*RT1 + CT1*R2*RL*RT1
    + CT1*R1*RL*RT1 + CT1*RB2*RIN*RT1 + CT1*R3*RIN*RT1 + CT1*R2*RIN*RT1
    + CT1*RB1*RB2*RT1 + CT1*R3*RB2*RT1 + CT1*R1*RB2*RT1 + CT1*R3*RB1*RT1
    + CT1*R2*RB1*RT1 + CT1*R2*R3*RT1 + CT1*R1*R3*RT1 + CT1*R1*R2*RT1
    + CT2*RB2*RIN*RL + CB2*RB2*RIN*RL + CT1*RB1*RIN*RL + CB1*RB1*RIN*RL
    + CT2*R3*RIN*RL + CT1*R3*RIN*RL + CT2*R2*RIN*RL + CT1*R1*RIN*RL
    + CT2*RB1*RB2*RL + CT1*RB1*RB2*RL + CB2*RB1*RB2*RL + CB1*RB1*RB2*RL
    + CT2*R3*RB2*RL + CT1*R3*RB2*RL + CB2*R2*RB2*RL + CT2*R1*RB2*RL
    + CT1*R1*RB2*RL + CB2*R1*RB2*RL + CT2*R3*RB1*RL + CT1*R3*RB1*RL
    + CT2*R2*RB1*RL + CT1*R2*RB1*RL + CB1*R2*RB1*RL + CB1*R1*RB1*RL + CT2*R2*R3*RL
    + CT1*R2*R3*RL + CT2*R1*R3*RL + CT1*R1*R3*RL + CT2*R1*R2*RL + CT1*R1*R2*RL
    + CT1*RB1*RB2*RIN + CB1*RB1*RB2*RIN + CT1*R3*RB2*RIN + CB2*R3*RB2*RIN
    + CB2*R2*RB2*RIN + CT1*R1*RB2*RIN + CT1*R3*RB1*RIN + CB1*R3*RB1*RIN
    + CT1*R2*RB1*RIN + CB1*R2*RB1*RIN + CT1*R2*R3*RIN + CT1*R1*R3*RIN
    + CT1*R1*R2*RIN + CB2*R3*RB1*RB2 + CB1*R3*RB1*RB2 + CB2*R2*RB1*RB2
    + CB1*R1*RB1*RB2 + CB2*R2*R3*RB2 + CB2*R1*R3*RB2 + CB2*R1*R2*RB2
    + CB1*R2*R3*RB1 + CB1*R1*R3*RB1 + CB1*R1*R2*RB1;

  const denDRe = RIN*RL + RB2*RL + RB1*RL + R2*RL + R1*RL + RB2*RIN + R3*RIN + R2*RIN
    + RB1*RB2 + R3*RB2 + R1*RB2 + R3*RB1 + R2*RB1 + R2*R3 + R1*R3 + R1*R2;

  // Transfer function numerator multipliers for current I5-I6
  const numXRe = CB1*CB2*CT1*CT2*R2*RB1*RB2*RL*RT1*RT2
    + CB1*CB2*CT1*CT2*R2*R3*RB1*RB2*RL*RT2 + CB1*CB2*CT1*CT2*R1*R3*RB1*RB2*RL*RT2
    + CB1*CB2*CT1*CT2*R1*R2*RB1*RB2*RL*RT2;

  const numAIm = CB1*CT1*CT2*RB1*RB2*RL*RT1*RT2 + CB2*CT1*CT2*R2*RB2*RL*RT1*RT2
    + CB1*CT1*CT2*R2*RB1*RL*RT1*RT2 + CB2*CT1*CT2*R3*RB1*RB2*RL*RT2
    + CB1*CT1*CT2*R3*RB1*RB2*RL*RT2 + CB2*CT1*CT2*R2*RB1*RB2*RL*RT2
    + CB1*CB2*CT2*R2*RB1*RB2*RL*RT2 + CB1*CT1*CT2*R1*RB1*RB2*RL*RT2
    + CB2*CT1*CT2*R2*R3*RB2*RL*RT2 + CB2*CT1*CT2*R1*R3*RB2*RL*RT2
    + CB2*CT1*CT2*R1*R2*RB2*RL*RT2 + CB1*CT1*CT2*R2*R3*RB1*RL*RT2
    + CB1*CT1*CT2*R1*R3*RB1*RL*RT2 + CB1*CT1*CT2*R1*R2*RB1*RL*RT2
    + CB1*CB2*CT1*R2*RB1*RB2*RL*RT1 + CB1*CB2*CT1*R2*R3*RB1*RB2*RL
    + CB1*CB2*CT1*R1*R3*RB1*RB2*RL + CB1*CB2*CT1*R1*R2*RB1*RB2*RL;

  const numBRe = CT1*CT2*RB2*RL*RT1*RT2 + CT1*CT2*R2*RL*RT1*RT2 + CT1*CT2*RB1*RB2*RL*RT2
    + CB1*CT2*RB1*RB2*RL*RT2 + CT1*CT2*R3*RB2*RL*RT2 + CB2*CT2*R2*RB2*RL*RT2
    + CT1*CT2*R1*RB2*RL*RT2 + CT1*CT2*R3*RB1*RL*RT2 + CT1*CT2*R2*RB1*RL*RT2
    + CB1*CT2*R2*RB1*RL*RT2 + CT1*CT2*R2*R3*RL*RT2 + CT1*CT2*R1*R3*RL*RT2
    + CT1*CT2*R1*R2*RL*RT2 + CB1*CT1*RB1*RB2*RL*RT1 + CB2*CT1*R2*RB2*RL*RT1
    + CB1*CT1*R2*RB1*RL*RT1 + CB2*CT1*R3*RB1*RB2*RL + CB1*CT1*R3*RB1*RB2*RL
    + CB2*CT1*R2*RB1*RB2*RL + CB1*CB2*R2*RB1*RB2*RL + CB1*CT1*R1*RB1*RB2*RL
    + CB2*CT1*R2*R3*RB2*RL + CB2*CT1*R1*R3*RB2*RL + CB2*CT1*R1*R2*RB2*RL
    + CB1*CT1*R2*R3*RB1*RL + CB1*CT1*R1*R3*RB1*RL + CB1*CT1*R1*R2*RB1*RL;

  const numCIm = CT2*RB2*RL*RT2 + CT2*R2*RL*RT2 + CT1*RB2*RL*RT1 + CT1*R2*RL*RT1
    + CT1*RB1*RB2*RL + CB1*RB1*RB2*RL + CT1*R3*RB2*RL + CB2*R2*RB2*RL
    + CT1*R1*RB2*RL + CT1*R3*RB1*RL + CT1*R2*RB1*RL + CB1*R2*RB1*RL + CT1*R2*R3*RL
    + CT1*R1*R3*RL + CT1*R1*R2*RL;

  const numDRe = RB2*RL + R2*RL;

  return [
    [numDRe, numCIm, numBRe, numAIm, numXRe],
    [denDRe, denCIm, denBRe, denAIm, denXRe]
  ];
});