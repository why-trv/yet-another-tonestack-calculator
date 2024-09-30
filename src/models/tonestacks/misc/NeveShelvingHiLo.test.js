import { NeveShelvingHiLo } from './NeveShelvingHiLo';
import { testTonestack } from '../_testTonestack';

testTonestack(NeveShelvingHiLo, function (controlValues) {  
  const {
    RIN, R1, R2, R3, R4, R5, R6, RF, C1, C2, C3, C4, C5, C6, CF,
    RT: [RT2, RT1],
    RB: [RB2, RB1]
  } = this.processComponentValues(controlValues);

  const denCoeffs = [
    (C5 + C4 + C3)*(RIN + RB1 + R1),

    ((C4 + C3)*C5*RIN + (C4 + C3)*C5*RB1 + (C4 + C3)*C5*R1)*RT2
    + ((C4*C5 + C3*C4)*RIN + (C4*C5 + C3*C4)*RB1 + (C4*C5 + C3*C4)*R1)*RT1
    + ((C5 + C4 + C3)*CF*RF + ((C5 + C4 + C3)*CF + (C4 + C3)*C5)*RB2
      + ((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*RB1
      + ((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*R6
      + (C4 + C3)*C5*R5 + (C4*C5 + C3*C4)*R4
      + ((C5 + C4 + C3)*CF + C3*C5 + C3*C4)*R3
      + ((C5 + C4 + C3)*CF + (C4 + C3)*C5)*R2 + (C4*C5 + C3*C4)*R1)*RIN
    + ((C5 + C4 + C3)*CF*RB1 + (C5 + C4 + C3)*CF*R3 + (C5 + C4 + C3)*CF*R1)*RF
    + (((C5 + C4 + C3)*CF + C3*C5)*RB1 + ((C5 + C4 + C3)*CF + C3*C5)*R3
      + ((C5 + C4 + C3)*CF + C3*C5)*R1)*RB2 + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5
        + (C2 + C1)*C4 + (C2 + C1)*C3)*R6 + (C4 + C3)*C5*R5 + (C4*C5 + C3*C4)*R4
        + ((C5 + C4 + C3)*CF + C3*C5)*R3 + ((C5 + C4 + C3)*CF + C3*C5)*R2
        + (C1*C5 + C1*C4 + C1*C3)*R1)*RB1 + ((C5 + C4 + C3)*C6 + (C2 + C1)*C5
          + (C2 + C1)*C4 + (C2 + C1)*C3)*R1*R6 + (C4 + C3)*C5*R1*R5
    + (C4*C5 + C3*C4)*R1*R4 + (((C5 + C4 + C3)*CF + C3*C5)*R2
      + ((C5 + C4 + C3)*CF + C3*C5)*R1)*R3 + ((C5 + C4 + C3)*CF + C3*C5)*R1*R2,

    ((C3*C4*C5*RIN + C3*C4*C5*RB1 + C3*C4*C5*R1)*RT1
      + ((C4 + C3)*C5*CF*RF + (C4 + C3)*C5*CF*RB2 + ((C3 + C1)*C4 + C1*C3)*C5*RB1
        + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R6 + C3*C4*C5*R4
        + ((C4 + C3)*C5*CF + C3*C4*C5)*R3 + (C4 + C3)*C5*CF*R2 + C3*C4*C5*R1)*RIN
      + ((C4 + C3)*C5*CF*RB1 + (C4 + C3)*C5*CF*R3 + (C4 + C3)*C5*CF*R1)*RF
      + ((C4 + C3)*C5*CF*RB1 + (C4 + C3)*C5*CF*R3 + (C4 + C3)*C5*CF*R1)*RB2
      + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R6 + C3*C4*C5*R4
        + (C4 + C3)*C5*CF*R3 + (C4 + C3)*C5*CF*R2 + (C1*C4 + C1*C3)*C5*R1)*RB1
      + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R1*R6 + C3*C4*C5*R1*R4
      + ((C4 + C3)*C5*CF*R2 + (C4 + C3)*C5*CF*R1)*R3 + (C4 + C3)*C5*CF*R1*R2)*RT2
    + (((C4*C5 + C3*C4)*CF*RF + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*RB2
      + (C1*C4*C5 + C1*C3*C4)*RB1 + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
        + (C2 + C1)*C3*C4)*R6 + C3*C4*C5*R5 + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R3
      + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R2)*RIN
      + ((C4*C5 + C3*C4)*CF*RB1 + (C4*C5 + C3*C4)*CF*R3 + (C4*C5 + C3*C4)*CF*R1)*RF
      + (((C4*C5 + C3*C4)*CF + C3*C4*C5)*RB1 + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R3
        + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R1)*RB2
      + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*R6 + C3*C4*C5*R5
        + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R3 + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R2
        + (C1*C4*C5 + C1*C3*C4)*R1)*RB1 + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
          + (C2 + C1)*C3*C4)*R1*R6 + C3*C4*C5*R1*R5
      + (((C4*C5 + C3*C4)*CF + C3*C4*C5)*R2 + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R1)*R3
      + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R1*R2)*RT1
    + ((((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*CF*RB2
      + ((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*CF*RB1
      + ((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF*R6
      + (C4 + C3)*C5*CF*R5 + (C4*C5 + C3*C4)*CF*R4
      + ((C5 + C4 + C3)*C6 + (C3 + C2 + C1)*C5 + (C3 + C2 + C1)*C4 + (C2 + C1)*C3)
      *CF*R3 + (C4 + C3)*C5*CF*R2 + (C4*C5 + C3*C4)*CF*R1)*RF
      + ((((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*CF + (C3*C4 + C1*C3)*C5)*RB1
        + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF
          + ((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*C6
          + ((C2 + C1)*C4 + (C2 + C1)*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*R6
        + (C4 + C3)*C5*CF*R5 + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R4
        + (((C5 + C4 + C3)*C6 + (C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*CF + C3*C5*C6
          + (C3*C4 + C1*C3)*C5)*R3 + ((C2*C5 + C2*C4 + C2*C3)*CF + (C2*C4 + C2*C3)*C5)
        *R2 + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R1)*RB2
      + ((((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*C6 + ((C2 + C1)*C4 + C1*C2)*C5
        + ((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*R6 + ((C3 + C1)*C4 + C1*C3)*C5*R5
        + (C1*C4*C5 + C1*C3*C4)*R4 + (((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*CF
          + (C3*C4 + C1*C3)*C5)*R3 + (((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*CF
            + (C3*C4 + C1*C3)*C5)*R2 + (C1*C4*C5 + C1*C3*C4)*R1)*RB1
      + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R5
        + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*R4
        + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF
          + (C3*C5 + C3*C4)*C6 + (C2 + C1)*C3*C5 + (C2 + C1)*C3*C4)*R3
        + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF
          + (C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R2
        + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*R1)*R6
      + (C3*C4*C5*R4 + ((C4 + C3)*C5*CF + C3*C4*C5)*R3 + (C4 + C3)*C5*CF*R2
        + C3*C4*C5*R1)*R5 + (((C4*C5 + C3*C4)*CF + C3*C4*C5)*R3
          + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R2)*R4
      + ((((C5 + C4 + C3)*C6 + (C4 + C2 + C1)*C5 + (C3 + C2 + C1)*C4 + (C2 + C1)*C3)
        *CF + C3*C5*C6 + (C3*C4 + (C2 + C1)*C3)*C5)*R2
        + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R1)*R3
      + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R1*R2)*RIN
    + ((((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*CF*RB1
      + ((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*CF*R3
      + ((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*CF*R1)*RB2
      + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF*R6
        + (C4 + C3)*C5*CF*R5 + (C4*C5 + C3*C4)*CF*R4
        + ((C5 + C4 + C3)*C6 + (C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*CF*R3
        + (C4 + C3)*C5*CF*R2 + (C1*C5 + C1*C4 + C1*C3)*CF*R1)*RB1
      + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF*R3
        + ((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF*R1)*R6
      + ((C4 + C3)*C5*CF*R3 + (C4 + C3)*C5*CF*R1)*R5
      + ((C4*C5 + C3*C4)*CF*R3 + (C4*C5 + C3*C4)*CF*R1)*R4
      + ((C4 + C3)*C5*CF*R2 + ((C5 + C4 + C3)*C6 + (C4 + C3 + C2 + C1)*C5
        + (C2 + C1)*C4 + (C2 + C1)*C3)*CF*R1)*R3 + (C4 + C3)*C5*CF*R1*R2)*RF
    + (((((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF
      + ((C3 + C2)*C5 + C2*C4 + C2*C3)*C6 + (C2 + C1)*C3*C5)*R6 + (C4 + C3)*C5*CF*R5
      + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R4 + ((C5 + C4 + C3)*C6*CF + C3*C5*C6)*R3
      + ((C2*C5 + C2*C4 + C2*C3)*CF + C2*C3*C5)*R2
      + ((C1*C5 + C1*C4 + C1*C3)*CF + C1*C3*C5)*R1)*RB1
      + ((((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF
        + C3*C5*C6 + (C2 + C1)*C3*C5)*R3 + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5
          + (C2 + C1)*C4 + (C2 + C1)*C3)*CF + ((C3 + C2)*C5 + C2*C4 + C2*C3)*C6
          + ((C2 + C1)*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*R1)*R6
      + ((C4 + C3)*C5*CF*R3 + (C4 + C3)*C5*CF*R1)*R5
      + (((C4*C5 + C3*C4)*CF + C3*C4*C5)*R3 + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R1)*R4
      + (((C2*C5 + C2*C4 + C2*C3)*CF + C2*C3*C5)*R2
        + (((C5 + C4 + C3)*C6 + C1*C5 + C1*C4 + C1*C3)*CF + C3*C5*C6 + C1*C3*C5)*R1)
      *R3 + ((C2*C5 + C2*C4 + C2*C3)*CF + C2*C3*C5)*R1*R2)*RB2
    + ((((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R5
      + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*R4
      + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF
        + C3*C5*C6 + (C2 + C1)*C3*C5)*R3 + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5
          + (C2 + C1)*C4 + (C2 + C1)*C3)*CF + C3*C5*C6 + (C2 + C1)*C3*C5)*R2
      + ((C1*C5 + C1*C4 + C1*C3)*C6 + C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*R1)*R6
      + (C3*C4*C5*R4 + (C4 + C3)*C5*CF*R3 + (C4 + C3)*C5*CF*R2
        + (C1*C4 + C1*C3)*C5*R1)*R5 + (((C4*C5 + C3*C4)*CF + C3*C4*C5)*R3
          + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R2 + (C1*C4*C5 + C1*C3*C4)*R1)*R4
      + ((((C5 + C4 + C3)*C6 + C2*C5 + C2*C4 + C2*C3)*CF + C3*C5*C6 + C2*C3*C5)*R2
        + ((C1*C5 + C1*C4 + C1*C3)*CF + C1*C3*C5)*R1)*R3
      + ((C1*C5 + C1*C4 + C1*C3)*CF + C1*C3*C5)*R1*R2)*RB1
    + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R1*R5
      + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*R1*R4
      + ((((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF
        + C3*C5*C6 + (C2 + C1)*C3*C5)*R2 + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5
          + (C2 + C1)*C4 + (C2 + C1)*C3)*CF + C3*C5*C6 + (C2 + C1)*C3*C5)*R1)*R3
      + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF
        + C3*C5*C6 + (C2 + C1)*C3*C5)*R1*R2)*R6
    + (C3*C4*C5*R1*R4 + ((C4 + C3)*C5*CF*R2 + (C4 + C3)*C5*CF*R1)*R3
      + (C4 + C3)*C5*CF*R1*R2)*R5 + ((((C4*C5 + C3*C4)*CF + C3*C4*C5)*R2
        + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R1)*R3
        + ((C4*C5 + C3*C4)*CF + C3*C4*C5)*R1*R2)*R4
    + (((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*CF
      + C3*C5*C6 + (C2 + C1)*C3*C5)*R1*R2*R3,

    (((C3*C4*C5*CF*RF + C3*C4*C5*CF*RB2 + C1*C3*C4*C5*RB1
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R6 + C3*C4*C5*CF*R3 + C3*C4*C5*CF*R2)*RIN
      + (C3*C4*C5*CF*RB1 + C3*C4*C5*CF*R3 + C3*C4*C5*CF*R1)*RF
      + (C3*C4*C5*CF*RB1 + C3*C4*C5*CF*R3 + C3*C4*C5*CF*R1)*RB2
      + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R6 + C3*C4*C5*CF*R3 + C3*C4*C5*CF*R2
        + C1*C3*C4*C5*R1)*RB1 + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R6
      + (C3*C4*C5*CF*R2 + C3*C4*C5*CF*R1)*R3 + C3*C4*C5*CF*R1*R2)*RT1
      + (((C2*C4 + C2*C3)*C5*CF*RB2 + ((C3 + C1)*C4 + C1*C3)*C5*CF*RB1
        + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R6 + C3*C4*C5*CF*R4
        + ((C4 + C3)*C5*C6 + ((C3 + C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R3
        + C3*C4*C5*CF*R1)*RF + (((C3 + C1)*C4 + C1*C3)*C5*CF*RB1
          + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF
            + (C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R6 + C3*C4*C5*CF*R4
          + ((C4 + C3)*C5*C6 + ((C3 + C1)*C4 + C1*C3)*C5)*CF*R3
          + (C2*C4 + C2*C3)*C5*CF*R2 + C3*C4*C5*CF*R1)*RB2
        + ((((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)
          *R6 + C1*C3*C4*C5*R4 + ((C3 + C1)*C4 + C1*C3)*C5*CF*R3
          + ((C3 + C1)*C4 + C1*C3)*C5*CF*R2 + C1*C3*C4*C5*R1)*RB1
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R4
          + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF + C3*C4*C5*C6
            + (C2 + C1)*C3*C4*C5)*R3 + ((C4 + C3)*C5*C6
              + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R6
        + (C3*C4*C5*CF*R3 + C3*C4*C5*CF*R2)*R4
        + (((C4 + C3)*C5*C6 + ((C3 + C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
          + C3*C4*C5*CF*R1)*R3 + C3*C4*C5*CF*R1*R2)*RIN
      + (((C2*C4 + C2*C3)*C5*CF*RB1 + (C2*C4 + C2*C3)*C5*CF*R3
        + (C2*C4 + C2*C3)*C5*CF*R1)*RB2 + (((C4 + C3)*C5*C6
          + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R6 + C3*C4*C5*CF*R4
          + ((C4 + C3)*C5*C6 + (C2*C4 + C2*C3)*C5)*CF*R3 + (C1*C4 + C1*C3)*C5*CF*R1)*RB1
        + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R3
          + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1)*R6
        + (C3*C4*C5*CF*R3 + C3*C4*C5*CF*R1)*R4
        + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1*R3)*RF
      + (((((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF
        + (C2*C4 + C2*C3)*C5*C6)*R6 + C3*C4*C5*CF*R4 + (C4 + C3)*C5*C6*CF*R3
        + (C2*C4 + C2*C3)*C5*CF*R2 + (C1*C4 + C1*C3)*C5*CF*R1)*RB1
        + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R3
          + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF
            + (C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R1)*R6
        + (C3*C4*C5*CF*R3 + C3*C4*C5*CF*R1)*R4
        + ((C2*C4 + C2*C3)*C5*CF*R2 + ((C4 + C3)*C5*C6 + (C1*C4 + C1*C3)*C5)*CF*R1)*R3
        + (C2*C4 + C2*C3)*C5*CF*R1*R2)*RB2 + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R4
          + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R3
          + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
          + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R1)*R6
          + (C3*C4*C5*CF*R3 + C3*C4*C5*CF*R2 + C1*C3*C4*C5*R1)*R4
          + (((C4 + C3)*C5*C6 + (C2*C4 + C2*C3)*C5)*CF*R2 + (C1*C4 + C1*C3)*C5*CF*R1)*R3
          + (C1*C4 + C1*C3)*C5*CF*R1*R2)*RB1 + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R4
            + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
              + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1)*R3
            + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1*R2)*R6
      + ((C3*C4*C5*CF*R2 + C3*C4*C5*CF*R1)*R3 + C3*C4*C5*CF*R1*R2)*R4
      + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1*R2*R3)*RT2
    + (((((C3 + C2)*C4*C5 + C2*C3*C4)*CF*RB2 + (C1*C4*C5 + C1*C3*C4)*CF*RB1
      + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF*R6
      + C3*C4*C5*CF*R5 + ((C4*C5 + C3*C4)*C6 + (C3 + C2 + C1)*C4*C5
        + (C2 + C1)*C3*C4)*CF*R3 + C3*C4*C5*CF*R2)*RF
      + (((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*RB1
        + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF
          + ((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
          + C1*C2*C3*C4)*R6 + C3*C4*C5*CF*R5 + (((C4*C5 + C3*C4)*C6 + C1*C4*C5
            + C1*C3*C4)*CF + C3*C4*C5*C6 + C1*C3*C4*C5)*R3
        + ((C2*C4*C5 + C2*C3*C4)*CF + C2*C3*C4*C5)*R2)*RB2
      + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R6 + C1*C3*C4*C5*R5
        + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R3
        + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R2)*RB1
      + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R5
        + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R3 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
            + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2)*R6
      + (C3*C4*C5*CF*R3 + C3*C4*C5*CF*R2)*R5
      + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
        + (C2 + C1)*C3*C4*C5)*R2*R3)*RIN + ((((C3 + C2)*C4*C5 + C2*C3*C4)*CF*RB1
          + ((C3 + C2)*C4*C5 + C2*C3*C4)*CF*R3 + ((C3 + C2)*C4*C5 + C2*C3*C4)*CF*R1)*RB2
          + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF*R6
            + C3*C4*C5*CF*R5 + ((C4*C5 + C3*C4)*C6 + (C3 + C2)*C4*C5 + C2*C3*C4)*CF*R3
            + C3*C4*C5*CF*R2 + (C1*C4*C5 + C1*C3*C4)*CF*R1)*RB1
          + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF*R3
            + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF*R1)*R6
          + (C3*C4*C5*CF*R3 + C3*C4*C5*CF*R1)*R5
          + (C3*C4*C5*CF*R2 + ((C4*C5 + C3*C4)*C6 + (C3 + C2 + C1)*C4*C5
            + (C2 + C1)*C3*C4)*CF*R1)*R3 + C3*C4*C5*CF*R1*R2)*RF
      + (((((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF
        + ((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + (C2 + C1)*C3*C4*C5)*R6 + C3*C4*C5*CF*R5
        + ((C4*C5 + C3*C4)*C6*CF + C3*C4*C5*C6)*R3
        + ((C2*C4*C5 + C2*C3*C4)*CF + C2*C3*C4*C5)*R2
        + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R1)*RB1
        + ((((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R3 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
            + (C2 + C1)*C3*C4)*CF + ((C3 + C2)*C4*C5 + C2*C3*C4)*C6
            + ((C2 + C1)*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*R1)*R6
        + (C3*C4*C5*CF*R3 + C3*C4*C5*CF*R1)*R5
        + (((C2*C4*C5 + C2*C3*C4)*CF + C2*C3*C4*C5)*R2
          + (((C4*C5 + C3*C4)*C6 + C1*C4*C5 + C1*C3*C4)*CF + C3*C4*C5*C6 + C1*C3*C4*C5)
          *R1)*R3 + ((C2*C4*C5 + C2*C3*C4)*CF + C2*C3*C4*C5)*R1*R2)*RB2
      + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R5
        + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R3 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
            + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2
        + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R1)*R6
        + (C3*C4*C5*CF*R3 + C3*C4*C5*CF*R2 + C1*C3*C4*C5*R1)*R5
        + ((((C4*C5 + C3*C4)*C6 + C2*C4*C5 + C2*C3*C4)*CF + C3*C4*C5*C6 + C2*C3*C4*C5)
          *R2 + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R1)*R3
        + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R1*R2)*RB1
      + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R5
        + ((((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R2 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
            + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R3
        + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R1*R2)*R6 + ((C3*C4*C5*CF*R2 + C3*C4*C5*CF*R1)*R3
            + C3*C4*C5*CF*R1*R2)*R5 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
              + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R2*R3)*RT1
    + ((((((C3 + C2 + C1)*C4 + C1*C3 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4 + C1*C2*C3)
      *CF*RB1 + (((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*C6
        + ((C2 + C1)*C4 + (C2 + C1)*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*CF*R6
      + (C2*C4 + C2*C3)*C5*CF*R5 + ((C3 + C2)*C4*C5 + C2*C3*C4)*CF*R4
      + (((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*C6
        + ((C3 + C2 + C1)*C4 + C1*C3 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4 + C1*C2*C3)*CF
      *R3 + (C2*C4 + C2*C3)*C5*CF*R2 + ((C3 + C2)*C4*C5 + C2*C3*C4)*CF*R1)*RB2
      + ((((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*C6 + ((C2 + C1)*C4 + C1*C2)*C5
        + ((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*CF*R6
        + ((C3 + C1)*C4 + C1*C3)*C5*CF*R5 + (C1*C4*C5 + C1*C3*C4)*CF*R4
        + (((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*C6
          + ((C3 + C2 + C1)*C4 + C1*C3 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4 + C1*C2*C3)*CF
        *R3 + ((C3 + C1)*C4 + C1*C3)*C5*CF*R2 + (C1*C4*C5 + C1*C3*C4)*CF*R1)*RB1
      + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R5
        + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF*R4
        + ((C3*C5 + C3*C4)*C6 + (C2 + C1)*C3*C5 + (C2 + C1)*C3*C4)*CF*R3
        + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
        + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF*R1)*R6
      + (C3*C4*C5*CF*R4 + ((C4 + C3)*C5*C6 + ((C3 + C2 + C1)*C4 + (C2 + C1)*C3)*C5)
        *CF*R3 + C3*C4*C5*CF*R1)*R5 + (((C4*C5 + C3*C4)*C6 + (C3 + C2 + C1)*C4*C5
          + (C2 + C1)*C3*C4)*CF*R3 + C3*C4*C5*CF*R2)*R4
      + (((C4 + C3)*C5*C6 + ((C3 + C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
        + ((C4*C5 + C3*C4)*C6 + (C3 + C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF*R1)*R3
      + C3*C4*C5*CF*R1*R2)*RF + ((((((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*C6
        + ((C2 + C1)*C4 + C1*C2)*C5 + ((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*CF
        + (((C3 + C2 + C1)*C4 + C1*C3 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4 + C1*C2*C3)*C6
        + ((C2 + C1)*C3*C4 + C1*C2*C3)*C5 + C1*C2*C3*C4)*R6
        + ((C3 + C1)*C4 + C1*C3)*C5*CF*R5 + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)
        *R4 + (((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*C6*CF + (C3*C4 + C1*C3)*C5*C6)*R3
        + (((C2*C4 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4 + C1*C2*C3)*CF
          + (C2*C3*C4 + C1*C2*C3)*C5)*R2 + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R1)
        *RB1 + ((((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF
          + (C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R5
          + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF
            + ((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
            + C1*C2*C3*C4)*R4 + ((((C4 + C2)*C5 + (C3 + C2)*C4 + C2*C3)*C6
              + ((C2 + C1)*C4 + C1*C2)*C5 + ((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*CF
              + ((C3*C4 + C2*C3)*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3*C4 + C1*C2*C3)*C5
              + C1*C2*C3*C4)*R3 + (((C2*C5 + C2*C4 + C2*C3)*C6 + C1*C2*C5 + C1*C2*C4
                + C1*C2*C3)*CF + (C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R2
          + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF
            + ((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
            + C1*C2*C3*C4)*R1)*R6 + (C3*C4*C5*CF*R4
              + ((C4 + C3)*C5*C6 + ((C3 + C1)*C4 + C1*C3)*C5)*CF*R3
              + (C2*C4 + C2*C3)*C5*CF*R2 + C3*C4*C5*CF*R1)*R5
        + ((((C4*C5 + C3*C4)*C6 + C1*C4*C5 + C1*C3*C4)*CF + C3*C4*C5*C6 + C1*C3*C4*C5)
          *R3 + ((C2*C4*C5 + C2*C3*C4)*CF + C2*C3*C4*C5)*R2)*R4
        + ((((C2*C5 + C2*C4 + C2*C3)*C6 + (C2*C4 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4
          + C1*C2*C3)*CF + C2*C3*C5*C6 + (C2*C3*C4 + C1*C2*C3)*C5)*R2
          + (((C4*C5 + C3*C4)*C6 + C1*C4*C5 + C1*C3*C4)*CF + C3*C4*C5*C6 + C1*C3*C4*C5)
          *R1)*R3 + ((C2*C4*C5 + C2*C3*C4)*CF + C2*C3*C4*C5)*R1*R2)*RB2
      + (((((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)
        *R5 + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R4
        + ((((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*C6 + ((C2 + C1)*C4 + C1*C2)*C5
          + ((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*CF
          + ((C3*C4 + C1*C3)*C5 + C1*C3*C4)*C6 + ((C2 + C1)*C3*C4 + C1*C2*C3)*C5
          + C1*C2*C3*C4)*R3 + ((((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*C6
            + ((C2 + C1)*C4 + C1*C2)*C5 + ((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*CF
            + ((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*R2
        + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R1)*R6
        + (C1*C3*C4*C5*R4 + ((C3 + C1)*C4 + C1*C3)*C5*CF*R3
          + ((C3 + C1)*C4 + C1*C3)*C5*CF*R2 + C1*C3*C4*C5*R1)*R5
        + (((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R3
          + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R2)*R4
        + (((((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*C6 + (C2*C4 + C1*C2)*C5
          + (C2*C3 + C1*C2)*C4 + C1*C2*C3)*CF + (C3*C4 + C1*C3)*C5*C6
          + (C2*C3*C4 + C1*C2*C3)*C5)*R2 + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R1)
        *R3 + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R1*R2)*RB1
      + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R4
        + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R3 + ((C4 + C3)*C5*C6
            + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R5
        + ((((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R3 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
            + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2)*R4
        + ((((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R2 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
            + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R3
        + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R1*R2)*R6 + ((C3*C4*C5*CF*R3 + C3*C4*C5*CF*R2)*R4
            + (((C4 + C3)*C5*C6 + ((C3 + C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
              + C3*C4*C5*CF*R1)*R3 + C3*C4*C5*CF*R1*R2)*R5
      + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
        + (C2 + C1)*C3*C4*C5)*R2*R3*R4 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
          + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R2*R3)*RIN
    + ((((((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*C6
      + ((C2 + C1)*C4 + (C2 + C1)*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*CF*R6
      + (C2*C4 + C2*C3)*C5*CF*R5 + ((C3 + C2)*C4*C5 + C2*C3*C4)*CF*R4
      + ((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*C6*CF*R3 + (C2*C4 + C2*C3)*C5*CF*R2
      + ((C1*C4 + C1*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*CF*R1)*RB1
      + ((((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*C6
        + ((C2 + C1)*C4 + (C2 + C1)*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*CF*R3
        + (((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*C6
          + ((C2 + C1)*C4 + (C2 + C1)*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*CF*R1)*R6
      + ((C2*C4 + C2*C3)*C5*CF*R3 + (C2*C4 + C2*C3)*C5*CF*R1)*R5
      + (((C3 + C2)*C4*C5 + C2*C3*C4)*CF*R3 + ((C3 + C2)*C4*C5 + C2*C3*C4)*CF*R1)*R4
      + ((C2*C4 + C2*C3)*C5*CF*R2 + (((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*C6
        + (C1*C4 + C1*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*CF*R1)*R3
      + (C2*C4 + C2*C3)*C5*CF*R1*R2)*RB2 + ((((C4 + C3)*C5*C6
        + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R5
        + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF*R4
        + (((C4 + C3 + C1)*C5 + C1*C4 + C1*C3)*C6
          + ((C2 + C1)*C4 + (C2 + C1)*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*CF*R3
        + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
        + ((C1*C5 + C1*C4 + C1*C3)*C6 + C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*CF*R1)*R6
        + (C3*C4*C5*CF*R4 + ((C4 + C3)*C5*C6 + (C2*C4 + C2*C3)*C5)*CF*R3
          + (C1*C4 + C1*C3)*C5*CF*R1)*R5 + (((C4*C5 + C3*C4)*C6 + (C3 + C2)*C4*C5
            + C2*C3*C4)*CF*R3 + C3*C4*C5*CF*R2 + (C1*C4*C5 + C1*C3*C4)*CF*R1)*R4
        + (((C4 + C3)*C5*C6 + (C2*C4 + C2*C3)*C5)*CF*R2
          + ((C1*C5 + C1*C4 + C1*C3)*C6 + (C1*C4 + C1*C3 + C1*C2)*C5 + C1*C2*C4
            + C1*C2*C3)*CF*R1)*R3 + (C1*C4 + C1*C3)*C5*CF*R1*R2)*RB1
      + ((((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R3
        + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1)*R5
        + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF*R3
          + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF*R1)*R4
        + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
          + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1)*R3
        + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1*R2)*R6
      + ((C3*C4*C5*CF*R3 + C3*C4*C5*CF*R1)*R4
        + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1*R3)*R5
      + ((C3*C4*C5*CF*R2 + ((C4*C5 + C3*C4)*C6 + (C3 + C2 + C1)*C4*C5
        + (C2 + C1)*C3*C4)*CF*R1)*R3 + C3*C4*C5*CF*R1*R2)*R4
      + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1*R2*R3)*RF
    + ((((((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF
      + (C2*C4 + C2*C3)*C5*C6)*R5 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
        + (C2 + C1)*C3*C4)*CF + ((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + (C2 + C1)*C3*C4*C5)
      *R4 + (((C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*C6*CF + (C2 + C1)*C3*C5*C6)
      *R3 + (((C2*C5 + C2*C4 + C2*C3)*C6 + C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*CF
        + C2*C3*C5*C6 + C1*C2*C3*C5)*R2 + (((C1*C5 + C1*C4 + C1*C3)*C6 + C1*C2*C5
          + C1*C2*C4 + C1*C2*C3)*CF + ((C1*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*C6
          + C1*C2*C3*C5)*R1)*R6 + (C3*C4*C5*CF*R4 + (C4 + C3)*C5*C6*CF*R3
            + (C2*C4 + C2*C3)*C5*CF*R2 + (C1*C4 + C1*C3)*C5*CF*R1)*R5
      + (((C4*C5 + C3*C4)*C6*CF + C3*C4*C5*C6)*R3
        + ((C2*C4*C5 + C2*C3*C4)*CF + C2*C3*C4*C5)*R2
        + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R1)*R4
      + (((C2*C5 + C2*C4 + C2*C3)*C6*CF + C2*C3*C5*C6)*R2
        + ((C1*C5 + C1*C4 + C1*C3)*C6*CF + C1*C3*C5*C6)*R1)*R3
      + ((C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*CF + C1*C2*C3*C5)*R1*R2)*RB1
      + ((((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R3
        + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF
          + (C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R1)*R5
        + ((((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R3 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
            + (C2 + C1)*C3*C4)*CF + ((C3 + C2)*C4*C5 + C2*C3*C4)*C6
            + ((C2 + C1)*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*R1)*R4
        + ((((C2*C5 + C2*C4 + C2*C3)*C6 + C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*CF
          + C2*C3*C5*C6 + C1*C2*C3*C5)*R2 + (((C2*C5 + C2*C4 + C2*C3)*C6 + C1*C2*C5
            + C1*C2*C4 + C1*C2*C3)*CF + C2*C3*C5*C6 + C1*C2*C3*C5)*R1)*R3
        + (((C2*C5 + C2*C4 + C2*C3)*C6 + C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*CF
          + C2*C3*C5*C6 + C1*C2*C3*C5)*R1*R2)*R6
      + ((C3*C4*C5*CF*R3 + C3*C4*C5*CF*R1)*R4 + ((C2*C4 + C2*C3)*C5*CF*R2
        + ((C4 + C3)*C5*C6 + (C1*C4 + C1*C3)*C5)*CF*R1)*R3
        + (C2*C4 + C2*C3)*C5*CF*R1*R2)*R5 + ((((C2*C4*C5 + C2*C3*C4)*CF + C2*C3*C4*C5)
          *R2 + (((C4*C5 + C3*C4)*C6 + C1*C4*C5 + C1*C3*C4)*CF + C3*C4*C5*C6
            + C1*C3*C4*C5)*R1)*R3 + ((C2*C4*C5 + C2*C3*C4)*CF + C2*C3*C4*C5)*R1*R2)*R4
      + (((C2*C5 + C2*C4 + C2*C3)*C6 + C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*CF
        + C2*C3*C5*C6 + C1*C2*C3*C5)*R1*R2*R3)*RB2
    + ((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R4
      + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R3
      + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
      + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R1)*R5
      + ((((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
        + (C2 + C1)*C3*C4*C5)*R3 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
          + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2
        + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R1)*R4
      + ((((C1*C5 + C1*C4 + C1*C3)*C6 + C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*CF
        + C1*C3*C5*C6 + C1*C2*C3*C5)*R2 + (((C1*C5 + C1*C4 + C1*C3)*C6 + C1*C2*C5
          + C1*C2*C4 + C1*C2*C3)*CF + C1*C3*C5*C6 + C1*C2*C3*C5)*R1)*R3
      + (((C1*C5 + C1*C4 + C1*C3)*C6 + C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*CF
        + C1*C3*C5*C6 + C1*C2*C3*C5)*R1*R2)*R6
      + ((C3*C4*C5*CF*R3 + C3*C4*C5*CF*R2 + C1*C3*C4*C5*R1)*R4
        + (((C4 + C3)*C5*C6 + (C2*C4 + C2*C3)*C5)*CF*R2 + (C1*C4 + C1*C3)*C5*CF*R1)*R3
        + (C1*C4 + C1*C3)*C5*CF*R1*R2)*R5 + (((((C4*C5 + C3*C4)*C6 + C2*C4*C5
          + C2*C3*C4)*CF + C3*C4*C5*C6 + C2*C3*C4*C5)*R2
          + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R1)*R3
          + ((C1*C4*C5 + C1*C3*C4)*CF + C1*C3*C4*C5)*R1*R2)*R4
      + (((C1*C5 + C1*C4 + C1*C3)*C6 + C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*CF
        + C1*C3*C5*C6 + C1*C2*C3*C5)*R1*R2*R3)*RB1
    + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R4
      + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R2
        + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1)*R3
      + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*CF*R1*R2)*R5
      + (((((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
        + (C2 + C1)*C3*C4*C5)*R2 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
          + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R3
        + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF + C3*C4*C5*C6
          + (C2 + C1)*C3*C4*C5)*R1*R2)*R4)*R6 + (((C3*C4*C5*CF*R2 + C3*C4*C5*CF*R1)*R3
            + C3*C4*C5*CF*R1*R2)*R4 + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)
            *CF*R1*R2*R3)*R5 + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*CF
              + C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R2*R3*R4,

    ((((C2*C3*C4*C5*CF*RB2 + C1*C3*C4*C5*CF*RB1
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R6
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3)*RF
      + (C1*C3*C4*C5*CF*RB1 + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF
        + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R6 + (C3*C4*C5*C6 + C1*C3*C4*C5)*CF*R3
        + C2*C3*C4*C5*CF*R2)*RB2 + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R6
          + C1*C3*C4*C5*CF*R3 + C1*C3*C4*C5*CF*R2)*RB1
      + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2)*R6
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2*R3)*RIN
      + ((C2*C3*C4*C5*CF*RB1 + C2*C3*C4*C5*CF*R3 + C2*C3*C4*C5*CF*R1)*RB2
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R6
          + (C3*C4*C5*C6 + C2*C3*C4*C5)*CF*R3 + C1*C3*C4*C5*CF*R1)*RB1
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R6
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R3)*RF
      + ((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6)*R6
        + C3*C4*C5*C6*CF*R3 + C2*C3*C4*C5*CF*R2 + C1*C3*C4*C5*CF*R1)*RB1
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
          + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)
          *R1)*R6 + (C2*C3*C4*C5*CF*R2 + (C3*C4*C5*C6 + C1*C3*C4*C5)*CF*R1)*R3
        + C2*C3*C4*C5*CF*R1*R2)*RB2 + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R6
          + ((C3*C4*C5*C6 + C2*C3*C4*C5)*CF*R2 + C1*C3*C4*C5*CF*R1)*R3
          + C1*C3*C4*C5*CF*R1*R2)*RB1 + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R3
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2)*R6
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2*R3)*RT1
      + (((((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*CF*RB1
        + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R6 + C2*C3*C4*C5*CF*R4
        + ((C2*C4 + C2*C3)*C5*C6 + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R3
        + C2*C3*C4*C5*CF*R1)*RB2 + ((((C3 + C1)*C4 + C1*C3)*C5*C6
          + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R6 + C1*C3*C4*C5*CF*R4
          + (((C3 + C1)*C4 + C1*C3)*C5*C6 + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R3
          + C1*C3*C4*C5*CF*R1)*RB1 + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R4
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R6
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3*R4
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R3)*RF
        + ((((((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)
          *C5)*CF + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*R6
          + C1*C3*C4*C5*CF*R4 + ((C3 + C1)*C4 + C1*C3)*C5*C6*CF*R3
          + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*CF*R2 + C1*C3*C4*C5*CF*R1)*RB1
          + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)
            *R4 + ((((C3 + C2)*C4 + C2*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)
              *C5)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3
            + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R2
            + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)
            *R1)*R6 + ((C3*C4*C5*C6 + C1*C3*C4*C5)*CF*R3 + C2*C3*C4*C5*CF*R2)*R4
          + (((C2*C4 + C2*C3)*C5*C6 + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R2
            + (C3*C4*C5*C6 + C1*C3*C4*C5)*CF*R1)*R3 + C2*C3*C4*C5*CF*R1*R2)*RB2
        + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R4
          + ((((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)
            *CF + C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3
          + (((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)
          *CF*R2 + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R6
          + (C1*C3*C4*C5*CF*R3 + C1*C3*C4*C5*CF*R2)*R4
          + ((((C3 + C1)*C4 + C1*C3)*C5*C6 + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R2
            + C1*C3*C4*C5*CF*R1)*R3 + C1*C3*C4*C5*CF*R1*R2)*RB1
        + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2)*R4
          + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2)*R6
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2*R3*R4
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2*R3)*RIN
      + (((((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R6
        + C2*C3*C4*C5*CF*R4 + (C2*C4 + C2*C3)*C5*C6*CF*R3
        + (C1*C2*C4 + C1*C2*C3)*C5*CF*R1)*RB1 + (((C2*C4 + C2*C3)*C5*C6
          + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R3 + ((C2*C4 + C2*C3)*C5*C6
            + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R6 + (C2*C3*C4*C5*CF*R3
              + C2*C3*C4*C5*CF*R1)*R4 + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)
              *CF*R1*R3)*RB2 + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R4
                + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R3
                + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R6
                + ((C3*C4*C5*C6 + C2*C3*C4*C5)*CF*R3 + C1*C3*C4*C5*CF*R1)*R4
                + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R3)*RB1
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R4*R6
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R3*R4)*RF
      + (((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6)*R4
        + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5*C6*CF*R3
        + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R2
        + (((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF
          + (C1*C2*C4 + C1*C2*C3)*C5*C6)*R1)*R6 + (C3*C4*C5*C6*CF*R3 + C2*C3*C4*C5*CF*R2
            + C1*C3*C4*C5*CF*R1)*R4 + ((C2*C4 + C2*C3)*C5*C6*CF*R2
              + (C1*C4 + C1*C3)*C5*C6*CF*R1)*R3 + (C1*C2*C4 + C1*C2*C3)*C5*CF*R1*R2)*RB1
        + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
          + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)
          *R1)*R4 + (((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R2
            + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R3
          + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2)*R6
        + ((C2*C3*C4*C5*CF*R2 + (C3*C4*C5*C6 + C1*C3*C4*C5)*CF*R1)*R3
          + C2*C3*C4*C5*CF*R1*R2)*R4 + ((C2*C4 + C2*C3)*C5*C6
            + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2*R3)*RB2
      + ((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R4
        + (((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R2
          + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R3
        + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2)*R6
        + (((C3*C4*C5*C6 + C2*C3*C4*C5)*CF*R2 + C1*C3*C4*C5*CF*R1)*R3
          + C1*C3*C4*C5*CF*R1*R2)*R4 + ((C1*C4 + C1*C3)*C5*C6
            + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2*R3)*RB1
      + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R3
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2)*R4*R6
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2*R3*R4)*RT2
    + ((((((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*RB1
      + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
        + C1*C2*C3*C4)*CF*R6 + C2*C3*C4*C5*CF*R5
      + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + (C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF
      *R3 + C2*C3*C4*C5*CF*R2)*RB2 + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5
        + C1*C2*C3*C4)*CF*R6 + C1*C3*C4*C5*CF*R5
        + ((C1*C4*C5 + C1*C3*C4)*C6 + (C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R3
        + C1*C3*C4*C5*CF*R2)*RB1 + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R5
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2)*R6
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3*R5
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2*R3)*RF
      + (((((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF
        + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*R6
        + C1*C3*C4*C5*CF*R5 + ((C1*C4*C5 + C1*C3*C4)*C6*CF + C1*C3*C4*C5*C6)*R3
        + ((C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C2*C3*C4*C5)*R2)*RB1
        + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)
          *R5 + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF
            + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3 + (((C2*C4*C5 + C2*C3*C4)*C6
              + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2)*R6
        + ((C3*C4*C5*C6 + C1*C3*C4*C5)*CF*R3 + C2*C3*C4*C5*CF*R2)*R5
        + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6
          + C1*C2*C3*C4*C5)*R2*R3)*RB2 + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R5
            + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
              + C1*C2*C3*C4*C5)*R3 + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)
                *CF + C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2)*R6
            + (C1*C3*C4*C5*CF*R3 + C1*C3*C4*C5*CF*R2)*R5
            + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
              + C1*C2*C3*C4*C5)*R2*R3)*RB1 + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
                + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2)*R5*R6
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2*R3*R5)*RIN
      + ((((((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
        + C1*C2*C3*C4)*CF*R6 + C2*C3*C4*C5*CF*R5
        + ((C3 + C2)*C4*C5 + C2*C3*C4)*C6*CF*R3 + C2*C3*C4*C5*CF*R2
        + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R1)*RB1
        + ((((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
          + C1*C2*C3*C4)*CF*R3 + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6
            + ((C2 + C1)*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R1)*R6
        + (C2*C3*C4*C5*CF*R3 + C2*C3*C4*C5*CF*R1)*R5
        + (C2*C3*C4*C5*CF*R2 + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6
          + (C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R1)*R3 + C2*C3*C4*C5*CF*R1*R2)*RB2
        + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R5
          + (((C3 + C1)*C4*C5 + C1*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
            + C1*C2*C3*C4)*CF*R3 + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
          + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF*R1)*R6
          + ((C3*C4*C5*C6 + C2*C3*C4*C5)*CF*R3 + C1*C3*C4*C5*CF*R1)*R5
          + ((C3*C4*C5*C6 + C2*C3*C4*C5)*CF*R2 + ((C1*C4*C5 + C1*C3*C4)*C6
            + (C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R1)*R3 + C1*C3*C4*C5*CF*R1*R2)*RB1
        + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R5
          + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2)*R6
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R3*R5
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2*R3)*RF
      + (((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6)*R5
        + (((C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*C6*CF + (C2 + C1)*C3*C4*C5*C6)*R3
        + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6
          + C1*C2*C3*C4*C5)*R2 + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)
            *CF + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*R1)*R6
        + (C3*C4*C5*C6*CF*R3 + C2*C3*C4*C5*CF*R2 + C1*C3*C4*C5*CF*R1)*R5
        + (((C2*C4*C5 + C2*C3*C4)*C6*CF + C2*C3*C4*C5*C6)*R2
          + ((C1*C4*C5 + C1*C3*C4)*C6*CF + C1*C3*C4*C5*C6)*R1)*R3
        + ((C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C2*C3*C4*C5)*R1*R2)*RB1
        + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
          + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)
          *R1)*R5 + ((((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF
            + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2 + (((C2*C4*C5 + C2*C3*C4)*C6
              + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
          + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6
            + C1*C2*C3*C4*C5)*R1*R2)*R6 + ((C2*C3*C4*C5*CF*R2
              + (C3*C4*C5*C6 + C1*C3*C4*C5)*CF*R1)*R3 + C2*C3*C4*C5*CF*R1*R2)*R5
        + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6
          + C1*C2*C3*C4*C5)*R1*R2*R3)*RB2 + ((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
            + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R5
            + ((((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
              + C1*C2*C3*C4*C5)*R2 + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)
                *CF + C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
            + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
              + C1*C2*C3*C4*C5)*R1*R2)*R6 + (((C3*C4*C5*C6 + C2*C3*C4*C5)*CF*R2
                + C1*C3*C4*C5*CF*R1)*R3 + C1*C3*C4*C5*CF*R1*R2)*R5
            + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
              + C1*C2*C3*C4*C5)*R1*R2*R3)*RB1 + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
                + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R3
                + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2)*R5*R6
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2*R3*R5)*RT1
    + ((((((((C3 + C2 + C1)*C4 + C1*C3 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4
      + C1*C2*C3)*C6 + ((C2 + C1)*C3*C4 + C1*C2*C3)*C5 + C1*C2*C3*C4)*CF*R6
      + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*CF*R5
      + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R4
      + (((C3 + C2 + C1)*C4 + C1*C3 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4 + C1*C2*C3)*C6
      *CF*R3 + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*CF*R2
      + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R1)*RB1
      + (((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R5
        + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
          + C1*C2*C3*C4)*CF*R4 + (((C3*C4 + C2*C3)*C5 + C2*C3*C4)*C6
            + ((C2 + C1)*C3*C4 + C1*C2*C3)*C5 + C1*C2*C3*C4)*CF*R3
        + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R2
        + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
          + C1*C2*C3*C4)*CF*R1)*R6 + (C2*C3*C4*C5*CF*R4
            + ((C2*C4 + C2*C3)*C5*C6 + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R3
            + C2*C3*C4*C5*CF*R1)*R5 + ((((C3 + C2)*C4*C5 + C2*C3*C4)*C6
              + (C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R3 + C2*C3*C4*C5*CF*R2)*R4
      + (((C2*C4 + C2*C3)*C5*C6 + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R2
        + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + (C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF
        *R1)*R3 + C2*C3*C4*C5*CF*R1*R2)*RB2 + (((((C3 + C1)*C4 + C1*C3)*C5*C6
          + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R5
          + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF*R4
          + (((C3*C4 + C1*C3)*C5 + C1*C3*C4)*C6 + ((C2 + C1)*C3*C4 + C1*C2*C3)*C5
            + C1*C2*C3*C4)*CF*R3 + (((C3 + C1)*C4 + C1*C3)*C5*C6
              + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R2
          + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF*R1)*R6
          + (C1*C3*C4*C5*CF*R4 + (((C3 + C1)*C4 + C1*C3)*C5*C6
            + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R3 + C1*C3*C4*C5*CF*R1)*R5
          + (((C1*C4*C5 + C1*C3*C4)*C6 + (C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R3
            + C1*C3*C4*C5*CF*R2)*R4 + ((((C3 + C1)*C4 + C1*C3)*C5*C6
              + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R2
              + ((C1*C4*C5 + C1*C3*C4)*C6 + (C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R1)*R3
          + C1*C3*C4*C5*CF*R1*R2)*RB1 + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R4
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R5
            + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
              + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2)*R4
            + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
              + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R3
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2)*R6
      + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3*R4
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R3)*R5
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2*R3*R4
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2*R3)*RF
      + (((((((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)
        *C5)*CF + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*R5
        + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF
          + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*R4
        + ((((C2 + C1)*C4 + C1*C2)*C5 + ((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C6*CF
          + (((C2 + C1)*C3*C4 + C1*C2*C3)*C5 + C1*C2*C3*C4)*C6)*R3
        + ((((C2*C4 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4 + C1*C2*C3)*C6 + C1*C2*C4*C5
          + C1*C2*C3*C4)*CF + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*R2
        + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF
          + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*R1)*R6
        + (C1*C3*C4*C5*CF*R4 + ((C3 + C1)*C4 + C1*C3)*C5*C6*CF*R3
          + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*CF*R2 + C1*C3*C4*C5*CF*R1)*R5
        + (((C1*C4*C5 + C1*C3*C4)*C6*CF + C1*C3*C4*C5*C6)*R3
          + ((C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C2*C3*C4*C5)*R2)*R4
        + ((((C2*C4 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4 + C1*C2*C3)*C6*CF
          + (C2*C3*C4 + C1*C2*C3)*C5*C6)*R2 + ((C1*C4*C5 + C1*C3*C4)*C6*CF
            + C1*C3*C4*C5*C6)*R1)*R3 + ((C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C2*C3*C4*C5)
            *R1*R2)*RB1 + ((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6
              + C1*C2*C3*C4*C5)*R4 + ((((C3 + C2)*C4 + C2*C3)*C5*C6
                + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF + C2*C3*C4*C5*C6
                + C1*C2*C3*C4*C5)*R3 + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF
              *R2 + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)
              *R1)*R5 + ((((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF
                + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3 + (((C2*C4*C5 + C2*C3*C4)*C6
                  + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2)*R4
              + ((((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6
                + C1*C2*C3*C4*C5)*R2 + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)
                  *CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
              + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6
                + C1*C2*C3*C4*C5)*R1*R2)*R6 + (((C3*C4*C5*C6 + C1*C3*C4*C5)*CF*R3
                  + C2*C3*C4*C5*CF*R2)*R4 + (((C2*C4 + C2*C3)*C5*C6
                    + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R2
                    + (C3*C4*C5*C6 + C1*C3*C4*C5)*CF*R1)*R3 + C2*C3*C4*C5*CF*R1*R2)*R5
        + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6
          + C1*C2*C3*C4*C5)*R2*R3*R4 + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5
            + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2*R3)*RB2
      + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R4
        + ((((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)
          *CF + C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3
        + (((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)
        *CF*R2 + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R5
        + ((((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
          + C1*C2*C3*C4*C5)*R3 + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)
            *CF + C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2)*R4
        + ((((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
          + C1*C2*C3*C4*C5)*R2 + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)
            *CF + C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
        + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
          + C1*C2*C3*C4*C5)*R1*R2)*R6 + ((C1*C3*C4*C5*CF*R3 + C1*C3*C4*C5*CF*R2)*R4
            + ((((C3 + C1)*C4 + C1*C3)*C5*C6 + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*CF*R2
              + C1*C3*C4*C5*CF*R1)*R3 + C1*C3*C4*C5*CF*R1*R2)*R5
        + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
          + C1*C2*C3*C4*C5)*R2*R3*R4 + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5
            + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2*R3)*RB1
      + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2)*R4
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R3
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2)*R5*R6
      + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2*R3*R4
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2*R3)*R5)*RIN
    + ((((((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R5
      + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
        + C1*C2*C3*C4)*CF*R4 + (((C2 + C1)*C4 + (C2 + C1)*C3 + C1*C2)*C5 + C1*C2*C4
          + C1*C2*C3)*C6*CF*R3 + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF
      *R2 + (((C1*C4 + C1*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*C6
        + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R6 + (C2*C3*C4*C5*CF*R4
          + (C2*C4 + C2*C3)*C5*C6*CF*R3 + (C1*C2*C4 + C1*C2*C3)*C5*CF*R1)*R5
      + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6*CF*R3 + C2*C3*C4*C5*CF*R2
        + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R1)*R4
      + ((C2*C4 + C2*C3)*C5*C6*CF*R2 + ((C1*C4 + C1*C3 + C1*C2)*C5 + C1*C2*C4
        + C1*C2*C3)*C6*CF*R1)*R3 + (C1*C2*C4 + C1*C2*C3)*C5*CF*R1*R2)*RB1
      + ((((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R3
        + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R5
        + ((((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
          + C1*C2*C3*C4)*CF*R3 + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6
            + ((C2 + C1)*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R1)*R4
        + (((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R2
          + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R3
        + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2)*R6
      + ((C2*C3*C4*C5*CF*R3 + C2*C3*C4*C5*CF*R1)*R4
        + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R3)*R5
      + ((C2*C3*C4*C5*CF*R2 + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6
        + (C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R1)*R3 + C2*C3*C4*C5*CF*R1*R2)*R4
      + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2*R3)*RB2
      + ((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R4
        + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R3
        + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R5
        + ((((C3 + C1)*C4*C5 + C1*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
          + C1*C2*C3*C4)*CF*R3 + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
          + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF*R1)*R4
        + (((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R2
          + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R3
        + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2)*R6
        + (((C3*C4*C5*C6 + C2*C3*C4*C5)*CF*R3 + C1*C3*C4*C5*CF*R1)*R4
          + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R3)*R5
        + (((C3*C4*C5*C6 + C2*C3*C4*C5)*CF*R2 + ((C1*C4*C5 + C1*C3*C4)*C6
          + (C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*CF*R1)*R3 + C1*C3*C4*C5*CF*R1*R2)*R4
        + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2*R3)*RB1
      + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R4*R5
        + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2)*R4)*R6
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R3*R4*R5
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2*R3*R4)*RF
    + ((((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6)*R4
      + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5*C6*CF*R3
      + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R2
      + (((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF
        + (C1*C2*C4 + C1*C2*C3)*C5*C6)*R1)*R5 + ((((C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)
          *C6*CF + (C2 + C1)*C3*C4*C5*C6)*R3 + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5
            + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2
          + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF
            + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*R1)*R4
      + (((C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*C6*CF + C1*C2*C3*C5*C6)*R2
        + ((C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*C6*CF + C1*C2*C3*C5*C6)*R1)*R3
      + ((C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*C6*CF + C1*C2*C3*C5*C6)*R1*R2)*R6
      + ((C3*C4*C5*C6*CF*R3 + C2*C3*C4*C5*CF*R2 + C1*C3*C4*C5*CF*R1)*R4
        + ((C2*C4 + C2*C3)*C5*C6*CF*R2 + (C1*C4 + C1*C3)*C5*C6*CF*R1)*R3
        + (C1*C2*C4 + C1*C2*C3)*C5*CF*R1*R2)*R5
      + ((((C2*C4*C5 + C2*C3*C4)*C6*CF + C2*C3*C4*C5*C6)*R2
        + ((C1*C4*C5 + C1*C3*C4)*C6*CF + C1*C3*C4*C5*C6)*R1)*R3
        + ((C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C2*C3*C4*C5)*R1*R2)*R4
      + ((C1*C2*C5 + C1*C2*C4 + C1*C2*C3)*C6*CF + C1*C2*C3*C5*C6)*R1*R2*R3)*RB1
      + ((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R3
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)
        *R1)*R4 + (((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R2
          + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R3
        + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2)*R5
        + (((((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF
          + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2 + (((C2*C4*C5 + C2*C3*C4)*C6
            + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
          + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6
            + C1*C2*C3*C4*C5)*R1*R2)*R4)*R6 + (((C2*C3*C4*C5*CF*R2
              + (C3*C4*C5*C6 + C1*C3*C4*C5)*CF*R1)*R3 + C2*C3*C4*C5*CF*R1*R2)*R4
              + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2*R3)*R5
      + (((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C2*C3*C4*C5*C6
        + C1*C2*C3*C4*C5)*R1*R2*R3*R4)*RB2 + (((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF
          *R3 + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R2
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R4
          + (((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R2
            + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1)*R3
          + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2)*R5
          + (((((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF
            + C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2 + (((C1*C4*C5 + C1*C3*C4)*C6
              + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
            + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
              + C1*C2*C3*C4*C5)*R1*R2)*R4)*R6 + ((((C3*C4*C5*C6 + C2*C3*C4*C5)*CF*R2
                + C1*C3*C4*C5*CF*R1)*R3 + C1*C3*C4*C5*CF*R1*R2)*R4
                + ((C1*C4 + C1*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*CF*R1*R2*R3)*R5
          + (((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*CF + C1*C3*C4*C5*C6
            + C1*C2*C3*C4*C5)*R1*R2*R3*R4)*RB1 + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF
              *R2 + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1)*R3
              + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2)*R4*R5*R6
    + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*CF*R1*R2*R3*R4*R5,

    (((((C1*C2*C3*C4*C5*CF*RB1 + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R6
      + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3)*RB2
      + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R6
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3)*RB1)*RF
      + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF + C1*C2*C3*C4*C5*C6)*R6
        + C1*C3*C4*C5*C6*CF*R3 + C1*C2*C3*C4*C5*CF*R2)*RB1
        + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3)*RB2
      + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R6
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3)*RB1)*RIN
      + ((((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R6 + C2*C3*C4*C5*C6*CF*R3
        + C1*C2*C3*C4*C5*CF*R1)*RB1 + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3)*RB2
        + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R6
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3)*RB1)*RF
      + ((((C2 + C1)*C3*C4*C5*C6*CF*R3 + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF + C1*C2*C3*C4*C5*C6)*R1)*R6
        + (C2*C3*C4*C5*C6*CF*R2 + C1*C3*C4*C5*C6*CF*R1)*R3 + C1*C2*C3*C4*C5*CF*R1*R2)
        *RB1 + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3)*RB2
      + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R6
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3)*RB1)*RT1
      + (((((((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*CF*R6
        + C1*C2*C3*C4*C5*CF*R4 + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6*CF*R3
        + C1*C2*C3*C4*C5*CF*R1)*RB1 + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R4
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3*R4
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3)*RB2
        + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R4
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R6
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3*R4
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3)*RB1)*RF
        + (((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF + C1*C2*C3*C4*C5*C6)*R4
          + ((((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6*CF + C1*C2*C3*C4*C5*C6)*R3
          + (((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
          + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF + C1*C2*C3*C4*C5*C6)*R1)*R6
          + (C1*C3*C4*C5*C6*CF*R3 + C1*C2*C3*C4*C5*CF*R2)*R4
          + (((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6*CF*R2 + C1*C3*C4*C5*C6*CF*R1)*R3
          + C1*C2*C3*C4*C5*CF*R1*R2)*RB1 + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
            + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R4
            + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
              + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
            + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R6
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3*R4
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3)*RB2
        + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R4
          + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
            + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R6
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3*R4
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3)*RB1)*RIN
      + (((((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R4
        + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R3 + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1)*R6
        + (C2*C3*C4*C5*C6*CF*R3 + C1*C2*C3*C4*C5*CF*R1)*R4
        + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1*R3)*RB1
        + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R4*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3*R4)*RB2
        + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R4*R6
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3*R4)*RB1)*RF
      + (((((C2 + C1)*C3*C4*C5*C6*CF*R3 + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF + C1*C2*C3*C4*C5*C6)*R1)*R4
        + ((C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R2 + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1)*R3
        + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1*R2)*R6
        + ((C2*C3*C4*C5*C6*CF*R2 + C1*C3*C4*C5*C6*CF*R1)*R3 + C1*C2*C3*C4*C5*CF*R1*R2)
        *R4 + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1*R2*R3)*RB1
        + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R4*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3*R4)*RB2
      + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R4*R6
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3*R4)*RB1)*RT2
    + ((((((((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*CF*R6
      + C1*C2*C3*C4*C5*CF*R5 + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6*CF*R3
      + C1*C2*C3*C4*C5*CF*R2)*RB1 + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R5
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R6
      + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3*R5
      + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3)*RB2
      + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R5
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R6
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3*R5
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3)*RB1)*RF
      + (((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF + C1*C2*C3*C4*C5*C6)*R5
        + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R3
        + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R2)*R6
        + (C1*C3*C4*C5*C6*CF*R3 + C1*C2*C3*C4*C5*CF*R2)*R5
        + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R2*R3)*RB1
        + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R5*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3*R5)*RB2
      + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R5*R6
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3*R5)*RB1)*RIN
      + (((((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R5
        + (((C2 + C1)*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6*CF*R3
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
        + (((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*CF*R1)*R6
        + (C2*C3*C4*C5*C6*CF*R3 + C1*C2*C3*C4*C5*CF*R1)*R5
        + (C2*C3*C4*C5*C6*CF*R2 + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6*CF*R1)*R3
        + C1*C2*C3*C4*C5*CF*R1*R2)*RB1 + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R5
          + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
            + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3*R5
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3)*RB2
        + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R5
          + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
            + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R6
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3*R5
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3)*RB1)*RF
      + (((((C2 + C1)*C3*C4*C5*C6*CF*R3 + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF + C1*C2*C3*C4*C5*C6)*R1)*R5
        + (((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R2
          + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R1)*R3
        + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R1*R2)*R6
        + ((C2*C3*C4*C5*C6*CF*R2 + C1*C3*C4*C5*C6*CF*R1)*R3 + C1*C2*C3*C4*C5*CF*R1*R2)
        *R5 + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R1*R2*R3)*RB1
        + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R5*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3*R5)*RB2
      + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R5*R6
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3*R5)*RB1)*RT1
    + ((((((((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*CF*R5
      + (((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*CF*R4
      + (((C2 + C1)*C3*C4 + C1*C2*C3)*C5 + C1*C2*C3*C4)*C6*CF*R3
      + (((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
      + (((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*CF*R1)*R6
      + (C1*C2*C3*C4*C5*CF*R4 + ((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6*CF*R3
        + C1*C2*C3*C4*C5*CF*R1)*R5 + (((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6*CF*R3
          + C1*C2*C3*C4*C5*CF*R2)*R4 + (((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6*CF*R2
            + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6*CF*R1)*R3
      + C1*C2*C3*C4*C5*CF*R1*R2)*RB1 + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R4
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R5
        + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R4
        + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R6
      + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3*R4
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3)*R5
      + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3*R4
      + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3)*RB2
      + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R4
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R5
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R4
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R6
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3*R4
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3)*R5
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3*R4
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3)*RB1)*RF
      + ((((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF + C1*C2*C3*C4*C5*C6)*R4
        + ((((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6*CF + C1*C2*C3*C4*C5*C6)*R3
        + (((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF + C1*C2*C3*C4*C5*C6)*R1)*R5
        + (((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R3
          + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R2)*R4
        + (((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R2
          + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R1)*R3
        + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R1*R2)*R6
        + ((C1*C3*C4*C5*C6*CF*R3 + C1*C2*C3*C4*C5*CF*R2)*R4
          + (((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6*CF*R2 + C1*C3*C4*C5*C6*CF*R1)*R3
          + C1*C2*C3*C4*C5*CF*R1*R2)*R5 + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF
            + C1*C2*C3*C4*C5*C6)*R2*R3*R4 + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF
              + C1*C2*C3*C4*C5*C6)*R1*R2*R3)*RB1 + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
                + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R4
                + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
                  + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
                + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R5*R6
        + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3*R4
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3)*R5)*RB2
      + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2)*R4
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R5*R6
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2*R3*R4
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3)*R5)*RB1)*RIN
    + ((((((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R4
      + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R3 + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1)*R5
      + ((((C2 + C1)*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6*CF*R3
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
        + (((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*CF*R1)*R4
      + ((C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R2 + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1)*R3
      + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1*R2)*R6
      + ((C2*C3*C4*C5*C6*CF*R3 + C1*C2*C3*C4*C5*CF*R1)*R4
        + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1*R3)*R5
      + ((C2*C3*C4*C5*C6*CF*R2 + ((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6*CF*R1)*R3
        + C1*C2*C3*C4*C5*CF*R1*R2)*R4 + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1*R2*R3)*RB1
      + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R4*R5
        + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R4)*R6
      + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3*R4*R5
      + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3*R4)*RB2
      + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R4*R5
        + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R4)*R6
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R3*R4*R5
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3*R4)*RB1)*RF
    + ((((((C2 + C1)*C3*C4*C5*C6*CF*R3 + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
      + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF + C1*C2*C3*C4*C5*C6)*R1)*R4
      + ((C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R2 + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1)*R3
      + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1*R2)*R5
      + ((((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R2
        + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R1)*R3
        + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R1*R2)*R4)*R6
      + (((C2*C3*C4*C5*C6*CF*R2 + C1*C3*C4*C5*C6*CF*R1)*R3
        + C1*C2*C3*C4*C5*CF*R1*R2)*R4 + (C1*C2*C4 + C1*C2*C3)*C5*C6*CF*R1*R2*R3)*R5
      + ((C1*C2*C4*C5 + C1*C2*C3*C4)*C6*CF + C1*C2*C3*C4*C5*C6)*R1*R2*R3*R4)*RB1
      + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R4*R5*R6
      + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3*R4*R5)*RB2
    + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R2
      + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1)*R3
      + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2)*R4*R5*R6
      + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*CF*R1*R2*R3*R4*R5)*RB1,

    C1*C2*C3*C4*C5*C6*CF*RB1*RB2*(((((R6 + R3)*RF + (R3 + R2)*R6 + R2*R3)*RIN
      + ((R3 + R1)*R6 + R1*R3)*RF + ((R2 + R1)*R3 + R1*R2)*R6 + R1*R2*R3)*RT1
      + (((R4 + R3 + R1)*R6 + R3*R4 + R1*R3)*RF
        + ((R3 + R2)*R4 + (R2 + R1)*R3 + R1*R2)*R6 + R2*R3*R4 + R1*R2*R3)*RIN
      + ((R3 + R1)*R4*R6 + R1*R3*R4)*RF + ((R2 + R1)*R3 + R1*R2)*R4*R6
      + R1*R2*R3*R4)*RT2 + ((((R5 + R3 + R2)*R6 + R3*R5 + R2*R3)*RF
        + (R3 + R2)*R5*R6 + R2*R3*R5)*RIN + (((R3 + R1)*R5 + (R2 + R1)*R3 + R1*R2)*R6
          + R1*R3*R5 + R1*R2*R3)*RF + ((R2 + R1)*R3 + R1*R2)*R5*R6 + R1*R2*R3*R5)*RT1
      + ((((R4 + R3 + R1)*R5 + (R3 + R2)*R4 + (R2 + R1)*R3 + R1*R2)*R6
        + (R3*R4 + R1*R3)*R5 + R2*R3*R4 + R1*R2*R3)*RF
        + ((R3 + R2)*R4 + (R2 + R1)*R3 + R1*R2)*R5*R6 + (R2*R3*R4 + R1*R2*R3)*R5)*RIN
      + (((R3 + R1)*R4*R5 + ((R2 + R1)*R3 + R1*R2)*R4)*R6 + R1*R3*R4*R5
        + R1*R2*R3*R4)*RF + ((R2 + R1)*R3 + R1*R2)*R4*R5*R6 + R1*R2*R3*R4*R5)
  ];

  // Transfer function numerator coefficients
  const numCoeffs = [
    - (C5 + C4 + C3)*(RF + RB2 + R2),

    - (((C4 + C3)*C5*RF + (C4 + C3)*C5*RB2 + (C4 + C3)*C5*R2)*RT2
      + ((C4*C5 + C3*C4)*RF + (C4*C5 + C3*C4)*RB2 + (C4*C5 + C3*C4)*R2)*RT1
      + (((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*RB2 + (C4*C5 + C3*C4)*RB1
        + ((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4 + (C2 + C1)*C3)*R6
        + (C4 + C3)*C5*R5 + (C4*C5 + C3*C4)*R4 + (C3*C5 + C3*C4)*R3 + (C4 + C3)*C5*R2
        + (C4*C5 + C3*C4)*R1)*RF + (C3*C4*RB1 + ((C5 + C4 + C3)*C6 + (C2 + C1)*C5
          + (C2 + C1)*C4 + (C2 + C1)*C3)*R6 + (C4 + C3)*C5*R5 + (C4*C5 + C3*C4)*R4
          + C3*C4*R3 + (C2*C5 + C2*C4 + C2*C3)*R2 + C3*C4*R1)*RB2
      + (C3*C4*R3 + C3*C4*R2)*RB1 + ((C5 + C4 + C3)*C6 + (C2 + C1)*C5 + (C2 + C1)*C4
        + (C2 + C1)*C3)*R2*R6 + (C4 + C3)*C5*R2*R5 + (C4*C5 + C3*C4)*R2*R4
      + (C3*C4*R2 + C3*C4*R1)*R3 + C3*C4*R1*R2),

    - (((C3*C4*C5*RF + C3*C4*C5*RB2 + C3*C4*C5*R2)*RT1
      + ((C2*C4 + C2*C3)*C5*RB2 + C3*C4*C5*RB1
        + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R6 + C3*C4*C5*R4
        + C3*C4*C5*R3 + C3*C4*C5*R1)*RF + (C3*C4*C5*RB1
          + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R6 + C3*C4*C5*R4
          + C3*C4*C5*R3 + (C2*C4 + C2*C3)*C5*R2 + C3*C4*C5*R1)*RB2
      + (C3*C4*C5*R3 + C3*C4*C5*R2)*RB1 + ((C4 + C3)*C5*C6
        + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R2*R6 + C3*C4*C5*R2*R4
      + (C3*C4*C5*R2 + C3*C4*C5*R1)*R3 + C3*C4*C5*R1*R2)*RT2
      + ((((C3 + C2)*C4*C5 + C2*C3*C4)*RB2 + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
        + (C2 + C1)*C3*C4)*R6 + C3*C4*C5*R5 + C3*C4*C5*R3 + C3*C4*C5*R2)*RF
        + (((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*R6 + C3*C4*C5*R5
          + (C2*C4*C5 + C2*C3*C4)*R2)*RB2 + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5
            + (C2 + C1)*C3*C4)*R2*R6 + C3*C4*C5*R2*R5)*RT1
      + (((C3*C4*C5 + C2*C3*C4)*RB1 + (((C4 + C3 + C2)*C5 + C2*C4 + C2*C3)*C6
        + ((C2 + C1)*C4 + (C2 + C1)*C3 + C1*C2)*C5 + C1*C2*C4 + C1*C2*C3)*R6
        + (C2*C4 + C2*C3)*C5*R5 + ((C3 + C2)*C4*C5 + C2*C3*C4)*R4
        + (C3*C4*C5 + C2*C3*C4)*R3 + (C2*C4 + C2*C3)*C5*R2 + (C3*C4*C5 + C2*C3*C4)*R1)
        *RB2 + ((((C4 + C1)*C5 + (C3 + C1)*C4 + C1*C3)*C6 + ((C2 + C1)*C4 + C1*C2)*C5
          + ((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*R6 + C3*C4*C5*R5
          + (C3*C4*C6 + C3*C4*C5 + C2*C3*C4)*R3 + C3*C4*C5*R2
          + (C1*C4*C5 + C1*C3*C4)*R1)*RB1 + (((C4 + C3)*C5*C6
            + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R5
            + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*R4
            + ((C3*C5 + C3*C4)*C6 + (C2 + C1)*C3*C5 + (C2 + C1)*C3*C4)*R3
            + ((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R2
            + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*R1)*R6
        + (C3*C4*C5*R4 + C3*C4*C5*R3 + C3*C4*C5*R1)*R5
        + (C3*C4*C5*R3 + C3*C4*C5*R2)*R4 + (C3*C4*C5*R2
          + (C3*C4*C6 + C3*C4*C5 + (C2 + C1)*C3*C4)*R1)*R3 + C3*C4*C5*R1*R2)*RF
      + ((((C1*C5 + (C3 + C1)*C4 + C1*C3)*C6 + (C2 + C1)*C3*C4)*R6 + C3*C4*C5*R5
        + C3*C4*C6*R3 + C2*C3*C4*R2 + C1*C3*C4*R1)*RB1
        + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R5
          + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*R4
          + (C3*C4*C6 + (C2 + C1)*C3*C4)*R3 + ((C2*C5 + C2*C4 + C2*C3)*C6 + C1*C2*C5
            + C1*C2*C4 + C1*C2*C3)*R2 + (C3*C4*C6 + (C2 + C1)*C3*C4)*R1)*R6
        + (C3*C4*C5*R4 + C3*C4*C5*R3 + (C2*C4 + C2*C3)*C5*R2 + C3*C4*C5*R1)*R5
        + (C2*C4*C5 + C2*C3*C4)*R2*R4 + (C2*C3*C4*R2 + (C3*C4*C6 + C1*C3*C4)*R1)*R3
        + C2*C3*C4*R1*R2)*RB2 + (((C3*C4*C6 + (C2 + C1)*C3*C4)*R3
          + ((C1*C5 + (C3 + C1)*C4 + C1*C3)*C6 + C1*C2*C5 + ((C2 + C1)*C3 + C1*C2)*C4
            + C1*C2*C3)*R2)*R6 + (C3*C4*C5*R3 + C3*C4*C5*R2)*R5
          + ((C3*C4*C6 + C2*C3*C4)*R2 + C1*C3*C4*R1)*R3 + C1*C3*C4*R1*R2)*RB1
      + (((C4 + C3)*C5*C6 + ((C2 + C1)*C4 + (C2 + C1)*C3)*C5)*R2*R5
        + ((C4*C5 + C3*C4)*C6 + (C2 + C1)*C4*C5 + (C2 + C1)*C3*C4)*R2*R4
        + ((C3*C4*C6 + (C2 + C1)*C3*C4)*R2 + (C3*C4*C6 + (C2 + C1)*C3*C4)*R1)*R3
        + (C3*C4*C6 + (C2 + C1)*C3*C4)*R1*R2)*R6
      + (C3*C4*C5*R2*R4 + (C3*C4*C5*R2 + C3*C4*C5*R1)*R3 + C3*C4*C5*R1*R2)*R5
      + (C3*C4*C6 + (C2 + C1)*C3*C4)*R1*R2*R3),

    - ((((C2*C3*C4*C5*RB2 + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R6)*RF
      + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R6 + C2*C3*C4*C5*R2)*RB2
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2*R6)*RT1
      + ((C2*C3*C4*C5*RB1 + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R6
        + C2*C3*C4*C5*R4 + C2*C3*C4*C5*R3 + C2*C3*C4*C5*R1)*RB2
        + ((((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)
          *R6 + (C3*C4*C5*C6 + C2*C3*C4*C5)*R3 + C1*C3*C4*C5*R1)*RB1
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R4
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R6
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R3)*RF
      + (((((C3 + C1)*C4 + C1*C3)*C5*C6 + (C2 + C1)*C3*C4*C5)*R6 + C3*C4*C5*C6*R3
        + C2*C3*C4*C5*R2 + C1*C3*C4*C5*R1)*RB1
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R4
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R3
          + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R2
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R6 + C2*C3*C4*C5*R2*R4
        + (C2*C3*C4*C5*R2 + (C3*C4*C5*C6 + C1*C3*C4*C5)*R1)*R3 + C2*C3*C4*C5*R1*R2)
      *RB2 + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R3
        + (((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)
        *R2)*R6 + ((C3*C4*C5*C6 + C2*C3*C4*C5)*R2 + C1*C3*C4*C5*R1)*R3
        + C1*C3*C4*C5*R1*R2)*RB1 + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2*R4
          + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2
            + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R2)*R6
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R2*R3)*RT2
      + ((((((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
        + C1*C2*C3*C4)*R6 + C2*C3*C4*C5*R5 + C2*C3*C4*C5*R2)*RB2
        + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R6*RB1
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R5
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R3
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2)*R6)*RF
        + ((C1*C4*C5 + C1*C3*C4)*C6*R6*RB1 + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R5
          + ((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R2)*R6
          + C2*C3*C4*C5*R2*R5)*RB2 + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5
            + C1*C2*C3*C4)*R2*R6*RB1 + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2*R5*R6)*RT1
      + (((((((C3 + C2 + C1)*C4 + C1*C3 + C1*C2)*C5 + (C2*C3 + C1*C2)*C4 + C1*C2*C3)
        *C6 + ((C2 + C1)*C3*C4 + C1*C2*C3)*C5 + C1*C2*C3*C4)*R6 + C2*C3*C4*C5*R5
        + (C3*C4*C5 + C2*C3*C4)*C6*R3 + C2*C3*C4*C5*R2
        + (C1*C3*C4*C5 + C1*C2*C3*C4)*R1)*RB1 + (((C2*C4 + C2*C3)*C5*C6
          + (C1*C2*C4 + C1*C2*C3)*C5)*R5 + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6
            + ((C2 + C1)*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*R4
          + (((C3*C4 + C2*C3)*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3*C4 + C1*C2*C3)*C5
            + C1*C2*C3*C4)*R3 + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R2
          + (((C3 + C2)*C4*C5 + C2*C3*C4)*C6 + ((C2 + C1)*C3 + C1*C2)*C4*C5
            + C1*C2*C3*C4)*R1)*R6 + (C2*C3*C4*C5*R4 + C2*C3*C4*C5*R3 + C2*C3*C4*C5*R1)*R5
        + C2*C3*C4*C5*R2*R4 + (C2*C3*C4*C5*R2 + ((C3*C4*C5 + C2*C3*C4)*C6
          + C1*C3*C4*C5 + C1*C2*C3*C4)*R1)*R3 + C2*C3*C4*C5*R1*R2)*RB2
        + (((((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)
          *R5 + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R4
          + (((C3*C4 + C1*C3)*C5 + C1*C3*C4)*C6 + ((C2 + C1)*C3*C4 + C1*C2*C3)*C5
            + C1*C2*C3*C4)*R3 + (((C3 + C1)*C4 + C1*C3)*C5*C6
              + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)*R2
          + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R1)*R6
          + ((C3*C4*C5*C6 + C2*C3*C4*C5)*R3 + C1*C3*C4*C5*R1)*R5
          + ((C3*C4*C5*C6 + C2*C3*C4*C5)*R2 + (C1*C3*C4*C6 + C1*C3*C4*C5 + C1*C2*C3*C4)
            *R1)*R3 + C1*C3*C4*C5*R1*R2)*RB1 + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R4
              + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R3
              + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R5
              + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R3
                + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2)*R4
              + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2
                + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R3
              + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R2)*R6
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R3*R5
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R2*R3)*RF
      + ((((((C3 + C1)*C4 + C1*C3)*C5*C6 + (C2 + C1)*C3*C4*C5)*R5
        + (C1*C4*C5 + C1*C3*C4)*C6*R4 + (C2 + C1)*C3*C4*C6*R3
        + ((C1*C2*C5 + (C2*C3 + C1*C2)*C4 + C1*C2*C3)*C6 + C1*C2*C3*C4)*R2
        + (C1*C3*C4*C6 + C1*C2*C3*C4)*R1)*R6 + (C3*C4*C5*C6*R3 + C2*C3*C4*C5*R2
          + C1*C3*C4*C5*R1)*R5 + (C2*C3*C4*C6*R2 + C1*C3*C4*C6*R1)*R3
        + C1*C2*C3*C4*R1*R2)*RB1 + (((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R4
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R3
          + ((C2*C4 + C2*C3)*C5*C6 + (C1*C2*C4 + C1*C2*C3)*C5)*R2
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R5
          + ((C2*C4*C5 + C2*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R2*R4
          + ((C2*C3*C4*C6 + C1*C2*C3*C4)*R2 + (C2*C3*C4*C6 + C1*C2*C3*C4)*R1)*R3
          + (C2*C3*C4*C6 + C1*C2*C3*C4)*R1*R2)*R6
        + (C2*C3*C4*C5*R2*R4 + (C2*C3*C4*C5*R2 + (C3*C4*C5*C6 + C1*C3*C4*C5)*R1)*R3
          + C2*C3*C4*C5*R1*R2)*R5 + (C2*C3*C4*C6 + C1*C2*C3*C4)*R1*R2*R3)*RB2
      + ((((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R3
        + (((C3 + C1)*C4 + C1*C3)*C5*C6 + (((C2 + C1)*C3 + C1*C2)*C4 + C1*C2*C3)*C5)
        *R2)*R5 + ((C1*C4*C5 + C1*C3*C4)*C6 + C1*C2*C4*C5 + C1*C2*C3*C4)*R2*R4
        + ((C1*C3*C4*C6 + C1*C2*C3*C4)*R2 + (C1*C3*C4*C6 + C1*C2*C3*C4)*R1)*R3
        + (C1*C3*C4*C6 + C1*C2*C3*C4)*R1*R2)*R6
        + (((C3*C4*C5*C6 + C2*C3*C4*C5)*R2 + C1*C3*C4*C5*R1)*R3 + C1*C3*C4*C5*R1*R2)
        *R5 + (C1*C3*C4*C6 + C1*C2*C3*C4)*R1*R2*R3)*RB1
      + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2*R4
        + ((C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R2
          + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1)*R3
        + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R2)*R5*R6
      + (C3*C4*C5*C6 + (C2 + C1)*C3*C4*C5)*R1*R2*R3*R5),

    - (((((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R6*RB2
      + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R6*RB1)*RF
      + (C1*C3*C4*C5*C6*R6*RB1 + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2*R6)*RB2
      + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2*R6*RB1)*RT1
      + ((((((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*R6
        + C2*C3*C4*C5*C6*R3 + C1*C2*C3*C4*C5*R1)*RB1
        + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R4 + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R3)*RB2
        + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R4
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3 + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)
          *R6 + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R3)*RB1)*RF
      + (((C1*C3*C4*C5*C6*R4 + (C2 + C1)*C3*C4*C5*C6*R3
        + (((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*R2
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R6
        + (C2*C3*C4*C5*C6*R2 + C1*C3*C4*C5*C6*R1)*R3 + C1*C2*C3*C4*C5*R1*R2)*RB1
        + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2*R4
          + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2
            + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2)*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2*R3)*RB2
      + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2*R4
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2)*R6
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2*R3)*RB1)*RT2
      + ((((((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*R6*RB1
        + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R5 + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2)*R6)*RB2
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R5 + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2)*R6*RB1)*RF
        + ((C1*C3*C4*C5*C6*R5 + (C1*C2*C4*C5 + C1*C2*C3*C4)*C6*R2)*R6*RB1
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2*R5*R6)*RB2
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2*R5*R6*RB1)*RT1
      + (((((((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*R5
        + (((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*R4
        + (((C2 + C1)*C3*C4 + C1*C2*C3)*C5 + C1*C2*C3*C4)*C6*R3
        + (((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*R2
        + (((C1*C3 + C1*C2)*C4*C5 + C1*C2*C3*C4)*C6 + C1*C2*C3*C4*C5)*R1)*R6
        + (C2*C3*C4*C5*C6*R3 + C1*C2*C3*C4*C5*R1)*R5
        + (C2*C3*C4*C5*C6*R2 + (C1*C3*C4*C5 + C1*C2*C3*C4)*C6*R1)*R3
        + C1*C2*C3*C4*C5*R1*R2)*RB1 + (((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R4
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3 + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)
          *R5 + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3
            + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2)*R4
          + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2
            + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2)*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R3*R5
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2*R3)*RB2
        + ((((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R4
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3 + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)
          *R5 + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R3
            + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2)*R4
          + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2
            + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2)*R6
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R3*R5
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2*R3)*RB1)*RF
      + ((((C1*C3*C4*C5*C6*R4 + (C2 + C1)*C3*C4*C5*C6*R3
        + (((C2*C3 + C1*C2)*C4 + C1*C2*C3)*C5*C6 + C1*C2*C3*C4*C5)*R2
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R5
        + (C1*C2*C4*C5 + C1*C2*C3*C4)*C6*R2*R4
        + (C1*C2*C3*C4*C6*R2 + C1*C2*C3*C4*C6*R1)*R3 + C1*C2*C3*C4*C6*R1*R2)*R6
        + ((C2*C3*C4*C5*C6*R2 + C1*C3*C4*C5*C6*R1)*R3 + C1*C2*C3*C4*C5*R1*R2)*R5
        + C1*C2*C3*C4*C6*R1*R2*R3)*RB1 + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2*R4
          + ((C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2
            + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
          + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2)*R5*R6
        + (C2*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2*R3*R5)*RB2
      + (((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2*R4
        + ((C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R2
          + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1)*R3
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2)*R5*R6
        + (C1*C3*C4*C5*C6 + C1*C2*C3*C4*C5)*R1*R2*R3*R5)*RB1),

    - C1*C2*C3*C4*C5*C6*RB1*RB2*(((R6*RF + R2*R6)*RT1
      + ((R4 + R3 + R1)*R6 + R1*R3)*RF + (R2*R4 + (R2 + R1)*R3 + R1*R2)*R6
      + R1*R2*R3)*RT2 + ((R5 + R3 + R2)*R6*RF + R2*R5*R6)*RT1
      + (((R4 + R3 + R1)*R5 + (R3 + R2)*R4 + (R2 + R1)*R3 + R1*R2)*R6 + R1*R3*R5
        + R1*R2*R3)*RF + (R2*R4 + (R2 + R1)*R3 + R1*R2)*R5*R6 + R1*R2*R3*R5)
  ];

  return [
    numCoeffs,
    denCoeffs
  ];  
});