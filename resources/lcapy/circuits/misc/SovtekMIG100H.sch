---
id: mig100h
name: Sovtek MIG-100H
description: Based on <a href="https://schematicheaven.net/newamps/sovtek_mig100h.pdf" rel="noopener noreferrer">this schematic</a>. An odd one, because R<sub>2</sub> = 100Ω is basically a short, effectively turning this into a Blackface-style stack. Note that in the original, the stack is plate-driven, unlike Marshalls.
controls:
  RB: LogA
  RM: Linear
  RT: LogA  
---
RIN IN rinr 77e3; right
C1 rinr c1r 470e-12; right
W c1r rtt; right=0.5
R1 rinr r1b 47e3; down
C2 r1b c2r 22e-9; right
W c2r rtb; right=0.5
W r1b c3l; down
C3 c3l c3r 22e-9; right
RV_T rtt rtb rtw 500e3; down
RB rtb rbb 1e6; down, variable
RV_M rmb rbb rmw 10e3; up, *
W c3r r2l; up=0.25
R2 r2l rbb 100; right
W c3r r3l; down=0.25
R3 r3l rmb 33e3; right
W c3r rmw; right=0.5
W rmb 0; down=0.25
W rtw OUT; right=0.6
RL OUT 0 1e6; down
