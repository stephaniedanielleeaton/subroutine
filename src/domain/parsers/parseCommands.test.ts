import { describe, expect, it } from 'vitest';

import { parseCommands } from './parseCommands';

describe('parseCommands', () => {
  it('parses a single command', () => {
    const result = parseCommands('forward 5');

    expect(result).toEqual([
      {
        direction: 'forward',
        distance: 5,
      },
    ]);
  });

  it('parses multiple commands', () => {
  const result = parseCommands(`forward 5
down 3
up 2`);

  expect(result).toEqual([
    {
      direction: 'forward',
      distance: 5,
    },
    {
      direction: 'down',
      distance: 3,
    },
    {
      direction: 'up',
      distance: 2,
    },
  ]);
});

it('returns an empty array for empty input', () => {
  expect(parseCommands('')).toEqual([]);
});

it('ignores a trailing newline', () => {
  const result = parseCommands(`forward 5
down 3
up 2
`);

  expect(result).toEqual([
    {
      direction: 'forward',
      distance: 5,
    },
    {
      direction: 'down',
      distance: 3,
    },
    {
      direction: 'up',
      distance: 2,
    },
  ]);
});

});