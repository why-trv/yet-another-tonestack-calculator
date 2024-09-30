export function generateFrequencies(start, end, increment = 1) {
  const expStart = Math.floor(Math.log10(start));
  const expEnd = Math.floor(Math.log10(end));

  const res = [];    
  for (let exp = expStart; exp <= expEnd; exp++) {
    const mag = Math.pow(10, exp);

    for (let num = mag; (num < 10 * mag) && (num <= end); num += (increment * mag)) {
      if (num < start) { continue; }      

      res.push(num);
    }
  }
  return res;
};