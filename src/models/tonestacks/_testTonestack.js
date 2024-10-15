import { test, expect } from 'vitest';
import { areApproximatelyEqual } from '~/utils/js';

expect.extend({
  toBeCloseEnoughTo(received, expected) {
    const { isNot } = this
    return {
      // There may be some accumulated floating-point discrepancy,
      // but at the very least it's not critical for plotting
      pass: areApproximatelyEqual(received, expected, 32 * Number.EPSILON),
      message: () => `${received} is${isNot ? ' not' : ''} close enough to ${expected}`
    }
  }
})

// Test that optimized tonestack coefficient calculations results match the unoptimized
// reference function
export function testTonestack(TonestackClass, referenceCalculateCoefficients) {
  test(`${TonestackClass.name}: optimized calculation coefficients match the reference`, () => {
    const ts = new TonestackClass();
    const cv = ts.controlValues;
    const values = [0, 0.5, 1];

    values.forEach((value) => {
      for (const key in cv) {
        cv[key] = value;
      }

      const optimizedCoefs = ts.calculateCoefficients(cv);
      const referenceCoefs = referenceCalculateCoefficients.call(ts, cv);

      expect(Array.isArray(optimizedCoefs)).toBe(true);
      expect(Array.isArray(referenceCoefs)).toBe(true);
      expect(optimizedCoefs.length).toBe(referenceCoefs.length);

      optimizedCoefs.forEach((array, i) => {
        expect(Array.isArray(array)).toBe(true);
        expect(Array.isArray(referenceCoefs[i])).toBe(true);
        expect(array.length).toBe(referenceCoefs[i].length);

        array.forEach((coef, k) => {
          expect(coef).toBeCloseEnoughTo(referenceCoefs[i][k]);
        });
      });
    });
  });
}