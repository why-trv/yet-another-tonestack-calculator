---
id: rchs
name: RC Highpass Shelving
controls:
  RB: LogA
---
RIN IN 2 1e3; right
C1 2 3 100e-9; right
RB 3 4 100e3; down, variable
C2 4 0 100e-9; down
W 3 OUT; right
RL OUT 0 1e6; down