import { BaseTonestack } from '../BaseTonestack';
import { Tapers } from '~/utils/components';

export class ESeries extends BaseTonestack {
  static definition() {
    return {
      id: 'eser',
      name: 'E-Series',
      description: 'Found in tweed amps like <a href="https://schematicheaven.net/fenderamps/bandmaster_5e7_schem.pdf" rel="noopener noreferrer">Bandmaster 5E7</a>, <a href="https://schematicheaven.net/fenderamps/twin_5e8a_schem.pdf" rel="noopener noreferrer">Twin 5E8-A</a>, <a href="https://schematicheaven.net/fenderamps/pro_5e5a_schem.pdf" rel="noopener noreferrer">Pro 5E5-A</a>, <a href="https://schematicheaven.net/fenderamps/super_5e4a_schem.pdf" rel="noopener noreferrer">Super 5E4-A</a>. Component values can be slightly different.',
      components: {
        RIN: 1300,
        RB: 1e6,
        RT: 1e6,
        R2: 220e3,
        R3: 100e3,
        R5: 220e3,
        C1: 10e-9,
        C2: 250e-12,
        C3: 100e-9,
        C4: 5e-9,
      },
      controls: {
        RB: Tapers.LogA,
        RT: Tapers.LogA
      }
    };
  }

  calculateCoefficients(controlValues) {
    const {
      RIN, R2, R3, R5, C1, C2, C3, C4,
      RT: [RT2, RT1],
      // Sic! (Usually the other way around: RB2, RB1)
      RB: [RB1, RB2]
    } = this.processComponentValues(controlValues);

    // The coefficient expressions are taken from https://github.com/jatalahd/tsc
    // and refactored using sympy to reduce the number of operations.
    // Original operations: 1746 (*, +, -)
    // Optimized operations: 280 (6.24x less)
    const t0 = RB1*RIN;
    const t1 = R2*RT1;
    const t2 = RB2*t1;
    const t3 = R2 + RT1;
    const t4 = RIN*t3 + t1;
    const t5 = R5*RB1;
    const t6 = R3*(RB2*(R5 + RB1) + t5);
    const t7 = R5 + RT1;
    const t8 = R2*RB2;
    const t9 = R2*RB1;
    const t10 = R2 + RB1;
    const t11 = R2 + RIN;
    const t12 = C1*C2;
    const t13 = C3*t12;
    const t14 = C4*t13;
    const t15 = R3*RIN;
    const t16 = R2*RT2;
    const t17 = R2*RIN;
    const t18 = RT2*t11;
    const t19 = R3*RB1;
    const t20 = R3 + RB1;
    const t21 = R3 + RIN;
    const t22 = R2*(RB1 + t21) + RIN*t20;
    const t23 = R2*t21 + t15;
    const t24 = R2 + R3;
    const t25 = RB2*t24;
    const t26 = RB2 + t24;
    const t27 = R3 + t10;
    const t28 = R5*(RB2*t27 + t19 + t9);
    const t29 = C2*RT1;
    const t30 = RIN*t25;
    const t31 = RIN + RT2;
    const t32 = C2*R3;
    const t33 = C2*t7;
    const t34 = RB2*t23;
    const t35 = RB2*t11 + t23;
    const t36 = RB1*t25;
    const t37 = C1 + C2;
    const t38 = R5*t37;
    const t39 = t29 + t38;
    const t40 = R3*RB2;
    const t41 = RB1*t26;
    const t42 = t40 + t41 + t8;
    const t43 = C2*R5*t27;
    const t44 = RB1*t24;
    const t45 = C2*t44;
    const t46 = C2 + C3;
    const t47 = C3*R2;
    const t48 = C4*(t25 + t41) + t20*t47 + t45;
    const t49 = C1*t44;
    const t50 = C1*RT2;
    const t51 = RB1*RB2;
    const t52 = t24*t5;
    const t53 = R5*t24;
    const t54 = R5 + t24;
    const t55 = C2*C4;
    const t56 = C2*(R3*R5 + RB1*(R3 + t7));

    const denXRe = t14*(R5*(RB1*(RIN*(RB2*t3 + t1) + t2) + RIN*t2) + RT2*(R3*(R5*t11*(RB1 + RB2) + RB1*(RIN*(RB2 + t3) + t1 + t8) + RB2*t4) + t7*(RB1*t8 + RIN*(RB2*t10 + t9))) + t0*t2 + t4*t6);
    const denAIm = C4*(C1*t29*(RB1*(RT2*t26 + t25) + RT2*t25 + t28) + C3*(C1*(RB1*(RT2*t35 + t34) + RT2*t34) + t32*(RB2*(R2*(RB1 + RIN) + t0) + RIN*t9) + (C1*R5 + t33)*(RB1*t35 + t34)) + t12*(RB1*(RT2*(RB2*(R3 + t11) + t15 + t17) + t30) + RT2*t30 + t28*t31)) + t13*(R5*(RT2*t22 + t17*t20) + RT1*(R5*t22 + RB1*(t18 + t23) + RT2*t23) + t15*t16 + t19*(t17 + t18));
    const denBRe = C1*C4*t36 + C1*(RIN*(RT2*t27*t46 + t45) + RT2*t48 + t29*(R3*RT2 + RB1*(RT2 + t24) + t16) + t43*(RT1 + t31)) + C3*(C4*R2*(RB1*(R3 + RB2) + t40) + C4*RIN*t42 + R2*(R3*t29 + RB1*(R3*t37 + t29)) + RIN*(C2*(R3*t3 + RB1*(R3 + RT1) + t1) + t49) + t38*(R2*R3 + RIN*t27 + t9)) + C4*(C2*t36 + t42*(C2*RIN + t39));
    const denCIm = t27*(RIN*t46 + t39 + t50) + t48 + t49;
    const denDRe = t27;
    const numXRe = t14*t16*(t51*t7 + t6);
    const numAIm = t47*(C4*(t32*(R5*RB2 + RB1*(R5 + RB2)) + t51*(t33 + t50)) + t50*t56) + t50*t55*(RB2*(RB1*t54 + t53) + t52);
    const numBRe = t47*t56 + t52*t55 + (C2*t53 + RB1*(C2*t54 + t47))*(C4*RB2 + t50);
    const numCIm = RB1*(R2*t46 + t32) + t43;
    const numDRe = 0;

return [
      [numDRe, numCIm, numBRe, numAIm, numXRe],
      [denDRe, denCIm, denBRe, denAIm, denXRe]
    ];
  }
}