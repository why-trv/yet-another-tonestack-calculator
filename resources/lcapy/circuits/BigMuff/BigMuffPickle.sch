---
id: muf3
name: Big Muff / Pickle
description: A la Swollen Pickle (R<sub>M</sub> = Scoop, R<sub>C</sub> = Voice)
controls:
  RT: Linear
  RM: Linear
  RC: Linear
---
RIN IN 2 15e3; right
R1 2a 3 33e3; right
R2 9 0a 1.5e3; right
C1 3 0 100e-9; down
C2 2 4 3.3e-9; right
C3 2b 7 33e-9; right
C4 5 OUTa 1e-6; right=0.55
RV_T 8b 3 5 100e3; down
RV_C 7 4 8 500e3; down
R_M 9 8a 50e3; down, variable
RL OUT 0 100e3; down
W 2 2b; up
W 2 2a; down
W 8 8a; right=0.25
W 8a 8b; down=0.25
W 0a 0; down=0.15
W OUTa OUT; right=0.2