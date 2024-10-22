import { Deluxe5E3Bright } from './Deluxe5E3Bright';
import { testTonestack } from '../_testTonestack';

testTonestack(Deluxe5E3Bright, function (controlValues) {
  const {
    RINN, RINB, RL, C1, C2, C3, C4, RT2, RT1, RVN1, RVN2, RVB2, RVB1
  } = this.extractCoefficientVariables(controlValues);

  const b0 = 0;
  const b1 = C1*RL*RVB2*RVN2 + C1*RL*RVB2*RVN1;
  const b2 = C1*C2*RINN*RL*RVB2*RVN2 + C1*C2*RINN*RL*RVB2*RVN1 + C1*C2*RL*RVB2*RVN2*RVN1 + C1*C3*RL*RT1*RVB2*RVN2 + C1*C3*RL*RT1*RVB2*RVN1 + C1*C3*RL*RVB1*RVB2*RVN2 + C1*C3*RL*RVB1*RVB2*RVN1 + C1*C4*RL*RT2*RVB2*RVN2 + C1*C4*RL*RT2*RVB2*RVN1;
  const b3 = C1*C2*C3*RINN*RL*RT1*RVB2*RVN2 + C1*C2*C3*RINN*RL*RT1*RVB2*RVN1 + C1*C2*C3*RINN*RL*RVB1*RVB2*RVN2 + C1*C2*C3*RINN*RL*RVB1*RVB2*RVN1 + C1*C2*C3*RL*RT1*RVB2*RVN2*RVN1 + C1*C2*C3*RL*RVB1*RVB2*RVN2*RVN1 + C1*C2*C4*RINN*RL*RT2*RVB2*RVN2 + C1*C2*C4*RINN*RL*RT2*RVB2*RVN1 + C1*C2*C4*RL*RT2*RVB2*RVN2*RVN1 + C1*C3*C4*RL*RT1*RT2*RVB2*RVN2 + C1*C3*C4*RL*RT1*RT2*RVB2*RVN1 + C1*C3*C4*RL*RT2*RVB1*RVB2*RVN2 + C1*C3*C4*RL*RT2*RVB1*RVB2*RVN1;
  const b4 = C1*C2*C3*C4*RINN*RL*RT1*RT2*RVB2*RVN2 + C1*C2*C3*C4*RINN*RL*RT1*RT2*RVB2*RVN1 + C1*C2*C3*C4*RINN*RL*RT2*RVB1*RVB2*RVN2 + C1*C2*C3*C4*RINN*RL*RT2*RVB1*RVB2*RVN1 + C1*C2*C3*C4*RL*RT1*RT2*RVB2*RVN2*RVN1 + C1*C2*C3*C4*RL*RT2*RVB1*RVB2*RVN2*RVN1;

  const a0 = RL*RVB1 + RL*RVB2 + RL*RVN2 + RL*RVN1 + RVB1*RVN2 + RVB1*RVN1 + RVB2*RVN2 + RVB2*RVN1;
  const a1 = C1*RINB*RL*RVB1 + C1*RINB*RL*RVB2 + C1*RINB*RL*RVN2 + C1*RINB*RL*RVN1 + C1*RINB*RVB1*RVN2 + C1*RINB*RVB1*RVN1 + C1*RINB*RVB2*RVN2 + C1*RINB*RVB2*RVN1 + C1*RL*RVB1*RVB2 + C1*RL*RVB2*RVN2 + C1*RL*RVB2*RVN1 + C1*RVB1*RVB2*RVN2 + C1*RVB1*RVB2*RVN1 + C2*RINN*RL*RVB1 + C2*RINN*RL*RVB2 + C2*RINN*RL*RVN2 + C2*RINN*RL*RVN1 + C2*RINN*RVB1*RVN2 + C2*RINN*RVB1*RVN1 + C2*RINN*RVB2*RVN2 + C2*RINN*RVB2*RVN1 + C2*RL*RVB1*RVN2 + C2*RL*RVB2*RVN2 + C2*RL*RVN2*RVN1 + C2*RVB1*RVN2*RVN1 + C2*RVB2*RVN2*RVN1 + C3*RL*RT1*RVB1 + C3*RL*RT1*RVB2 + C3*RL*RT1*RVN2 + C3*RL*RT1*RVN1 + C3*RL*RVB1*RVB2 + C3*RL*RVB1*RVN2 + C3*RL*RVB1*RVN1 + C3*RT1*RVB1*RVN2 + C3*RT1*RVB1*RVN1 + C3*RT1*RVB2*RVN2 + C3*RT1*RVB2*RVN1 + C3*RVB1*RVB2*RVN2 + C3*RVB1*RVB2*RVN1 + C4*RL*RT2*RVB1 + C4*RL*RT2*RVB2 + C4*RL*RT2*RVN2 + C4*RL*RT2*RVN1 + C4*RL*RVB1*RVN2 + C4*RL*RVB1*RVN1 + C4*RL*RVB2*RVN2 + C4*RL*RVB2*RVN1 + C4*RT2*RVB1*RVN2 + C4*RT2*RVB1*RVN1 + C4*RT2*RVB2*RVN2 + C4*RT2*RVB2*RVN1;
  const a2 = C1*C2*RINB*RINN*RL*RVB1 + C1*C2*RINB*RINN*RL*RVB2 + C1*C2*RINB*RINN*RL*RVN2 + C1*C2*RINB*RINN*RL*RVN1 + C1*C2*RINB*RINN*RVB1*RVN2 + C1*C2*RINB*RINN*RVB1*RVN1 + C1*C2*RINB*RINN*RVB2*RVN2 + C1*C2*RINB*RINN*RVB2*RVN1 + C1*C2*RINB*RL*RVB1*RVN2 + C1*C2*RINB*RL*RVB2*RVN2 + C1*C2*RINB*RL*RVN2*RVN1 + C1*C2*RINB*RVB1*RVN2*RVN1 + C1*C2*RINB*RVB2*RVN2*RVN1 + C1*C2*RINN*RL*RVB1*RVB2 + C1*C2*RINN*RL*RVB2*RVN2 + C1*C2*RINN*RL*RVB2*RVN1 + C1*C2*RINN*RVB1*RVB2*RVN2 + C1*C2*RINN*RVB1*RVB2*RVN1 + C1*C2*RL*RVB1*RVB2*RVN2 + C1*C2*RL*RVB2*RVN2*RVN1 + C1*C2*RVB1*RVB2*RVN2*RVN1 + C1*C3*RINB*RL*RT1*RVB1 + C1*C3*RINB*RL*RT1*RVB2 + C1*C3*RINB*RL*RT1*RVN2 + C1*C3*RINB*RL*RT1*RVN1 + C1*C3*RINB*RL*RVB1*RVB2 + C1*C3*RINB*RL*RVB1*RVN2 + C1*C3*RINB*RL*RVB1*RVN1 + C1*C3*RINB*RT1*RVB1*RVN2 + C1*C3*RINB*RT1*RVB1*RVN1 + C1*C3*RINB*RT1*RVB2*RVN2 + C1*C3*RINB*RT1*RVB2*RVN1 + C1*C3*RINB*RVB1*RVB2*RVN2 + C1*C3*RINB*RVB1*RVB2*RVN1 + C1*C3*RL*RT1*RVB1*RVB2 + C1*C3*RL*RT1*RVB2*RVN2 + C1*C3*RL*RT1*RVB2*RVN1 + C1*C3*RL*RVB1*RVB2*RVN2 + C1*C3*RL*RVB1*RVB2*RVN1 + C1*C3*RT1*RVB1*RVB2*RVN2 + C1*C3*RT1*RVB1*RVB2*RVN1 + C1*C4*RINB*RL*RT2*RVB1 + C1*C4*RINB*RL*RT2*RVB2 + C1*C4*RINB*RL*RT2*RVN2 + C1*C4*RINB*RL*RT2*RVN1 + C1*C4*RINB*RL*RVB1*RVN2 + C1*C4*RINB*RL*RVB1*RVN1 + C1*C4*RINB*RL*RVB2*RVN2 + C1*C4*RINB*RL*RVB2*RVN1 + C1*C4*RINB*RT2*RVB1*RVN2 + C1*C4*RINB*RT2*RVB1*RVN1 + C1*C4*RINB*RT2*RVB2*RVN2 + C1*C4*RINB*RT2*RVB2*RVN1 + C1*C4*RL*RT2*RVB1*RVB2 + C1*C4*RL*RT2*RVB2*RVN2 + C1*C4*RL*RT2*RVB2*RVN1 + C1*C4*RL*RVB1*RVB2*RVN2 + C1*C4*RL*RVB1*RVB2*RVN1 + C1*C4*RT2*RVB1*RVB2*RVN2 + C1*C4*RT2*RVB1*RVB2*RVN1 + C2*C3*RINN*RL*RT1*RVB1 + C2*C3*RINN*RL*RT1*RVB2 + C2*C3*RINN*RL*RT1*RVN2 + C2*C3*RINN*RL*RT1*RVN1 + C2*C3*RINN*RL*RVB1*RVB2 + C2*C3*RINN*RL*RVB1*RVN2 + C2*C3*RINN*RL*RVB1*RVN1 + C2*C3*RINN*RT1*RVB1*RVN2 + C2*C3*RINN*RT1*RVB1*RVN1 + C2*C3*RINN*RT1*RVB2*RVN2 + C2*C3*RINN*RT1*RVB2*RVN1 + C2*C3*RINN*RVB1*RVB2*RVN2 + C2*C3*RINN*RVB1*RVB2*RVN1 + C2*C3*RL*RT1*RVB1*RVN2 + C2*C3*RL*RT1*RVB2*RVN2 + C2*C3*RL*RT1*RVN2*RVN1 + C2*C3*RL*RVB1*RVB2*RVN2 + C2*C3*RL*RVB1*RVN2*RVN1 + C2*C3*RT1*RVB1*RVN2*RVN1 + C2*C3*RT1*RVB2*RVN2*RVN1 + C2*C3*RVB1*RVB2*RVN2*RVN1 + C2*C4*RINN*RL*RT2*RVB1 + C2*C4*RINN*RL*RT2*RVB2 + C2*C4*RINN*RL*RT2*RVN2 + C2*C4*RINN*RL*RT2*RVN1 + C2*C4*RINN*RL*RVB1*RVN2 + C2*C4*RINN*RL*RVB1*RVN1 + C2*C4*RINN*RL*RVB2*RVN2 + C2*C4*RINN*RL*RVB2*RVN1 + C2*C4*RINN*RT2*RVB1*RVN2 + C2*C4*RINN*RT2*RVB1*RVN1 + C2*C4*RINN*RT2*RVB2*RVN2 + C2*C4*RINN*RT2*RVB2*RVN1 + C2*C4*RL*RT2*RVB1*RVN2 + C2*C4*RL*RT2*RVB2*RVN2 + C2*C4*RL*RT2*RVN2*RVN1 + C2*C4*RL*RVB1*RVN2*RVN1 + C2*C4*RL*RVB2*RVN2*RVN1 + C2*C4*RT2*RVB1*RVN2*RVN1 + C2*C4*RT2*RVB2*RVN2*RVN1 + C3*C4*RL*RT1*RT2*RVB1 + C3*C4*RL*RT1*RT2*RVB2 + C3*C4*RL*RT1*RT2*RVN2 + C3*C4*RL*RT1*RT2*RVN1 + C3*C4*RL*RT1*RVB1*RVN2 + C3*C4*RL*RT1*RVB1*RVN1 + C3*C4*RL*RT1*RVB2*RVN2 + C3*C4*RL*RT1*RVB2*RVN1 + C3*C4*RL*RT2*RVB1*RVB2 + C3*C4*RL*RT2*RVB1*RVN2 + C3*C4*RL*RT2*RVB1*RVN1 + C3*C4*RL*RVB1*RVB2*RVN2 + C3*C4*RL*RVB1*RVB2*RVN1 + C3*C4*RT1*RT2*RVB1*RVN2 + C3*C4*RT1*RT2*RVB1*RVN1 + C3*C4*RT1*RT2*RVB2*RVN2 + C3*C4*RT1*RT2*RVB2*RVN1 + C3*C4*RT2*RVB1*RVB2*RVN2 + C3*C4*RT2*RVB1*RVB2*RVN1;
  const a3 = C1*C2*C3*RINB*RINN*RL*RT1*RVB1 + C1*C2*C3*RINB*RINN*RL*RT1*RVB2 + C1*C2*C3*RINB*RINN*RL*RT1*RVN2 + C1*C2*C3*RINB*RINN*RL*RT1*RVN1 + C1*C2*C3*RINB*RINN*RL*RVB1*RVB2 + C1*C2*C3*RINB*RINN*RL*RVB1*RVN2 + C1*C2*C3*RINB*RINN*RL*RVB1*RVN1 + C1*C2*C3*RINB*RINN*RT1*RVB1*RVN2 + C1*C2*C3*RINB*RINN*RT1*RVB1*RVN1 + C1*C2*C3*RINB*RINN*RT1*RVB2*RVN2 + C1*C2*C3*RINB*RINN*RT1*RVB2*RVN1 + C1*C2*C3*RINB*RINN*RVB1*RVB2*RVN2 + C1*C2*C3*RINB*RINN*RVB1*RVB2*RVN1 + C1*C2*C3*RINB*RL*RT1*RVB1*RVN2 + C1*C2*C3*RINB*RL*RT1*RVB2*RVN2 + C1*C2*C3*RINB*RL*RT1*RVN2*RVN1 + C1*C2*C3*RINB*RL*RVB1*RVB2*RVN2 + C1*C2*C3*RINB*RL*RVB1*RVN2*RVN1 + C1*C2*C3*RINB*RT1*RVB1*RVN2*RVN1 + C1*C2*C3*RINB*RT1*RVB2*RVN2*RVN1 + C1*C2*C3*RINB*RVB1*RVB2*RVN2*RVN1 + C1*C2*C3*RINN*RL*RT1*RVB1*RVB2 + C1*C2*C3*RINN*RL*RT1*RVB2*RVN2 + C1*C2*C3*RINN*RL*RT1*RVB2*RVN1 + C1*C2*C3*RINN*RL*RVB1*RVB2*RVN2 + C1*C2*C3*RINN*RL*RVB1*RVB2*RVN1 + C1*C2*C3*RINN*RT1*RVB1*RVB2*RVN2 + C1*C2*C3*RINN*RT1*RVB1*RVB2*RVN1 + C1*C2*C3*RL*RT1*RVB1*RVB2*RVN2 + C1*C2*C3*RL*RT1*RVB2*RVN2*RVN1 + C1*C2*C3*RL*RVB1*RVB2*RVN2*RVN1 + C1*C2*C3*RT1*RVB1*RVB2*RVN2*RVN1 + C1*C2*C4*RINB*RINN*RL*RT2*RVB1 + C1*C2*C4*RINB*RINN*RL*RT2*RVB2 + C1*C2*C4*RINB*RINN*RL*RT2*RVN2 + C1*C2*C4*RINB*RINN*RL*RT2*RVN1 + C1*C2*C4*RINB*RINN*RL*RVB1*RVN2 + C1*C2*C4*RINB*RINN*RL*RVB1*RVN1 + C1*C2*C4*RINB*RINN*RL*RVB2*RVN2 + C1*C2*C4*RINB*RINN*RL*RVB2*RVN1 + C1*C2*C4*RINB*RINN*RT2*RVB1*RVN2 + C1*C2*C4*RINB*RINN*RT2*RVB1*RVN1 + C1*C2*C4*RINB*RINN*RT2*RVB2*RVN2 + C1*C2*C4*RINB*RINN*RT2*RVB2*RVN1 + C1*C2*C4*RINB*RL*RT2*RVB1*RVN2 + C1*C2*C4*RINB*RL*RT2*RVB2*RVN2 + C1*C2*C4*RINB*RL*RT2*RVN2*RVN1 + C1*C2*C4*RINB*RL*RVB1*RVN2*RVN1 + C1*C2*C4*RINB*RL*RVB2*RVN2*RVN1 + C1*C2*C4*RINB*RT2*RVB1*RVN2*RVN1 + C1*C2*C4*RINB*RT2*RVB2*RVN2*RVN1 + C1*C2*C4*RINN*RL*RT2*RVB1*RVB2 + C1*C2*C4*RINN*RL*RT2*RVB2*RVN2 + C1*C2*C4*RINN*RL*RT2*RVB2*RVN1 + C1*C2*C4*RINN*RL*RVB1*RVB2*RVN2 + C1*C2*C4*RINN*RL*RVB1*RVB2*RVN1 + C1*C2*C4*RINN*RT2*RVB1*RVB2*RVN2 + C1*C2*C4*RINN*RT2*RVB1*RVB2*RVN1 + C1*C2*C4*RL*RT2*RVB1*RVB2*RVN2 + C1*C2*C4*RL*RT2*RVB2*RVN2*RVN1 + C1*C2*C4*RL*RVB1*RVB2*RVN2*RVN1 + C1*C2*C4*RT2*RVB1*RVB2*RVN2*RVN1 + C1*C3*C4*RINB*RL*RT1*RT2*RVB1 + C1*C3*C4*RINB*RL*RT1*RT2*RVB2 + C1*C3*C4*RINB*RL*RT1*RT2*RVN2 + C1*C3*C4*RINB*RL*RT1*RT2*RVN1 + C1*C3*C4*RINB*RL*RT1*RVB1*RVN2 + C1*C3*C4*RINB*RL*RT1*RVB1*RVN1 + C1*C3*C4*RINB*RL*RT1*RVB2*RVN2 + C1*C3*C4*RINB*RL*RT1*RVB2*RVN1 + C1*C3*C4*RINB*RL*RT2*RVB1*RVB2 + C1*C3*C4*RINB*RL*RT2*RVB1*RVN2 + C1*C3*C4*RINB*RL*RT2*RVB1*RVN1 + C1*C3*C4*RINB*RL*RVB1*RVB2*RVN2 + C1*C3*C4*RINB*RL*RVB1*RVB2*RVN1 + C1*C3*C4*RINB*RT1*RT2*RVB1*RVN2 + C1*C3*C4*RINB*RT1*RT2*RVB1*RVN1 + C1*C3*C4*RINB*RT1*RT2*RVB2*RVN2 + C1*C3*C4*RINB*RT1*RT2*RVB2*RVN1 + C1*C3*C4*RINB*RT2*RVB1*RVB2*RVN2 + C1*C3*C4*RINB*RT2*RVB1*RVB2*RVN1 + C1*C3*C4*RL*RT1*RT2*RVB1*RVB2 + C1*C3*C4*RL*RT1*RT2*RVB2*RVN2 + C1*C3*C4*RL*RT1*RT2*RVB2*RVN1 + C1*C3*C4*RL*RT1*RVB1*RVB2*RVN2 + C1*C3*C4*RL*RT1*RVB1*RVB2*RVN1 + C1*C3*C4*RL*RT2*RVB1*RVB2*RVN2 + C1*C3*C4*RL*RT2*RVB1*RVB2*RVN1 + C1*C3*C4*RT1*RT2*RVB1*RVB2*RVN2 + C1*C3*C4*RT1*RT2*RVB1*RVB2*RVN1 + C2*C3*C4*RINN*RL*RT1*RT2*RVB1 + C2*C3*C4*RINN*RL*RT1*RT2*RVB2 + C2*C3*C4*RINN*RL*RT1*RT2*RVN2 + C2*C3*C4*RINN*RL*RT1*RT2*RVN1 + C2*C3*C4*RINN*RL*RT1*RVB1*RVN2 + C2*C3*C4*RINN*RL*RT1*RVB1*RVN1 + C2*C3*C4*RINN*RL*RT1*RVB2*RVN2 + C2*C3*C4*RINN*RL*RT1*RVB2*RVN1 + C2*C3*C4*RINN*RL*RT2*RVB1*RVB2 + C2*C3*C4*RINN*RL*RT2*RVB1*RVN2 + C2*C3*C4*RINN*RL*RT2*RVB1*RVN1 + C2*C3*C4*RINN*RL*RVB1*RVB2*RVN2 + C2*C3*C4*RINN*RL*RVB1*RVB2*RVN1 + C2*C3*C4*RINN*RT1*RT2*RVB1*RVN2 + C2*C3*C4*RINN*RT1*RT2*RVB1*RVN1 + C2*C3*C4*RINN*RT1*RT2*RVB2*RVN2 + C2*C3*C4*RINN*RT1*RT2*RVB2*RVN1 + C2*C3*C4*RINN*RT2*RVB1*RVB2*RVN2 + C2*C3*C4*RINN*RT2*RVB1*RVB2*RVN1 + C2*C3*C4*RL*RT1*RT2*RVB1*RVN2 + C2*C3*C4*RL*RT1*RT2*RVB2*RVN2 + C2*C3*C4*RL*RT1*RT2*RVN2*RVN1 + C2*C3*C4*RL*RT1*RVB1*RVN2*RVN1 + C2*C3*C4*RL*RT1*RVB2*RVN2*RVN1 + C2*C3*C4*RL*RT2*RVB1*RVB2*RVN2 + C2*C3*C4*RL*RT2*RVB1*RVN2*RVN1 + C2*C3*C4*RL*RVB1*RVB2*RVN2*RVN1 + C2*C3*C4*RT1*RT2*RVB1*RVN2*RVN1 + C2*C3*C4*RT1*RT2*RVB2*RVN2*RVN1 + C2*C3*C4*RT2*RVB1*RVB2*RVN2*RVN1;
  const a4 = C1*C2*C3*C4*RINB*RINN*RL*RT1*RT2*RVB1 + C1*C2*C3*C4*RINB*RINN*RL*RT1*RT2*RVB2 + C1*C2*C3*C4*RINB*RINN*RL*RT1*RT2*RVN2 + C1*C2*C3*C4*RINB*RINN*RL*RT1*RT2*RVN1 + C1*C2*C3*C4*RINB*RINN*RL*RT1*RVB1*RVN2 + C1*C2*C3*C4*RINB*RINN*RL*RT1*RVB1*RVN1 + C1*C2*C3*C4*RINB*RINN*RL*RT1*RVB2*RVN2 + C1*C2*C3*C4*RINB*RINN*RL*RT1*RVB2*RVN1 + C1*C2*C3*C4*RINB*RINN*RL*RT2*RVB1*RVB2 + C1*C2*C3*C4*RINB*RINN*RL*RT2*RVB1*RVN2 + C1*C2*C3*C4*RINB*RINN*RL*RT2*RVB1*RVN1 + C1*C2*C3*C4*RINB*RINN*RL*RVB1*RVB2*RVN2 + C1*C2*C3*C4*RINB*RINN*RL*RVB1*RVB2*RVN1 + C1*C2*C3*C4*RINB*RINN*RT1*RT2*RVB1*RVN2 + C1*C2*C3*C4*RINB*RINN*RT1*RT2*RVB1*RVN1 + C1*C2*C3*C4*RINB*RINN*RT1*RT2*RVB2*RVN2 + C1*C2*C3*C4*RINB*RINN*RT1*RT2*RVB2*RVN1 + C1*C2*C3*C4*RINB*RINN*RT2*RVB1*RVB2*RVN2 + C1*C2*C3*C4*RINB*RINN*RT2*RVB1*RVB2*RVN1 + C1*C2*C3*C4*RINB*RL*RT1*RT2*RVB1*RVN2 + C1*C2*C3*C4*RINB*RL*RT1*RT2*RVB2*RVN2 + C1*C2*C3*C4*RINB*RL*RT1*RT2*RVN2*RVN1 + C1*C2*C3*C4*RINB*RL*RT1*RVB1*RVN2*RVN1 + C1*C2*C3*C4*RINB*RL*RT1*RVB2*RVN2*RVN1 + C1*C2*C3*C4*RINB*RL*RT2*RVB1*RVB2*RVN2 + C1*C2*C3*C4*RINB*RL*RT2*RVB1*RVN2*RVN1 + C1*C2*C3*C4*RINB*RL*RVB1*RVB2*RVN2*RVN1 + C1*C2*C3*C4*RINB*RT1*RT2*RVB1*RVN2*RVN1 + C1*C2*C3*C4*RINB*RT1*RT2*RVB2*RVN2*RVN1 + C1*C2*C3*C4*RINB*RT2*RVB1*RVB2*RVN2*RVN1 + C1*C2*C3*C4*RINN*RL*RT1*RT2*RVB1*RVB2 + C1*C2*C3*C4*RINN*RL*RT1*RT2*RVB2*RVN2 + C1*C2*C3*C4*RINN*RL*RT1*RT2*RVB2*RVN1 + C1*C2*C3*C4*RINN*RL*RT1*RVB1*RVB2*RVN2 + C1*C2*C3*C4*RINN*RL*RT1*RVB1*RVB2*RVN1 + C1*C2*C3*C4*RINN*RL*RT2*RVB1*RVB2*RVN2 + C1*C2*C3*C4*RINN*RL*RT2*RVB1*RVB2*RVN1 + C1*C2*C3*C4*RINN*RT1*RT2*RVB1*RVB2*RVN2 + C1*C2*C3*C4*RINN*RT1*RT2*RVB1*RVB2*RVN1 + C1*C2*C3*C4*RL*RT1*RT2*RVB1*RVB2*RVN2 + C1*C2*C3*C4*RL*RT1*RT2*RVB2*RVN2*RVN1 + C1*C2*C3*C4*RL*RT1*RVB1*RVB2*RVN2*RVN1 + C1*C2*C3*C4*RL*RT2*RVB1*RVB2*RVN2*RVN1 + C1*C2*C3*C4*RT1*RT2*RVB1*RVB2*RVN2*RVN1;

  return [
    [b0, b1, b2, b3, b4],
    [a0, a1, a2, a3, a4]      
  ];
});