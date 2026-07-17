import { describe, expect, it } from 'vitest';

import { parseCommands } from './parseCommands';

describe('parseCommands', () => {
  it('parses a single command', () => {
    expect(parseCommands('forward 5')).toEqual([
      {
        direction: 'forward',
        distance: 5,
      },
    ]);
  });

  it('parses multiple commands', () => {
    expect(
      parseCommands(`forward 5
down 3
up 2`),
    ).toEqual([
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
    expect(
      parseCommands(`forward 5
down 3
up 2
`),
    ).toEqual([
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

  it('throws for an invalid direction', () => {
    expect(() => parseCommands('backward 5')).toThrow(
      'Invalid direction: backward',
    );
  });

  it('throws for an invalid distance', () => {
    expect(() => parseCommands('forward five')).toThrow(
      'Invalid distance: five',
    );
  });

  it('throws for a missing distance', () => {
    expect(() => parseCommands('forward')).toThrow(
      'Invalid command: forward',
    );
  });

  it('throws for too many values', () => {
    expect(() => parseCommands('forward 5 extra')).toThrow(
      'Invalid command: forward 5 extra',
    );
  });

  it('throws for a negative distance', () => {
    expect(() => parseCommands('forward -5')).toThrow(
      'Invalid distance: -5',
    );
  });

  it('throws for a decimal distance', () => {
    expect(() => parseCommands('forward 3.5')).toThrow(
      'Invalid distance: 3.5',
    );
  });
});