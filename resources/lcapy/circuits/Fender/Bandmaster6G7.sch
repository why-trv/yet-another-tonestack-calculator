---
id: 6g7
name: Bandmaster 6G7
controls:
  RB: LogA
  RT: Linear
  RV: 
    taper: Linear
    default: 1
---
RIN IN rinr 38e3; right
C1 rinr c1r 50e-9; right
C2 c1r rtt 250e-12; right
R1 c1r r1b 100e3; down, _
RV_T rtt rtb rtw 250e3; down
RV_B rbb rtb rbw 250e3; up=2
W rtw rvt; right=0.6
RV_V rvt 0 rvw 500e3; down
W rvw rvw_; right=0.5
W rvw_ c4r; up=0.5
C4 rvt c4r 47e-12; right=0.5
W c4r OUT; right=0.6
RL OUT 0 1e6; down
W r1b rtb; right
C3 r1b c3b 10e-9; down, _
W rbw c3b; left=0.5
R2 c3b r2b 10e3; down, _
W r2b g; right=0.375
W g rbb; right=0.1
W g 0; down=0.25