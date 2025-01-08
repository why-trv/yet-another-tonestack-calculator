RIN IN rinr; right=1.1
C2 rinr rtb; up
RV_T rtt rtb rtw; down=0.55
C1 rtt 0; up
C3 rinr c3r; right
W c3r r2t; down=0.5
R2 r2t 0; down, _
R3 c3r r3r; right=1.1
R5 r3r OUT; right=1.1
W rtw rtw_; right
W rtw_ OUT; down
RL OUT_ 0; down
W OUT OUT_; down=0.5
W r3r rbw; down=0.25
RV_B rbl rbr rbw; right=0.9
W rbl 0; down
C4 rbr 0; down
A_OUT OUT; l=V_{OUT}, anchor=w
P_OUT OUT OUT; down