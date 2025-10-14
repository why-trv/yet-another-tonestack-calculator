import { Bassman5F6A } from './Fender/Bassman5F6A';
import { FenderTMB } from './Fender/FenderTMB';
import { FenderTB } from './Fender/FenderTB';
import { Bandmaster6G7 } from './Fender/Bandmaster6G7';
import { Brownface } from './Fender/Brownface';
import { Deluxe5E3Bright } from './Fender/Deluxe5E3Bright';
import { Deluxe5E3Normal } from './Fender/Deluxe5E3Normal';
import { ESeries } from './Fender/ESeries';
import { Twin5D8 } from './Fender/Twin5D8';
import { Princeton5E2 } from './Fender/Princeton5E2';
import { Princeton5F2A } from './Fender/Princeton5F2A';
import { ProJunior } from './Fender/ProJunior';

import { Marshall } from './misc/Marshall';
import { Vox } from './misc/Vox';
import { HiwattDR } from './misc/HiwattDR';
import { HiwattCP } from './misc/HiwattCP';
import { SovtekMIG60 } from './misc/SovtekMIG60';
import { SovtekMIG100H } from './misc/SovtekMIG100H';
import { FramusMidControl } from './misc/FramusMidControl';
import { Crate } from './misc/Crate'
import { Aria } from './misc/Aria'
import { BoneRay } from './misc/BoneRay'
import { BlackstarHT5 } from './misc/BlackstarHT5';
import { DrZ } from './misc/DrZ'
import { Tilt } from './misc/Tilt'
import { NeveShelvingHiLo } from './misc/NeveShelvingHiLo';
import { Bench } from './misc/Bench';
import { Wah } from './misc/Wah';

import { BigMuff } from './BigMuff/BigMuff';
import { BigMuffHoof } from './BigMuff/BigMuffHoof';
import { BigMuffMusket } from './BigMuff/BigMuffMusket';
import { BigMuffPickle } from './BigMuff/BigMuffPickle';

import { RCLowpass } from './Basic/RCLowpass';
import { RCHighpass } from './Basic/RCHighpass';
import { RCLowpassShelving } from './Basic/RCLowpassShelving';
import { RCHighpassShelving } from './Basic/RCHighpassShelving';
import { SallenKeyLowpass } from './Basic/SallenKeyLowpass';

import { JamesPassiveDualBassCap } from './James/JamesPassiveDualBassCap';
import { JamesActiveDualBassCap } from './James/JamesActiveDualBassCap';
import { JamesPassiveSingleBassCap } from './James/JamesPassiveSingleBassCap';
import { JamesActiveSingleBassCap } from './James/JamesActiveSingleBassCap';

import { BaxandallPassiveDualBassCap } from './Baxandall/BaxandallPassiveDualBassCap';
import { BaxandallPassiveSingleBassCap } from './Baxandall/BaxandallPassiveSingleBassCap';
import { BaxandallActiveDualBassCap } from './Baxandall/BaxandallActiveDualBassCap';
import { BaxandallActiveSingleBassCap } from './Baxandall/BaxandallActiveSingleBassCap';

import { DumbleJazz } from './Dumble/DumbleJazz';
import { DumbleRock } from './Dumble/DumbleRock';

import { SWTC1 } from './SWTC/SWTC1'
import { SWTC2 } from './SWTC/SWTC2'
import { SWTC3 } from './SWTC/SWTC3'
import { SWTC4 } from './SWTC/SWTC4'

import { BossFZ2EQ } from './Boss/BossFZ2EQ';
import { BossHM2 } from './Boss/BossHM2'

export const topologies = {
  Fender: [
    new Bassman5F6A(),
    new FenderTMB(),
    new FenderTB(),
    new Bandmaster6G7(),
    new Brownface(),
    new Deluxe5E3Bright(),
    new Deluxe5E3Normal(),
    new ESeries(),
    new Twin5D8(),
    new Princeton5E2(),
    new Princeton5F2A(),
    new ProJunior()
  ],
  "—": [
    new Marshall(),
    new Vox(),
    new HiwattDR(),
    new HiwattCP(),
    new SovtekMIG60(),
    new SovtekMIG100H(),
    new FramusMidControl(),
    new Crate(),
    new Aria(),
    new BoneRay(),
    new BlackstarHT5(),
    new DrZ(),
    new Tilt(),
    new NeveShelvingHiLo(),
    new Bench(),
    new Wah()
  ],
  Basic: [
    new RCLowpass(),
    new RCLowpassShelving(),
    new RCHighpass(),
    new RCHighpassShelving(),
    new SallenKeyLowpass(),
  ],
  'Big Muff': [
    new BigMuff(),
    new BigMuffHoof(),
    new BigMuffMusket(),
    new BigMuffPickle(),
  ],
  Boss: [
    new BossFZ2EQ(),
    new BossHM2(),
  ],
  James: [
    new JamesPassiveDualBassCap(),
    new JamesPassiveSingleBassCap(),
    new JamesActiveDualBassCap(),
    new JamesActiveSingleBassCap()
  ],
  Baxandall: [
    new BaxandallPassiveDualBassCap(),
    new BaxandallPassiveSingleBassCap(),
    new BaxandallActiveDualBassCap(),
    new BaxandallActiveSingleBassCap()
  ],
  Dumble: [
    new DumbleJazz(),
    new DumbleRock()
  ],
  SWTC: [
    new SWTC1(),
    new SWTC2(),
    new SWTC3(),
    new SWTC4()
  ],
},
defaultTopology = topologies.Fender[0];