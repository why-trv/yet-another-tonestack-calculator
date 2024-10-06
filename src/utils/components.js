import { areApproximatelyEqual, defineEnum } from "./js";

// A collection of potentiometer taper models.
// NB: These use normalized input range of 0..1, not 0..10
const Tapers = defineEnum({
  Linear: {
    id: 'L',
    name: 'Linear',
    positionToValue: (x) => x
  },
  // logA potentiometer model as defined in the original TSC
  LogA: {
    id: 'A',
    name: 'LogA',
    positionToValue: (x) => x < 0.5 ? x * 0.6 : x * 1.4 - 0.4
  },
  // logB potentiometer model as defined in the original TSC
  LogB: {
    id: 'B',
    name: 'LogB',
    positionToValue: (x) => x < 0.5 ? x * 0.2 : x * 1.8 - 0.8
  },
  // logC potentiometer model as inverse of logA (anti-log taper)
  LogC: {
    id: 'C',
    name: 'LogC',
    positionToValue: (x) => x < 0.5 ? x * 1.4 : x * 0.6 + 0.4
  }
});

const PotRole = defineEnum({
  Pot: 'P',
  VR: 'V'
});

const PotDisplayRangeID = defineEnum({
  DEFAULT: 'D',
  TWEED: 'T',
  FENDER: 'F'
});

const PotDisplayRanges = defineDict({
  [PotDisplayRangeID.DEFAULT]: {
    name: 'Default (0–10)',
    range: [0, 10]
  },
  [PotDisplayRangeID.TWEED]: {
    name: 'Tweed (1–12)',
    range: [1, 12]
  },
  [PotDisplayRangeID.FENDER]: {
    name: 'Fender (1–10)',
    range: [1, 10]
  }
});

const PotAuxDisplayMode = defineEnum({
  None: 'n',
  Values: 'v',
  Percentage: 'p'
});

const ComponentType = defineEnum({
  R: 'R', // resistor
  C: 'C', // capacitor
  L: 'L', // inductor
  B: 'B' // transitor beta
});

export { Tapers, PotRole, PotDisplayRanges, PotDisplayRangeID, PotAuxDisplayMode, ComponentType };

const componentSettings = {  
  [ComponentType.R]: {
    decimalPattern: /^(\d+(?:\.\d+)?)\s*([KkMmGg]?).*$/,
    rkmPattern: /^(\d*)([RrKkMmGg])(\d*)$/,
    allowedCharPattern: /[0-9.,\sRrKkMmGg]/,
    sanitationPattern: /[^0-9.,\sRrKkMmGg]/g
  },
  [ComponentType.C]: {
    decimalPattern: /^(\d+(?:\.\d+)?)\s*([PpNnUu\u00b5\u03bcMm]?)[fF]?.*$/,
    rkmPattern: /^(\d*)([PpNnUu\u00b5\u03bcMmFf])(\d*)$/,
    allowedCharPattern: /[0-9.,\sPpNnUu\u00b5\u03bcMmFf]/,
    sanitationPattern: /[^0-9.,\sPpNnUu\u00b5\u03bcMmFf]/g
  },
  [ComponentType.L]: {
    decimalPattern: /^(\d+(?:\.\d+)?)\s*([Uu\u00b5\u03bcMmHh]?).*$/,
    rkmPattern: /^(\d*)([Uu\u00b5\u03bcMmHh])(\d*)$/,
    allowedCharPattern: /[0-9.,\sUu\u00b5\u03bcMmHh]/,
    sanitationPattern: /[^0-9.,\sUu\u00b5\u03bcMmHh]/g
  },
  [ComponentType.B]: {
    decimalPattern: /^(\d+(?:\.\d+)?).*$/,
    rkmPattern: /^(\d+(?:\.\d+)?)$/,
    allowedCharPattern: /[0-9.,\s]/,
    sanitationPattern: /[^0-9.,\s]/g
  }
};

