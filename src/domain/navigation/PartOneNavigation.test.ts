import { describe, expect, it } from 'vitest';

import { PartOneNavigation } from './PartOneNavigation';

describe('PartOneNavigation', () => {
  const navigation = new PartOneNavigation();

  it('returns the origin when no commands are provided', () => {
    expect(navigation.navigate([])).toEqual({
      horizontal: 0,
      depth: 0,
    });
  });

  it('moves forward', () => {
    expect(
      navigation.navigate([
        {
          direction: 'forward',
          distance: 5,
        },
      ]),
    ).toEqual({
      horizontal: 5,
      depth: 0,
    });
  });

  it('moves down', () => {
    expect(
      navigation.navigate([
        {
          direction: 'down',
          distance: 5,
        },
      ]),
    ).toEqual({
      horizontal: 0,
      depth: 5,
    });
  });

  it('moves up', () => {
    expect(
      navigation.navigate([
        {
          direction: 'up',
          distance: 5,
        },
      ]),
    ).toEqual({
      horizontal: 0,
      depth: -5,
    });
  });

  it('applies multiple commands in order', () => {
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
      depth: 10,
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

  it('accumulates repeated forward commands', () => {
    expect(
      navigation.navigate([
        { direction: 'forward', distance: 2 },
        { direction: 'forward', distance: 3 },
        { direction: 'forward', distance: 5 },
      ]),
    ).toEqual({
      horizontal: 10,
      depth: 0,
    });
  });
});
