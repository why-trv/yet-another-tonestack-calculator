---
id: rclp
name: RC Lowpass
controls:
  RT: LogA
---
RIN IN 2 1e3; right
RT 2 3 10e3; right, variable, *
C1 3 0 10e-9; down
W 3 OUT; right
RL OUT 0 1e6; down