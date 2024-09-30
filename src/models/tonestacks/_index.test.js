import { test, expect } from 'vitest';
import { topologies } from './_index';

test('Tonestacks have unique ids', () => {
  const flatTopologies = Object.values(topologies).flat();
  const ids = flatTopologies.map((t) => t.id);
  expect(ids.length).toBe(new Set(ids).size);  
});