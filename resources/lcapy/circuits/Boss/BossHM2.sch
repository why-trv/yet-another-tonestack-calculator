RIN IN rinr; right
R1 rinr rbt; right
RV_B rbb rbt rbw; up=1.7
W rbt rtt; right=1.6
RV_T rtb rtt rtw; up=1.7
W rtt oa1p; right=0.1
E1 oa1o 0 opamp oa1p oa1n; right=0.5, scale=0.5, l=OA1
W oa1n c1l; down=0.5
W oa1o c1r; down
C1 c1l c1r; right, _
W c1l r2l; down=0.7
W c1r r2r; down=0.7
R2 r2l r2r; right, _
C2 oa1o c2r; right
R3 c2r r3r; right=0.7
W r3r OUT; right=0.3
W rtb r2l; right=0.6
W rbb rtb; right
W rbw rbw_; left=0.75
W rbw_ c3t; down=1.4
W rtw rtw_; left=0.01
W rtw_ c5t; down=1.4
W c5t c7t; right=2.35
#
C3 c3t c3b; down, _
C4 c3b c4b; down, _
W c4b r4b; left=0.75
R4 r4b BIAS; up, implicit
# Dirty-ish hack to get the bias voltage on the schematic - for some reason,
# labeling the BIAS node bends the wire...
A1 r4b; l_=V_B, anchor=south, yoffset=1.3, xoffset=-0.15
W r4b r4b_; down=0.5
W r4b_ oa2p; right=0.15
W c3b r5t; right=0.75
R5 r5t r5b; down, _
W r5b r5b_; down=0.75
W r5b_ oa2o; left
E2 oa2o 0 opamp oa2p oa2n; right=0.5, scale=0.5, l=OA2
W oa2n oa2n_; left=0.15
W oa2n_ oa2n_1; down=0.5
W oa2n_1 oa2n_2; right
W oa2n_2 r5b_; up=0.5
#
C5 c5t c5b; down, _
C6 c5b c6b; down, _
W c6b r6b; left=0.75
R6 r6b BIAS; up, implicit
# Dirty-ish hack to get the bias voltage on the schematic - for some reason,
# labeling the BIAS node bends the wire...
A2 r6b; l_=V_B, anchor=south, yoffset=1.3, xoffset=-0.15
W r6b r6b_; down=0.5
W r6b_ oa3p; right=0.15
W c5b r7t; right=0.75
R7 r7t r7b; down, _
W r7b r7b_; down=0.75
W r7b_ oa3o; left
E3 oa3o 0 opamp oa3p oa3n; right=0.5, scale=0.5, l=OA3
W oa3n oa3n_; left=0.15
W oa3n_ oa3n_1; down=0.5
W oa3n_1 oa3n_2; right
W oa3n_2 r7b_; up=0.5
#
C7 c7t c7b; down, _
C8 c7b c8b; down, _
W c8b r8b; left=0.75
R8 r8b BIAS; up, implicit
# Dirty-ish hack to get the bias voltage on the schematic - for some reason,
# labeling the BIAS node bends the wire...
A3 r8b; l_=V_B, anchor=south, yoffset=1.3, xoffset=-0.15
W r8b r8b_; down=0.5
W r8b_ oa4p; right=0.15
W c7b r9t; right=0.75
R9 r9t r9b; down, _
W r9b r9b_; down=0.75
W r9b_ oa4o; left
E4 oa4o 0 opamp oa4p oa4n; right=0.5, scale=0.5, l=OA4
W oa4n oa4n_; left=0.15
W oa4n_ oa4n_1; down=0.5
W oa4n_1 oa4n_2; right
W oa4n_2 r9b_; up=0.5
#
RL OUT 0; down=1.4