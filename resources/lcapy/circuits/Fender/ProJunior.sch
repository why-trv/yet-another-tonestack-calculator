RIN IN rinr; right=1.1
C1 rinr c1r; right=0.9
C2 c1r c2b; down, _
R1 c2b 0; down, _
W c1r r2t; right=0.75
R2 r2t r2b; down
W c2b r2b; right=0.75
W r2b rvt; right=0.6
RV_V rvt 0 rvw; down
W rvw r3l; right=0.5
R3 r3l OUT; right=1.2
W r2b rtw_; down=1.5
W rtw_ rtw; right
RV_T rtb rtt rtw; up=0.6
C3 r3l rtt; down=0.75
C4 rtb 0; down=0.75
RL OUT 0; down