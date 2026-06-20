import { areApproximatelyEqual, defineEnum } from "./js";

// Potentiometer taper models using piecewise-linear approximation.
// Input range is normalized 0..1 (not 0..10).
// Log (A) tapers are defined by their midpoint percentage: e.g. 10A means 10% of
// total resistance at the midpoint. Reverse log (C) tapers are the mirror image.
// Dead zones at both ends model real-world pots where the first and last few
// percent of travel produce no change.
const DEFAULT_DEAD_ZONE_LO = 0.08;
const DEFAULT_DEAD_ZONE_HI = 0.06;
const BREAKPOINT = 0.6;

function logTaper(p, dzLo = DEFAULT_DEAD_ZONE_LO, dzHi = DEFAULT_DEAD_ZONE_HI) {
  const activeRange = 1 - dzLo - dzHi;
  const im = (0.5 - dzLo) / activeRange;
  const yb = p * BREAKPOINT / im;
  const s1 = yb / BREAKPOINT;
  const s2 = (1 - yb) / (1 - BREAKPOINT);
  return (x) => {
    if (x <= dzLo) return 0;
    if (x >= 1 - dzHi) return 1;
    const t = (x - dzLo) / activeRange;
    return t < BREAKPOINT ? t * s1 : (t - BREAKPOINT) * s2 + yb;
  };
}

function revLogTaper(p, dzLo = DEFAULT_DEAD_ZONE_LO, dzHi = DEFAULT_DEAD_ZONE_HI) {
  const log = logTaper(p, dzHi, dzLo);
  return (x) => 1 - log(1 - x);
}

function linearTaper(dzLo = DEFAULT_DEAD_ZONE_LO, dzHi = DEFAULT_DEAD_ZONE_HI) {
  const activeRange = 1 - dzLo - dzHi;
  return (x) => {
    if (x <= dzLo) return 0;
    if (x >= 1 - dzHi) return 1;
    return (x - dzLo) / activeRange;
  };
}

const Tapers = defineEnum({
  Linear: { id: 'L',   name: 'Linear', positionToValue: linearTaper() },
  '05A':  { id: '05A', name: '05A',    positionToValue: logTaper(0.05) },
  '10A':  { id: '10A', name: '10A',    positionToValue: logTaper(0.10) },
  '15A':  { id: '15A', name: '15A',    positionToValue: logTaper(0.15) },
  '20A':  { id: '20A', name: '20A',    positionToValue: logTaper(0.20) },
  '25A':  { id: '25A', name: '25A',    positionToValue: logTaper(0.25) },
  '30A':  { id: '30A', name: '30A',    positionToValue: logTaper(0.30) },
  '35A':  { id: '35A', name: '35A',    positionToValue: logTaper(0.35) },
  '05C':  { id: '05C', name: '05C',    positionToValue: revLogTaper(0.05) },
  '10C':  { id: '10C', name: '10C',    positionToValue: revLogTaper(0.10) },
  '15C':  { id: '15C', name: '15C',    positionToValue: revLogTaper(0.15) },
  '20C':  { id: '20C', name: '20C',    positionToValue: revLogTaper(0.20) },
  '25C':  { id: '25C', name: '25C',    positionToValue: revLogTaper(0.25) },
  '30C':  { id: '30C', name: '30C',    positionToValue: revLogTaper(0.30) },
  '35C':  { id: '35C', name: '35C',    positionToValue: revLogTaper(0.35) },
});

const PotRole = defineEnum({
  Pot: 'P',
  VR: 'V'
});

const PotDisplayRangeID = defineEnum({
  DEFAULT: 'D',
  TUFNEL: 'U',
  TWEED: 'T',
  FENDER: 'F'
});

const PotDisplayRanges = defineDict({
  [PotDisplayRangeID.DEFAULT]: {
    name: 'Default (0–10)',
    range: [0, 10]
  },
  [PotDisplayRangeID.TUFNEL]: {
    name: 'Tufnel (0–11)',
    range: [0, 11]
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