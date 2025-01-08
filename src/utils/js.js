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

export function preallocate2DArray(rows, cols) {
  const arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

export function binaryFindClosest(arr, target, compare, guessIndex = 0) {
  if (guessIndex >= arr.length) {
    guessIndex = arr.length - 1;
  }

  let low = 0;
  let high = arr.length - 1;
  let closestIndex = guessIndex;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const diff = compare(arr[mid], target);

    if (diff === 0) {
      return mid;
    }

    if (Math.abs(diff) < Math.abs(compare(arr[closestIndex], target))) {
      closestIndex = mid;
    }

    if (diff < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return closestIndex;
}

