import { describe, expect, it } from 'vitest';

import { navigatePartTwo } from './navigatePartTwo';

describe('navigatePartTwo', () => {
  it('returns the origin when given no commands', () => {
    expect(navigatePartTwo([])).toEqual({
      horizontal: 0,
      depth: 0,
    });
  });

  it('moves forward without changing depth when aim is zero', () => {
    expect(
      navigatePartTwo([
        { direction: 'forward', distance: 5 },
      ]),
    ).toEqual({
      horizontal: 5,
      depth: 0,
    });
  });

  it('increases aim when moving down', () => {
    expect(
      navigatePartTwo([
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
      navigatePartTwo([
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
      navigatePartTwo([
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
      navigatePartTwo([
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
});