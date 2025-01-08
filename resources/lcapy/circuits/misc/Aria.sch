RIN IN rinr; right=1.1
C1 rinr c1b; down, _
W rinr rmt_; right
W rmt_ r1t; right=1.5
W c1b rtt; down=1.5
RV_T rtt 0 rtw; down
W rmt_ rmt; down=2
RV_M rmt 0 rmw; down
R1 r1t rbt; down, _
RV_B rbt rbb rbw; down
C2 rbt rbb; down, offset=-0.7, _
W rbb 0; down=0.2
R3 rbw r3r; right
W rmw r4l; right=1.7
R4 r4l r4r; right
W r3r r4r; down
W rtw r2l; right
R2 r2l r2r; right=1
C3 r2l r2r; right=1, offset=-0.6
W r2r r2r_; right
W r4r r2r_; down=0.8
W r3r OUT; right=0.7
RL OUT 0; down, _
