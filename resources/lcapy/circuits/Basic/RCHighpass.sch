---
id: rchp
name: RC Highpass
controls:
  RB: LogA
---
RIN IN 2 1e3; right
C1 2 3 100e-9; right
RB 3 0 100e3; down, variable
W 3 OUT; right
RL OUT 0 1e6; down