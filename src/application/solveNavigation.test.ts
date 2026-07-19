import { describe, expect, it } from 'vitest';

import { solveNavigation } from './solveNavigation';
import { PartOneNavigation } from '../domain/navigation/PartOneNavigation';
import { PartTwoNavigation } from '../domain/navigation/PartTwoNavigation';

describe('solveNavigation', () => {
  const input = `
    forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2
  `;

  it('solves the sample using the part one rules', () => {
    expect(solveNavigation(input, new PartOneNavigation())).toBe(150);
  });

  it('solves the sample using the part two rules', () => {
    expect(solveNavigation(input, new PartTwoNavigation())).toBe(900);
  });
});
