import { Tilt } from './Tilt';
import { testTonestack } from '../_testTonestack';

testTonestack(Tilt, function (controlValues) {
  const {
    RIN, R1, R2, RF1, RF2, C1, C2,
    RT: [RT2, RT1]
  } = this.processComponentValues(controlValues);

  // Transfer function denominator coefficients
  const denBRe = C1*C2*RF2*RIN*RT2 + C1*C2*RF1*RIN*RT2 + C1*C2*R2*RIN*RT2
    + C1*C2*R1*RIN*RT2 + C1*C2*RF1*RF2*RT2 + C1*C2*R1*RF1*RT2 + C1*C2*RF2*RIN*RT1
    + C1*C2*RF1*RIN*RT1 + C1*C2*R2*RIN*RT1 + C1*C2*R1*RIN*RT1 + C1*C2*R1*RF1*RT1
    + C1*C2*R1*R2*RT1 + C1*C2*RF1*RF2*RIN + C1*C2*R1*RF2*RIN + C1*C2*R2*RF1*RIN
    + C1*C2*R1*R2*RIN + C1*C2*R1*RF1*RF2 + C1*C2*R1*R2*RF1;

  const denCIm = C2*RIN*RT2 + C1*RIN*RT2 + C2*RF1*RT2 + C2*RIN*RT1 + C1*RIN*RT1
    + C2*RF1*RT1 + C2*R2*RT1 + C1*R1*RT1 + C2*RF2*RIN + C1*RF1*RIN + C2*R2*RIN
    + C1*R1*RIN + C2*RF1*RF2 + C2*R2*RF1 + C1*R1*RF1;

  const denDRe = RT1 + RIN + RF1;

  // Transfer function numerator coefficients
  const numBRe = C1*C2*R2*RF2*RT2 + C1*C2*R1*R2*RT2 + C1*C2*RF1*RF2*RT1
    + C1*C2*R2*RF2*RT1 + C1*C2*R2*RF1*RF2 + C1*C2*R1*R2*RF2;

  const numCIm = C1*RF2*RT2 + C2*R2*RT2 + C1*R1*RT2 + C1*RF2*RT1 + C1*RF1*RF2 + C2*R2*RF2
    + C1*R1*RF2;

  const numDRe = RT2 + RF2;

  return [
    [numDRe, numCIm, numBRe],
    [denDRe, denCIm, denBRe]
  ];
});