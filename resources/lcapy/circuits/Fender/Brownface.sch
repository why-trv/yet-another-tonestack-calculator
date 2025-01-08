RIN IN rinr; right=1
C1 rinr c1r; right=1.125
W c1r rtt; right
R1 rinr r1b; down, _
C2 r1b rbt; right=1.125
W r1b c3l; down
C3 c3l rbb; right
R2 rbb 0; down
RV_T rtt rtb rtw 250e3; down=1.675
W rbt rttap; right=0.865
W rttap rttap
A rttap; l=R_{Tap}, anchor=n, yoffset=-0.01, xoffset=-0.075
RB rbt rbb 1e6; down, variable
C4 rtb c4b; down=0.675
W c4b 0; down=0.625
W rtw OUT; right=0.6
RL OUT 0 1e6; down
