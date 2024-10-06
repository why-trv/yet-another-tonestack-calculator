---
id: rcls
name: RC Lowpass Shelving
controls:
  RT: LogA
---
RIN IN 2 1e3; right
RT 2 3 10e3; right, variable, *
C1 3 4 10e-9; down
R1 4 0 100e3; down
W 3 OUT; right
RL OUT 0 1e6; down