const componentScales = {
  p: 1e-12,
  P: 1e-12,
  n: 1e-9,
  N: 1e-9,
  u: 1e-6,
  U: 1e-6,
  \u00b5: 1e-6,
  \u03bc: 1e-6,
  m: 1e-3,
  k: 1e3,
  K: 1e3,
  M: 1e6,
  g: 1e9,
  G: 1e9,
  // ----
  H: 1,
  h: 1,
  f: 1,
  F: 1
};

const formatter = new Intl.NumberFormat('en-US', {maximumSignificantDigits: 3});

export function formatComponentValue(value) {
  if (typeof value !== 'number') {
    return value;
  }

  if (value >= 1e9) return formatter.format(value / 1e9) + 'G';
  if (value >= 1e6) return formatter.format(value / 1e6) + 'M';
  if (value >= 1e3) return formatter.format(value / 1e3) + 'k';
  if (value >= 1) return formatter.format(value);
  if (value >= 1e-3) return formatter.format(value * 1e3) + 'm';
  if (value >= 1e-6) return formatter.format(value * 1e6) + 'u';
  if (value >= 1e-9) return formatter.format(value * 1e9) + 'n';
  if (value >= 1e-12) return formatter.format(value * 1e12) + 'p';
  return formatter.format(value);
}

// typeOrName could be R, C, L, B or component name like R1, CIN, LF 
// - what matters is the first letter
export function parseComponentValue(input, typeOrName) {
  // Bypass if already a number
  if (typeof input === 'number') {
    return input;
  }

  const type = getComponentLetter(typeOrName);

  // Normalize the input: replace ',' with '.' for decimal separator
  input = input.replace(',', '.');
  
  let decimalPattern = componentSettings[type].decimalPattern;
  let rkmPattern = componentSettings[type].rkmPattern;

  let number = 0;
  let letter = '';

  // Decimal notation matching
  let match = input.match(decimalPattern);
  if (match) {
    number = parseFloat(match[1]); 
    letter = match[2];
  } else {
    // RKM matching (e.g. 4K7, R47, 47K3, etc.)
    match = input.match(rkmPattern);
    if (match) {      
      // Combine and parse digits before and after the letter
      number = parseFloat((match[1] || '0') + '.' + (match[3] || 0));    
      letter = match[2];
    }
  } 

  
  if (letter === 'M' && (type === ComponentType.C || type === ComponentType.L)) {
    // For capacitors and inductors, 'M' is kinda ok, but it sure isn't mega
    letter = 'm';
  } else if (letter === 'm' && type === ComponentType.R) {
    // For resistors, assume 'm' is mega, not milli
    letter = 'M';
  }

  if (componentScales.hasOwnProperty(letter)) {
    return number * componentScales[letter];
  }

  // If no scale provided, default to something depending on the component type
  switch (type) {    
    case ComponentType.C:      
      return number * componentScales.p; // pF
    default:
      return number;
  }
}

export function testComponentValueInputChar(input, typeOrName) {
  const type = getComponentLetter(typeOrName);
  return componentSettings[type].allowedCharPattern.test(input);
}

export function sanitizeComponentValueInput(input, typeOrName) {  
  const type = getComponentLetter(typeOrName);
  return input.replace(componentSettings[type].sanitationPattern, '');
}

export function getComponentLetter(name) {
  return name.substring(0, 1);  
}

export function getComponentSubscript(name) {
  return name.substring(1);
}

export function splitPotValue(value, proportion) {
  const R2 = proportion * value;
  const R1 = value - R2;
  return [R2, R1];
}

export function areGainsAppoximatelyEqual(a, b) {
  return areApproximatelyEqual(a, b, 0.01);
}

export function formatGain(x) {
  let res;

  if (areGainsAppoximatelyEqual(x, 0)) {
    res = "0.0";
  } else {
    res = x.toFixed(1)
    
    if (x > 0 ) {
      res = "+" + res;
    }
  }

  return res + " dB";
}

export function parseGain(x) {
  const value = parseFloat(x);
  return isNaN(value) ? 0 : Math.max(-20, Math.min(20, value));
}

export function testGainInputChar(input) {
  return /[0-9.,\+\-]/.test(input);
}

export function sanitizeGainInput(input) {    
  return input.replace(/[^0-9.,\+\-]/g, '');
}