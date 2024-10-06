---
id: muf2
name: Big Muff / Musket
controls:
  RT: Linear
  RM: Linear
---
RIN IN 2 12e3; right
R1 2a 3 10e3; right
C1 3 0 47e-9; down, tlground, _
R2 4 0a 56e3; right
C2 2 4 3.3e-9; right
C3 2b 7 47e-9; right
C4 5 OUTa 100e-9; right=0.55
R_M 7 4 100e3; down, variable
RV_T 4 3 5 250e3; down=1.25
RL OUT 0 100e3; down, tlground
W 2 2b; up
W 2 2a; down
W 0a 0; down=0.1
W OUTa OUT; right=0.2