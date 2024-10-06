---
id: muf1
name: Big Muff / Hoof
description: A la EQD Hoof / <a href="https://www.muzique.com/lab/tone3.htm" rel="noopener noreferrer">AMZ Presence Control</a>
controls:
  RT: Linear
  RM: Linear
---
RIN IN 2 15e3; right
R1 2b 3 39e3; right
C1 3 0 6.8e-9; down, tlground, _
C2 2a 4 6.8e-9; right
C3 5 OUTa 100e-9; right=0.55
R_M 6 4 25e3; down, variable
RV_T 4 3 5 100e3; down
R2 6 0a 2.2e3;
RL OUT 0 100e3; down, tlground
W 2 2a; up=0.5
W 2 2b; down=0.5
W 0a 0; down=0.125
W OUTa OUT; right=0.2