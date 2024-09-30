export function deepFreeze(obj) {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "object") deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};

export function defineEnum(obj) {
  return deepFreeze(obj);
}

export function defineDict(obj) {
  for (const id in obj) {
    obj[id].id = id;
  }

  return deepFreeze(obj);
}

// Not perfect, but should work well enough for our purposes?
export function areApproximatelyEqual(a, b, epsilon = 4 * Number.EPSILON) {    
  const diff = Math.abs(a - b);  
  if (diff < Number.MIN_VALUE) {
    return true;
  }

  a = Math.abs(a);
  b = Math.abs(b);
  const maxDiff = Math.min(a, b) * epsilon;
  
  return diff < maxDiff;
}