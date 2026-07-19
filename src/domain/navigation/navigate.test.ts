import { describe, expect, it } from 'vitest';

import { navigate } from './navigate';

describe('navigate', () => {
  it('returns the origin when no commands are provided', () => {
    expect(navigate([])).toEqual({
      horizontal: 0,
      depth: 0,
    });
  });

  it('moves forward', () => {
    expect(
      navigate([
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
      navigate([
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
      navigate([
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
      navigate([
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
    navigate([
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
    navigate([
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