---
id: 5d8
name: Twin 5D8
description: Apparently also used in 5D7 Bandmaster. This tonestack is like James with a couple extra parts. <a href="https://schematicheaven.net/fenderamps/twin_5d8_schem.pdf" rel="noopener noreferrer">Original schematic</a>
controls:
  RB: LogA
  RT: LogA
---
RIN IN rinr 38e3; right
C1 rinr r1t 100e-9; down
R1 r1t rbt 270e3; down, _
RV_B rbt rbb rbw 2e6; down=1.7
R2 rbb r2b 56e3; down, _
W r1t r1t_; left
W r2b r2b_; left
R3 r2b_ r1t_ 270e3; up
W rbw rbw_; right=0.5
W rbt cb1t; right
CB1 cb1t rbw_ 100e-12; down=0.85, _
W rbb cb2b; right
CB2 rbw_ cb2b 4.7e-9; down=0.85, _
R4 rbw_ OUT_ 270e3; right=1.4
W rinr ct1t_; right=3
W r2b rlb; right=2
W rlb ct2b; right=1
W ct1t_ ct1t; down
CT1 ct1t rtt 220e-12; down
CT2 rtb ct2b 3e-9; down
RV_T rtb rtt rtw 1e6; up=1.7, *
W OUT_ rtw; right=0.8
RL OUT_ rlb 1e6; down
W rlb 0; down=0.2
W OUT_ OUT; up=0.33