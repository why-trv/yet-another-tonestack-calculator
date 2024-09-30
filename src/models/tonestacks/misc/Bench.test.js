import { Bench } from './Bench';
import { testTonestack } from '../_testTonestack';

testTonestack(Bench, function (controlValues) {
  const {
    RIN, R4, R5, C1, C2, L1, L2,
    RT: [RT2, RT1],
    RM: [RM2, RM1],
    RB: [RB2, RB1]
  } = this.processComponentValues(controlValues);

  // Transfer function denominator coefficients
  const denXRe = C1*C2*L1*L2*RB2*RIN*RM2*RT1*RT2 + C1*C2*L1*L2*RB1*RIN*RM2*RT1*RT2
    + C1*C2*L1*L2*R5*RIN*RM2*RT1*RT2 + C1*C2*L1*L2*R4*RIN*RM2*RT1*RT2
    + C1*C2*L1*L2*R5*RB2*RM2*RT1*RT2 + C1*C2*L1*L2*R4*RB2*RM2*RT1*RT2
    + C1*C2*L1*L2*R5*RB1*RM2*RT1*RT2 + C1*C2*L1*L2*R4*RB1*RM2*RT1*RT2
    + C1*C2*L1*L2*RB2*RIN*RM1*RT1*RT2 + C1*C2*L1*L2*RB1*RIN*RM1*RT1*RT2
    + C1*C2*L1*L2*R5*RIN*RM1*RT1*RT2 + C1*C2*L1*L2*R4*RIN*RM1*RT1*RT2
    + C1*C2*L1*L2*R5*RB2*RM1*RT1*RT2 + C1*C2*L1*L2*R4*RB2*RM1*RT1*RT2
    + C1*C2*L1*L2*R5*RB1*RM1*RT1*RT2 + C1*C2*L1*L2*R4*RB1*RM1*RT1*RT2
    + C1*C2*L1*L2*R5*RB2*RIN*RT1*RT2 + C1*C2*L1*L2*R4*RB2*RIN*RT1*RT2
    + C1*C2*L1*L2*R5*RB1*RIN*RT1*RT2 + C1*C2*L1*L2*R4*RB1*RIN*RT1*RT2
    + C1*C2*L1*L2*R4*RB2*RIN*RM2*RT2 + C1*C2*L1*L2*R4*RB1*RIN*RM2*RT2
    + C1*C2*L1*L2*R4*R5*RIN*RM2*RT2 + C1*C2*L1*L2*R4*R5*RB2*RM2*RT2
    + C1*C2*L1*L2*R4*R5*RB1*RM2*RT2 + C1*C2*L1*L2*R4*RB2*RIN*RM1*RT2
    + C1*C2*L1*L2*R4*RB1*RIN*RM1*RT2 + C1*C2*L1*L2*R4*R5*RIN*RM1*RT2
    + C1*C2*L1*L2*R4*R5*RB2*RM1*RT2 + C1*C2*L1*L2*R4*R5*RB1*RM1*RT2
    + C1*C2*L1*L2*R4*R5*RB2*RIN*RT2 + C1*C2*L1*L2*R4*R5*RB1*RIN*RT2
    + C1*C2*L1*L2*R5*RB2*RIN*RM2*RT1 + C1*C2*L1*L2*R5*RB1*RIN*RM2*RT1
    + C1*C2*L1*L2*R4*R5*RIN*RM2*RT1 + C1*C2*L1*L2*R4*R5*RB2*RM2*RT1
    + C1*C2*L1*L2*R4*R5*RB1*RM2*RT1 + C1*C2*L1*L2*R5*RB2*RIN*RM1*RT1
    + C1*C2*L1*L2*R5*RB1*RIN*RM1*RT1 + C1*C2*L1*L2*R4*R5*RIN*RM1*RT1
    + C1*C2*L1*L2*R4*R5*RB2*RM1*RT1 + C1*C2*L1*L2*R4*R5*RB1*RM1*RT1
    + C1*C2*L1*L2*R4*R5*RB2*RIN*RT1 + C1*C2*L1*L2*R4*R5*RB1*RIN*RT1
    + C1*C2*L1*L2*R4*R5*RB2*RIN*RM2 + C1*C2*L1*L2*R4*R5*RB1*RIN*RM2
    + C1*C2*L1*L2*R4*R5*RB2*RIN*RM1 + C1*C2*L1*L2*R4*R5*RB1*RIN*RM1;

  const denAIm = C1*C2*L2*RB2*RIN*RM1*RM2*RT1*RT2 + C1*C2*L2*RB1*RIN*RM1*RM2*RT1*RT2
    + C1*C2*L2*R5*RIN*RM1*RM2*RT1*RT2 + C1*C2*L2*R4*RIN*RM1*RM2*RT1*RT2
    + C1*C2*L2*R5*RB2*RM1*RM2*RT1*RT2 + C1*C2*L2*R4*RB2*RM1*RM2*RT1*RT2
    + C1*C2*L2*R5*RB1*RM1*RM2*RT1*RT2 + C1*C2*L2*R4*RB1*RM1*RM2*RT1*RT2
    + C1*C2*L1*RB1*RB2*RIN*RM2*RT1*RT2 + C1*C2*L2*R4*RB2*RIN*RM2*RT1*RT2
    + C1*C2*L1*R4*RB2*RIN*RM2*RT1*RT2 + C1*C2*L1*R5*RB1*RIN*RM2*RT1*RT2
    + C1*C2*L2*R4*RB1*RIN*RM2*RT1*RT2 + C1*C2*L2*R4*R5*RIN*RM2*RT1*RT2
    + C1*C2*L1*R4*R5*RIN*RM2*RT1*RT2 + C1*C2*L1*R5*RB1*RB2*RM2*RT1*RT2
    + C1*C2*L1*R4*RB1*RB2*RM2*RT1*RT2 + C1*C2*L2*R4*R5*RB2*RM2*RT1*RT2
    + C1*C2*L1*R4*R5*RB2*RM2*RT1*RT2 + C1*C2*L2*R4*R5*RB1*RM2*RT1*RT2
    + C1*C2*L1*R4*R5*RB1*RM2*RT1*RT2 + C1*C2*L1*RB1*RB2*RIN*RM1*RT1*RT2
    + C1*C2*L2*R5*RB2*RIN*RM1*RT1*RT2 + C1*C2*L1*R4*RB2*RIN*RM1*RT1*RT2
    + C1*C2*L2*R5*RB1*RIN*RM1*RT1*RT2 + C1*C2*L1*R5*RB1*RIN*RM1*RT1*RT2
    + C1*C2*L2*R4*R5*RIN*RM1*RT1*RT2 + C1*C2*L1*R4*R5*RIN*RM1*RT1*RT2
    + C1*C2*L1*R5*RB1*RB2*RM1*RT1*RT2 + C1*C2*L1*R4*RB1*RB2*RM1*RT1*RT2
    + C1*C2*L2*R4*R5*RB2*RM1*RT1*RT2 + C1*C2*L1*R4*R5*RB2*RM1*RT1*RT2
    + C1*C2*L2*R4*R5*RB1*RM1*RT1*RT2 + C1*C2*L1*R4*R5*RB1*RM1*RT1*RT2
    + C1*C2*L1*R5*RB1*RB2*RIN*RT1*RT2 + C1*C2*L1*R4*RB1*RB2*RIN*RT1*RT2
    + C1*C2*L2*R4*R5*RB2*RIN*RT1*RT2 + C1*C2*L1*R4*R5*RB2*RIN*RT1*RT2
    + C1*C2*L2*R4*R5*RB1*RIN*RT1*RT2 + C1*C2*L1*R4*R5*RB1*RIN*RT1*RT2
    + C1*C2*L2*R4*RB2*RIN*RM1*RM2*RT2 + C1*C2*L2*R4*RB1*RIN*RM1*RM2*RT2
    + C1*C2*L2*R4*R5*RIN*RM1*RM2*RT2 + C1*C2*L2*R4*R5*RB2*RM1*RM2*RT2
    + C1*C2*L2*R4*R5*RB1*RM1*RM2*RT2 + C1*C2*L1*R4*RB1*RB2*RIN*RM2*RT2
    + C1*L1*L2*RB2*RIN*RM2*RT2 + C1*C2*L1*R4*R5*RB1*RIN*RM2*RT2
    + C1*L1*L2*RB1*RIN*RM2*RT2 + C1*L1*L2*R5*RIN*RM2*RT2 + C1*L1*L2*R4*RIN*RM2*RT2
    + C1*C2*L1*R4*R5*RB1*RB2*RM2*RT2 + C1*L1*L2*R5*RB2*RM2*RT2
    + C1*L1*L2*R4*RB2*RM2*RT2 + C1*L1*L2*R5*RB1*RM2*RT2 + C1*L1*L2*R4*RB1*RM2*RT2
    + C1*C2*L1*R4*RB1*RB2*RIN*RM1*RT2 + C1*C2*L2*R4*R5*RB2*RIN*RM1*RT2
    + C1*L1*L2*RB2*RIN*RM1*RT2 + C1*C2*L2*R4*R5*RB1*RIN*RM1*RT2
    + C1*C2*L1*R4*R5*RB1*RIN*RM1*RT2 + C1*L1*L2*RB1*RIN*RM1*RT2
    + C1*L1*L2*R5*RIN*RM1*RT2 + C1*L1*L2*R4*RIN*RM1*RT2
    + C1*C2*L1*R4*R5*RB1*RB2*RM1*RT2 + C1*L1*L2*R5*RB2*RM1*RT2
    + C1*L1*L2*R4*RB2*RM1*RT2 + C1*L1*L2*R5*RB1*RM1*RT2 + C1*L1*L2*R4*RB1*RM1*RT2
    + C1*C2*L1*R4*R5*RB1*RB2*RIN*RT2 + C1*L1*L2*R5*RB2*RIN*RT2
    + C1*L1*L2*R4*RB2*RIN*RT2 + C1*L1*L2*R5*RB1*RIN*RT2 + C1*L1*L2*R4*RB1*RIN*RT2
    + C1*C2*L2*R5*RB2*RIN*RM1*RM2*RT1 + C1*C2*L2*R5*RB1*RIN*RM1*RM2*RT1
    + C1*C2*L2*R4*R5*RIN*RM1*RM2*RT1 + C1*C2*L2*R4*R5*RB2*RM1*RM2*RT1
    + C1*C2*L2*R4*R5*RB1*RM1*RM2*RT1 + C1*C2*L1*R5*RB1*RB2*RIN*RM2*RT1
    + C1*C2*L2*R4*R5*RB2*RIN*RM2*RT1 + C1*C2*L1*R4*R5*RB2*RIN*RM2*RT1
    + C1*L1*L2*RB2*RIN*RM2*RT1 + C1*C2*L2*R4*R5*RB1*RIN*RM2*RT1
    + C1*L1*L2*RB1*RIN*RM2*RT1 + C1*L1*L2*R5*RIN*RM2*RT1 + C1*L1*L2*R4*RIN*RM2*RT1
    + C1*C2*L1*R4*R5*RB1*RB2*RM2*RT1 + C1*L1*L2*R5*RB2*RM2*RT1
    + C1*L1*L2*R4*RB2*RM2*RT1 + C1*L1*L2*R5*RB1*RM2*RT1 + C1*L1*L2*R4*RB1*RM2*RT1
    + C1*C2*L1*R5*RB1*RB2*RIN*RM1*RT1 + C1*C2*L1*R4*R5*RB2*RIN*RM1*RT1
    + C1*L1*L2*RB2*RIN*RM1*RT1 + C1*L1*L2*RB1*RIN*RM1*RT1
    + C1*L1*L2*R5*RIN*RM1*RT1 + C1*L1*L2*R4*RIN*RM1*RT1
    + C1*C2*L1*R4*R5*RB1*RB2*RM1*RT1 + C1*L1*L2*R5*RB2*RM1*RT1
    + C1*L1*L2*R4*RB2*RM1*RT1 + C1*L1*L2*R5*RB1*RM1*RT1 + C1*L1*L2*R4*RB1*RM1*RT1
    + C1*C2*L1*R4*R5*RB1*RB2*RIN*RT1 + C1*L1*L2*R5*RB2*RIN*RT1
    + C1*L1*L2*R4*RB2*RIN*RT1 + C1*L1*L2*R5*RB1*RIN*RT1 + C1*L1*L2*R4*RB1*RIN*RT1
    + C1*C2*L2*R4*R5*RB2*RIN*RM1*RM2 + C1*C2*L2*R4*R5*RB1*RIN*RM1*RM2
    + C1*C2*L1*R4*R5*RB1*RB2*RIN*RM2 + C1*L1*L2*R5*RB2*RIN*RM2
    + C1*L1*L2*R4*RB2*RIN*RM2 + C1*L1*L2*R5*RB1*RIN*RM2 + C1*L1*L2*R4*RB1*RIN*RM2
    + C1*C2*L1*R4*R5*RB1*RB2*RIN*RM1 + C1*L1*L2*R5*RB2*RIN*RM1
    + C1*L1*L2*R4*RB2*RIN*RM1 + C1*L1*L2*R5*RB1*RIN*RM1 + C1*L1*L2*R4*RB1*RIN*RM1;

  const denBRe = C1*C2*RB1*RB2*RIN*RM1*RM2*RT1*RT2 + C1*C2*R4*RB2*RIN*RM1*RM2*RT1*RT2
    + C1*C2*R5*RB1*RIN*RM1*RM2*RT1*RT2 + C1*C2*R4*R5*RIN*RM1*RM2*RT1*RT2
    + C1*C2*R5*RB1*RB2*RM1*RM2*RT1*RT2 + C1*C2*R4*RB1*RB2*RM1*RM2*RT1*RT2
    + C1*C2*R4*R5*RB2*RM1*RM2*RT1*RT2 + C1*C2*R4*R5*RB1*RM1*RM2*RT1*RT2
    + C1*C2*R4*RB1*RB2*RIN*RM2*RT1*RT2 + C2*L2*RB2*RIN*RM2*RT1*RT2
    + C1*C2*R4*R5*RB1*RIN*RM2*RT1*RT2 + C2*L2*RB1*RIN*RM2*RT1*RT2
    + C2*L2*R5*RIN*RM2*RT1*RT2 + C2*L2*R4*RIN*RM2*RT1*RT2
    + C1*C2*R4*R5*RB1*RB2*RM2*RT1*RT2 + C2*L2*R5*RB2*RM2*RT1*RT2
    + C2*L2*R4*RB2*RM2*RT1*RT2 + C2*L2*R5*RB1*RM2*RT1*RT2
    + C2*L2*R4*RB1*RM2*RT1*RT2 + C1*C2*R5*RB1*RB2*RIN*RM1*RT1*RT2
    + C1*C2*R4*R5*RB2*RIN*RM1*RT1*RT2 + C2*L2*RB2*RIN*RM1*RT1*RT2
    + C2*L2*RB1*RIN*RM1*RT1*RT2 + C2*L2*R5*RIN*RM1*RT1*RT2
    + C2*L2*R4*RIN*RM1*RT1*RT2 + C1*C2*R4*R5*RB1*RB2*RM1*RT1*RT2
    + C2*L2*R5*RB2*RM1*RT1*RT2 + C2*L2*R4*RB2*RM1*RT1*RT2
    + C2*L2*R5*RB1*RM1*RT1*RT2 + C2*L2*R4*RB1*RM1*RT1*RT2
    + C1*C2*R4*R5*RB1*RB2*RIN*RT1*RT2 + C2*L2*R5*RB2*RIN*RT1*RT2
    + C2*L2*R4*RB2*RIN*RT1*RT2 + C2*L2*R5*RB1*RIN*RT1*RT2
    + C2*L2*R4*RB1*RIN*RT1*RT2 + C1*C2*R4*RB1*RB2*RIN*RM1*RM2*RT2
    + C1*L2*RB2*RIN*RM1*RM2*RT2 + C1*C2*R4*R5*RB1*RIN*RM1*RM2*RT2
    + C1*L2*RB1*RIN*RM1*RM2*RT2 + C1*L2*R5*RIN*RM1*RM2*RT2
    + C1*L2*R4*RIN*RM1*RM2*RT2 + C1*C2*R4*R5*RB1*RB2*RM1*RM2*RT2
    + C1*L2*R5*RB2*RM1*RM2*RT2 + C1*L2*R4*RB2*RM1*RM2*RT2
    + C1*L2*R5*RB1*RM1*RM2*RT2 + C1*L2*R4*RB1*RM1*RM2*RT2
    + C1*L1*RB1*RB2*RIN*RM2*RT2 + C2*L2*R4*RB2*RIN*RM2*RT2
    + C1*L2*R4*RB2*RIN*RM2*RT2 + C1*L1*R4*RB2*RIN*RM2*RT2
    + C1*L1*R5*RB1*RIN*RM2*RT2 + C2*L2*R4*RB1*RIN*RM2*RT2
    + C1*L2*R4*RB1*RIN*RM2*RT2 + C2*L2*R4*R5*RIN*RM2*RT2 + C1*L2*R4*R5*RIN*RM2*RT2
    + C1*L1*R4*R5*RIN*RM2*RT2 + C1*L1*R5*RB1*RB2*RM2*RT2
    + C1*L1*R4*RB1*RB2*RM2*RT2 + C2*L2*R4*R5*RB2*RM2*RT2 + C1*L2*R4*R5*RB2*RM2*RT2
    + C1*L1*R4*R5*RB2*RM2*RT2 + C2*L2*R4*R5*RB1*RM2*RT2 + C1*L2*R4*R5*RB1*RM2*RT2
    + C1*L1*R4*R5*RB1*RM2*RT2 + C1*C2*R4*R5*RB1*RB2*RIN*RM1*RT2
    + C1*L1*RB1*RB2*RIN*RM1*RT2 + C1*L2*R5*RB2*RIN*RM1*RT2
    + C2*L2*R4*RB2*RIN*RM1*RT2 + C1*L1*R4*RB2*RIN*RM1*RT2
    + C1*L2*R5*RB1*RIN*RM1*RT2 + C1*L1*R5*RB1*RIN*RM1*RT2
    + C2*L2*R4*RB1*RIN*RM1*RT2 + C2*L2*R4*R5*RIN*RM1*RT2 + C1*L2*R4*R5*RIN*RM1*RT2
    + C1*L1*R4*R5*RIN*RM1*RT2 + C1*L1*R5*RB1*RB2*RM1*RT2
    + C1*L1*R4*RB1*RB2*RM1*RT2 + C2*L2*R4*R5*RB2*RM1*RT2 + C1*L2*R4*R5*RB2*RM1*RT2
    + C1*L1*R4*R5*RB2*RM1*RT2 + C2*L2*R4*R5*RB1*RM1*RT2 + C1*L2*R4*R5*RB1*RM1*RT2
    + C1*L1*R4*R5*RB1*RM1*RT2 + C1*L1*R5*RB1*RB2*RIN*RT2
    + C1*L1*R4*RB1*RB2*RIN*RT2 + C2*L2*R4*R5*RB2*RIN*RT2 + C1*L2*R4*R5*RB2*RIN*RT2
    + C1*L1*R4*R5*RB2*RIN*RT2 + C2*L2*R4*R5*RB1*RIN*RT2 + C1*L2*R4*R5*RB1*RIN*RT2
    + C1*L1*R4*R5*RB1*RIN*RT2 + C1*C2*R5*RB1*RB2*RIN*RM1*RM2*RT1
    + C1*C2*R4*R5*RB2*RIN*RM1*RM2*RT1 + C1*L2*RB2*RIN*RM1*RM2*RT1
    + C1*L2*RB1*RIN*RM1*RM2*RT1 + C1*L2*R5*RIN*RM1*RM2*RT1
    + C1*L2*R4*RIN*RM1*RM2*RT1 + C1*C2*R4*R5*RB1*RB2*RM1*RM2*RT1
    + C1*L2*R5*RB2*RM1*RM2*RT1 + C1*L2*R4*RB2*RM1*RM2*RT1
    + C1*L2*R5*RB1*RM1*RM2*RT1 + C1*L2*R4*RB1*RM1*RM2*RT1
    + C1*C2*R4*R5*RB1*RB2*RIN*RM2*RT1 + C1*L1*RB1*RB2*RIN*RM2*RT1
    + C2*L2*R5*RB2*RIN*RM2*RT1 + C1*L2*R4*RB2*RIN*RM2*RT1
    + C1*L1*R4*RB2*RIN*RM2*RT1 + C2*L2*R5*RB1*RIN*RM2*RT1
    + C1*L1*R5*RB1*RIN*RM2*RT1 + C1*L2*R4*RB1*RIN*RM2*RT1
    + C2*L2*R4*R5*RIN*RM2*RT1 + C1*L2*R4*R5*RIN*RM2*RT1 + C1*L1*R4*R5*RIN*RM2*RT1
    + C1*L1*R5*RB1*RB2*RM2*RT1 + C1*L1*R4*RB1*RB2*RM2*RT1
    + C2*L2*R4*R5*RB2*RM2*RT1 + C1*L2*R4*R5*RB2*RM2*RT1 + C1*L1*R4*R5*RB2*RM2*RT1
    + C2*L2*R4*R5*RB1*RM2*RT1 + C1*L2*R4*R5*RB1*RM2*RT1 + C1*L1*R4*R5*RB1*RM2*RT1
    + C1*L1*RB1*RB2*RIN*RM1*RT1 + C2*L2*R5*RB2*RIN*RM1*RT1
    + C1*L2*R5*RB2*RIN*RM1*RT1 + C1*L1*R4*RB2*RIN*RM1*RT1
    + C2*L2*R5*RB1*RIN*RM1*RT1 + C1*L2*R5*RB1*RIN*RM1*RT1
    + C1*L1*R5*RB1*RIN*RM1*RT1 + C2*L2*R4*R5*RIN*RM1*RT1 + C1*L2*R4*R5*RIN*RM1*RT1
    + C1*L1*R4*R5*RIN*RM1*RT1 + C1*L1*R5*RB1*RB2*RM1*RT1
    + C1*L1*R4*RB1*RB2*RM1*RT1 + C2*L2*R4*R5*RB2*RM1*RT1 + C1*L2*R4*R5*RB2*RM1*RT1
    + C1*L1*R4*R5*RB2*RM1*RT1 + C2*L2*R4*R5*RB1*RM1*RT1 + C1*L2*R4*R5*RB1*RM1*RT1
    + C1*L1*R4*R5*RB1*RM1*RT1 + C1*L1*R5*RB1*RB2*RIN*RT1
    + C1*L1*R4*RB1*RB2*RIN*RT1 + C2*L2*R4*R5*RB2*RIN*RT1 + C1*L2*R4*R5*RB2*RIN*RT1
    + C1*L1*R4*R5*RB2*RIN*RT1 + C2*L2*R4*R5*RB1*RIN*RT1 + C1*L2*R4*R5*RB1*RIN*RT1
    + C1*L1*R4*R5*RB1*RIN*RT1 + C1*C2*R4*R5*RB1*RB2*RIN*RM1*RM2
    + C1*L2*R5*RB2*RIN*RM1*RM2 + C1*L2*R4*RB2*RIN*RM1*RM2
    + C1*L2*R5*RB1*RIN*RM1*RM2 + C1*L2*R4*RB1*RIN*RM1*RM2
    + C1*L1*R5*RB1*RB2*RIN*RM2 + C1*L1*R4*RB1*RB2*RIN*RM2
    + C2*L2*R4*R5*RB2*RIN*RM2 + C1*L2*R4*R5*RB2*RIN*RM2 + C1*L1*R4*R5*RB2*RIN*RM2
    + C2*L2*R4*R5*RB1*RIN*RM2 + C1*L2*R4*R5*RB1*RIN*RM2 + C1*L1*R4*R5*RB1*RIN*RM2
    + C1*L1*R5*RB1*RB2*RIN*RM1 + C1*L1*R4*RB1*RB2*RIN*RM1
    + C2*L2*R4*R5*RB2*RIN*RM1 + C1*L2*R4*R5*RB2*RIN*RM1 + C1*L1*R4*R5*RB2*RIN*RM1
    + C2*L2*R4*R5*RB1*RIN*RM1 + C1*L2*R4*R5*RB1*RIN*RM1 + C1*L1*R4*R5*RB1*RIN*RM1;

  const denCIm = C2*RB1*RB2*RIN*RM2*RT1*RT2 + C2*R4*RB2*RIN*RM2*RT1*RT2
    + C2*R5*RB1*RIN*RM2*RT1*RT2 + C2*R4*R5*RIN*RM2*RT1*RT2
    + C2*R5*RB1*RB2*RM2*RT1*RT2 + C2*R4*RB1*RB2*RM2*RT1*RT2
    + C2*R4*R5*RB2*RM2*RT1*RT2 + C2*R4*R5*RB1*RM2*RT1*RT2
    + C2*RB1*RB2*RIN*RM1*RT1*RT2 + C2*R4*RB2*RIN*RM1*RT1*RT2
    + C2*R5*RB1*RIN*RM1*RT1*RT2 + C2*R4*R5*RIN*RM1*RT1*RT2
    + C2*R5*RB1*RB2*RM1*RT1*RT2 + C2*R4*RB1*RB2*RM1*RT1*RT2
    + C2*R4*R5*RB2*RM1*RT1*RT2 + C2*R4*R5*RB1*RM1*RT1*RT2
    + C2*R5*RB1*RB2*RIN*RT1*RT2 + C2*R4*RB1*RB2*RIN*RT1*RT2
    + C2*R4*R5*RB2*RIN*RT1*RT2 + C2*R4*R5*RB1*RIN*RT1*RT2
    + C1*RB1*RB2*RIN*RM1*RM2*RT2 + C1*R4*RB2*RIN*RM1*RM2*RT2
    + C1*R5*RB1*RIN*RM1*RM2*RT2 + C1*R4*R5*RIN*RM1*RM2*RT2
    + C1*R5*RB1*RB2*RM1*RM2*RT2 + C1*R4*RB1*RB2*RM1*RM2*RT2
    + C1*R4*R5*RB2*RM1*RM2*RT2 + C1*R4*R5*RB1*RM1*RM2*RT2
    + C2*R4*RB1*RB2*RIN*RM2*RT2 + C1*R4*RB1*RB2*RIN*RM2*RT2 + L2*RB2*RIN*RM2*RT2
    + C2*R4*R5*RB1*RIN*RM2*RT2 + C1*R4*R5*RB1*RIN*RM2*RT2 + L2*RB1*RIN*RM2*RT2
    + L2*R5*RIN*RM2*RT2 + L2*R4*RIN*RM2*RT2 + C2*R4*R5*RB1*RB2*RM2*RT2
    + C1*R4*R5*RB1*RB2*RM2*RT2 + L2*R5*RB2*RM2*RT2 + L2*R4*RB2*RM2*RT2
    + L2*R5*RB1*RM2*RT2 + L2*R4*RB1*RM2*RT2 + C1*R5*RB1*RB2*RIN*RM1*RT2
    + C2*R4*RB1*RB2*RIN*RM1*RT2 + C1*R4*R5*RB2*RIN*RM1*RT2 + L2*RB2*RIN*RM1*RT2
    + C2*R4*R5*RB1*RIN*RM1*RT2 + L2*RB1*RIN*RM1*RT2 + L2*R5*RIN*RM1*RT2
    + L2*R4*RIN*RM1*RT2 + C2*R4*R5*RB1*RB2*RM1*RT2 + C1*R4*R5*RB1*RB2*RM1*RT2
    + L2*R5*RB2*RM1*RT2 + L2*R4*RB2*RM1*RT2 + L2*R5*RB1*RM1*RT2
    + L2*R4*RB1*RM1*RT2 + C2*R4*R5*RB1*RB2*RIN*RT2 + C1*R4*R5*RB1*RB2*RIN*RT2
    + L2*R5*RB2*RIN*RT2 + L2*R4*RB2*RIN*RT2 + L2*R5*RB1*RIN*RT2
    + L2*R4*RB1*RIN*RT2 + C1*RB1*RB2*RIN*RM1*RM2*RT1 + C1*R4*RB2*RIN*RM1*RM2*RT1
    + C1*R5*RB1*RIN*RM1*RM2*RT1 + C1*R4*R5*RIN*RM1*RM2*RT1
    + C1*R5*RB1*RB2*RM1*RM2*RT1 + C1*R4*RB1*RB2*RM1*RM2*RT1
    + C1*R4*R5*RB2*RM1*RM2*RT1 + C1*R4*R5*RB1*RM1*RM2*RT1
    + C2*R5*RB1*RB2*RIN*RM2*RT1 + C1*R4*RB1*RB2*RIN*RM2*RT1
    + C2*R4*R5*RB2*RIN*RM2*RT1 + L2*RB2*RIN*RM2*RT1 + C1*R4*R5*RB1*RIN*RM2*RT1
    + L2*RB1*RIN*RM2*RT1 + L2*R5*RIN*RM2*RT1 + L2*R4*RIN*RM2*RT1
    + C2*R4*R5*RB1*RB2*RM2*RT1 + C1*R4*R5*RB1*RB2*RM2*RT1 + L2*R5*RB2*RM2*RT1
    + L2*R4*RB2*RM2*RT1 + L2*R5*RB1*RM2*RT1 + L2*R4*RB1*RM2*RT1
    + C2*R5*RB1*RB2*RIN*RM1*RT1 + C1*R5*RB1*RB2*RIN*RM1*RT1
    + C2*R4*R5*RB2*RIN*RM1*RT1 + C1*R4*R5*RB2*RIN*RM1*RT1 + L2*RB2*RIN*RM1*RT1
    + L2*RB1*RIN*RM1*RT1 + L2*R5*RIN*RM1*RT1 + L2*R4*RIN*RM1*RT1
    + C2*R4*R5*RB1*RB2*RM1*RT1 + C1*R4*R5*RB1*RB2*RM1*RT1 + L2*R5*RB2*RM1*RT1
    + L2*R4*RB2*RM1*RT1 + L2*R5*RB1*RM1*RT1 + L2*R4*RB1*RM1*RT1
    + C2*R4*R5*RB1*RB2*RIN*RT1 + C1*R4*R5*RB1*RB2*RIN*RT1 + L2*R5*RB2*RIN*RT1
    + L2*R4*RB2*RIN*RT1 + L2*R5*RB1*RIN*RT1 + L2*R4*RB1*RIN*RT1
    + C1*R5*RB1*RB2*RIN*RM1*RM2 + C1*R4*RB1*RB2*RIN*RM1*RM2
    + C1*R4*R5*RB2*RIN*RM1*RM2 + C1*R4*R5*RB1*RIN*RM1*RM2
    + C2*R4*R5*RB1*RB2*RIN*RM2 + C1*R4*R5*RB1*RB2*RIN*RM2 + L2*R5*RB2*RIN*RM2
    + L2*R4*RB2*RIN*RM2 + L2*R5*RB1*RIN*RM2 + L2*R4*RB1*RIN*RM2
    + C2*R4*R5*RB1*RB2*RIN*RM1 + C1*R4*R5*RB1*RB2*RIN*RM1 + L2*R5*RB2*RIN*RM1
    + L2*R4*RB2*RIN*RM1 + L2*R5*RB1*RIN*RM1 + L2*R4*RB1*RIN*RM1;

  const denDRe = RB1*RB2*RIN*RM2*RT2 + R4*RB2*RIN*RM2*RT2 + R5*RB1*RIN*RM2*RT2
    + R4*R5*RIN*RM2*RT2 + R5*RB1*RB2*RM2*RT2 + R4*RB1*RB2*RM2*RT2
    + R4*R5*RB2*RM2*RT2 + R4*R5*RB1*RM2*RT2 + RB1*RB2*RIN*RM1*RT2
    + R4*RB2*RIN*RM1*RT2 + R5*RB1*RIN*RM1*RT2 + R4*R5*RIN*RM1*RT2
    + R5*RB1*RB2*RM1*RT2 + R4*RB1*RB2*RM1*RT2 + R4*R5*RB2*RM1*RT2
    + R4*R5*RB1*RM1*RT2 + R5*RB1*RB2*RIN*RT2 + R4*RB1*RB2*RIN*RT2
    + R4*R5*RB2*RIN*RT2 + R4*R5*RB1*RIN*RT2 + RB1*RB2*RIN*RM2*RT1
    + R4*RB2*RIN*RM2*RT1 + R5*RB1*RIN*RM2*RT1 + R4*R5*RIN*RM2*RT1
    + R5*RB1*RB2*RM2*RT1 + R4*RB1*RB2*RM2*RT1 + R4*R5*RB2*RM2*RT1
    + R4*R5*RB1*RM2*RT1 + RB1*RB2*RIN*RM1*RT1 + R4*RB2*RIN*RM1*RT1
    + R5*RB1*RIN*RM1*RT1 + R4*R5*RIN*RM1*RT1 + R5*RB1*RB2*RM1*RT1
    + R4*RB1*RB2*RM1*RT1 + R4*R5*RB2*RM1*RT1 + R4*R5*RB1*RM1*RT1
    + R5*RB1*RB2*RIN*RT1 + R4*RB1*RB2*RIN*RT1 + R4*R5*RB2*RIN*RT1
    + R4*R5*RB1*RIN*RT1 + R5*RB1*RB2*RIN*RM2 + R4*RB1*RB2*RIN*RM2
    + R4*R5*RB2*RIN*RM2 + R4*R5*RB1*RIN*RM2 + R5*RB1*RB2*RIN*RM1
    + R4*RB1*RB2*RIN*RM1 + R4*R5*RB2*RIN*RM1 + R4*R5*RB1*RIN*RM1;

  // Transfer function numerator coefficients
  const numXRe = C1*C2*L1*L2*R5*RB2*RM2*RT1*RT2 + C1*C2*L1*L2*R5*RB1*RM2*RT1*RT2
    + C1*C2*L1*L2*R5*RB2*RM1*RT1*RT2 + C1*C2*L1*L2*R5*RB1*RM1*RT1*RT2
    + C1*C2*L1*L2*R4*R5*RB2*RM2*RT2 + C1*C2*L1*L2*R4*R5*RB1*RM2*RT2
    + C1*C2*L1*L2*R4*R5*RB2*RM1*RT2 + C1*C2*L1*L2*R4*R5*RB1*RM1*RT2;

  const numAIm = C1*C2*L2*R5*RB2*RM1*RM2*RT1*RT2 + C1*C2*L2*R5*RB1*RM1*RM2*RT1*RT2
    + C1*C2*L1*R5*RB1*RB2*RM2*RT1*RT2 + C1*C2*L2*R4*R5*RB2*RM2*RT1*RT2
    + C1*C2*L1*R4*R5*RB2*RM2*RT1*RT2 + C1*C2*L2*R4*R5*RB1*RM2*RT1*RT2
    + C1*C2*L1*R5*RB1*RB2*RM1*RT1*RT2 + C1*C2*L1*R4*R5*RB2*RM1*RT1*RT2
    + C1*C2*L2*R4*R5*RB2*RM1*RM2*RT2 + C1*C2*L2*R4*R5*RB1*RM1*RM2*RT2
    + C1*C2*L1*R4*R5*RB1*RB2*RM2*RT2 + C1*L1*L2*R5*RB2*RM2*RT2
    + C1*L1*L2*R5*RB1*RM2*RT2 + C1*C2*L1*R4*R5*RB1*RB2*RM1*RT2
    + C1*L1*L2*R5*RB2*RM1*RT2 + C1*L1*L2*R5*RB1*RM1*RT2 + C1*L1*L2*R5*RB2*RM2*RT1
    + C1*L1*L2*R5*RB1*RM2*RT1 + C1*L1*L2*R5*RB2*RM1*RT1 + C1*L1*L2*R5*RB1*RM1*RT1;

  const numBRe = C1*C2*R5*RB1*RB2*RM1*RM2*RT1*RT2 + C1*C2*R4*R5*RB2*RM1*RM2*RT1*RT2
    + C1*C2*R4*R5*RB1*RB2*RM2*RT1*RT2 + C2*L2*R5*RB2*RM2*RT1*RT2
    + C2*L2*R5*RB1*RM2*RT1*RT2 + C2*L2*R5*RB2*RM1*RT1*RT2
    + C2*L2*R5*RB1*RM1*RT1*RT2 + C1*C2*R4*R5*RB1*RB2*RM1*RM2*RT2
    + C1*L2*R5*RB2*RM1*RM2*RT2 + C1*L2*R5*RB1*RM1*RM2*RT2
    + C1*L1*R5*RB1*RB2*RM2*RT2 + C2*L2*R4*R5*RB2*RM2*RT2 + C1*L2*R4*R5*RB2*RM2*RT2
    + C1*L1*R4*R5*RB2*RM2*RT2 + C2*L2*R4*R5*RB1*RM2*RT2 + C1*L2*R4*R5*RB1*RM2*RT2
    + C1*L1*R5*RB1*RB2*RM1*RT2 + C2*L2*R4*R5*RB2*RM1*RT2 + C1*L1*R4*R5*RB2*RM1*RT2
    + C2*L2*R4*R5*RB1*RM1*RT2 + C1*L2*R5*RB2*RM1*RM2*RT1
    + C1*L2*R5*RB1*RM1*RM2*RT1 + C1*L1*R5*RB1*RB2*RM2*RT1
    + C1*L2*R4*R5*RB2*RM2*RT1 + C1*L1*R4*R5*RB2*RM2*RT1 + C1*L2*R4*R5*RB1*RM2*RT1
    + C1*L1*R5*RB1*RB2*RM1*RT1 + C1*L1*R4*R5*RB2*RM1*RT1;

  const numCIm = C2*R5*RB1*RB2*RM2*RT1*RT2 + C2*R4*R5*RB2*RM2*RT1*RT2
    + C2*R5*RB1*RB2*RM1*RT1*RT2 + C2*R4*R5*RB2*RM1*RT1*RT2
    + C1*R5*RB1*RB2*RM1*RM2*RT2 + C1*R4*R5*RB2*RM1*RM2*RT2
    + C2*R4*R5*RB1*RB2*RM2*RT2 + C1*R4*R5*RB1*RB2*RM2*RT2 + L2*R5*RB2*RM2*RT2
    + L2*R5*RB1*RM2*RT2 + C2*R4*R5*RB1*RB2*RM1*RT2 + L2*R5*RB2*RM1*RT2
    + L2*R5*RB1*RM1*RT2 + C1*R5*RB1*RB2*RM1*RM2*RT1 + C1*R4*R5*RB2*RM1*RM2*RT1
    + C1*R4*R5*RB1*RB2*RM2*RT1 + L2*R5*RB2*RM2*RT1 + L2*R5*RB1*RM2*RT1
    + L2*R5*RB2*RM1*RT1 + L2*R5*RB1*RM1*RT1;

  const numDRe = R5*RB1*RB2*RM2*RT2 + R4*R5*RB2*RM2*RT2 + R5*RB1*RB2*RM1*RT2
    + R4*R5*RB2*RM1*RT2 + R5*RB1*RB2*RM2*RT1 + R4*R5*RB2*RM2*RT1
    + R5*RB1*RB2*RM1*RT1 + R4*R5*RB2*RM1*RT1;

  return [
    [numDRe, numCIm, numBRe, numAIm, numXRe],
    [denDRe, denCIm, denBRe, denAIm, denXRe]
  ];
});