RIN IN rinr; right
R2 rinr r2r; right
R1 rinr BIAS; up, implicit
# Dirty-ish hack to get the bias voltage on the schematic - for some reason,
# labeling the BIAS node bends the wire...
A1 rinr; l_=V_B, anchor=south, yoffset=1.15, xoffset=-0.27
W r2r oa1p; right
E1 oa1o 0 opamp oa1p oa1n; right=0.5, scale=0.5, l=OA1
C2 oa1o OUT; rights
RL OUT 0; down
W r2r r2r_; down=0.1
W r2r_ rtl_; left
W rtl_ rtl; down=0.1
RV_T rtr rtl rtw; left
W rtr c1l; right
W rtl rbl0; down=0.75
W rbl0 rbl; right
C1 c1l c1r; right
W oa1o c1r; down=0.9
W c1r r3r; down=0.75
R3 rbr r3r; right
RV_B rbr rbl rbw; left
W oa1n c1l; down=0.4
W c1l rbr; down=0.75
C4 rbw c4b; down=0.85, _
W c4b c4b_; down=0.1
C5 c4b_ c5b; down=0.85, _
R6 c5b BIAS; down, implicit, _
# Dirty-ish hack to get the bias voltage on the schematic - for some reason,
# labeling the BIAS node bends the wire...
A2 c5b; l_=V_B, anchor=north, yoffset=-1.15, xoffset=-0.27
R5 c4b r5r; right
W c5b oa2p; right=0.5
E2 oa2o 0 opamp oa2p oa2n; right=0.5, scale=0.5, l=OA2
W r5r oa2o; down
W oa2o oa2o_; down=0.5
W oa2o_ oa2n_; left
W oa2n_ oa2n; up=0.5
W rtw c3t; down=0.75
C3 c3t c3b; down=0.85, _
W c3b c3b_; down=0.1
R4 c3b_ r4b; down=0.85, _
W r4b 0; down = 0.1

