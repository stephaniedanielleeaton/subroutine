import { describe, expect, it } from 'vitest';

import { PartTwoNavigation } from './PartTwoNavigation';

describe('PartTwoNavigation', () => {
  const navigation = new PartTwoNavigation();

  it('returns the origin when given no commands', () => {
    expect(navigation.navigate([])).toEqual({
      horizontal: 0,
      depth: 0,
    });
  });

  it('moves forward without changing depth when aim is zero', () => {
    expect(
      navigation.navigate([
        { direction: 'forward', distance: 5 },
      ]),
    ).toEqual({
      horizontal: 5,
      depth: 0,
    });
  });

  it('increases aim when moving down', () => {
    expect(
      navigation.navigate([
        { direction: 'down', distance: 5 },
        { direction: 'forward', distance: 2 },
      ]),
    ).toEqual({
      horizontal: 2,
      depth: 10,
    });
  });

  it('decreases aim when moving up', () => {
    expect(
      navigation.navigate([
        { direction: 'down', distance: 5 },
        { direction: 'up', distance: 2 },
        { direction: 'forward', distance: 3 },
      ]),
    ).toEqual({
      horizontal: 3,
      depth: 9,
    });
  });

  it('does not change position when moving zero units', () => {
    expect(
      navigation.navigate([
        { direction: 'forward', distance: 0 },
        { direction: 'down', distance: 0 },
        { direction: 'up', distance: 0 },
      ]),
    ).toEqual({
      horizontal: 0,
      depth: 0,
    });
  });

  it('applies multiple commands in sequence', () => {
    expect(
      navigation.navigate([
        { direction: 'forward', distance: 5 },
        { direction: 'down', distance: 5 },
        { direction: 'forward', distance: 8 },
        { direction: 'up', distance: 3 },
        { direction: 'down', distance: 8 },
        { direction: 'forward', distance: 2 },
      ]),
    ).toEqual({
      horizontal: 15,
      depth: 60,
    });
  });

  it('accumulates aim across multiple down commands', () => {
    expect(
      navigation.navigate([
        { direction: 'down', distance: 2 },
        { direction: 'down', distance: 3 },
        { direction: 'forward', distance: 2 },
      ]),
    ).toEqual({
      horizontal: 2,
      depth: 10,
    });
  });

  it('allows aim to become negative', () => {
    expect(
      navigation.navigate([
        { direction: 'up', distance: 3 },
        { direction: 'forward', distance: 2 },
      ]),
    ).toEqual({
      horizontal: 2,
      depth: -6,
    });
  });

  it('uses the current aim for each forward command', () => {
    expect(
      navigation.navigate([
        { direction: 'down', distance: 2 },
        { direction: 'forward', distance: 2 },
        { direction: 'down', distance: 3 },
        { direction: 'forward', distance: 2 },
      ]),
    ).toEqual({
      horizontal: 4,
      depth: 14,
    });
  });
});