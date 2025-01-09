---
id: mig60
name: Sovtek MIG-60
description: Based on <a href="https://el34world.com/charts/Schematics/files/Sovtek/Sovtek_mig60.pdf" rel="noopener noreferrer">this schematic</a>. Note that in the original, the stack is plate-driven, unlike Marshalls.
controls:
  RB: LogA
  RM: Linear
  RT: Linear  
---
RIN IN rinr 77e3; right
C1 rinr c1r 470e-12; right=0.8
W c1r rtt; right=0.55
R1 rinr r1b 56e3; down, _
C2 r1b c2r 33e-9; right=0.8
W c2r rtb; right=0.55
W r1b c3l; down
C3 c3l c3r 22e-9; right
RV_T rtt rtb rtw 250e3; down
RB rtb rbb 1e6; down, variable
C4 c3r 0 470e-12; down=0.75
W c3r rmw; right=0.5
RV_M rmb rbb rmw 25e3; up, *
W rmb 0; down=0.25
W rtw OUT; right=0.6
RL OUT 0 1e6; down
