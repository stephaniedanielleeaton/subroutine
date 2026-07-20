import { describe, expect, it } from 'vitest';

import { ParseException } from './ParseException';
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

  it('ignores blank lines', () => {
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

  it('accepts repeated whitespace', () => {
    expect(parseCommands('forward     5')).toEqual([
      {
        direction: 'forward',
        distance: 5,
      },
    ]);
  });

  it('accepts leading and trailing whitespace', () => {
    expect(parseCommands('   forward 5   ')).toEqual([
      {
        direction: 'forward',
        distance: 5,
      },
    ]);
  });

  it('accepts uppercase directions', () => {
    expect(parseCommands('FORWARD 5')).toEqual([
      {
        direction: 'forward',
        distance: 5,
      },
    ]);
  });

  it('accepts mixed-case directions', () => {
    expect(parseCommands('FoRwArD 5')).toEqual([
      {
        direction: 'forward',
        distance: 5,
      },
    ]);
  });

  it('accepts zero as a distance', () => {
    expect(parseCommands('forward 0')).toEqual([
      {
        direction: 'forward',
        distance: 0,
      },
    ]);
  });

  it('accepts a negative distance', () => {
    expect(parseCommands('forward -5')).toEqual([
      {
        direction: 'forward',
        distance: -5,
      },
    ]);
  });

  it('throws for an invalid direction', () => {
    expect(() => parseCommands('backward 5')).toThrow(ParseException);
    expect(() => parseCommands('backward 5')).toThrow('Line 1: Invalid direction: backward');
  });

  it('throws for an invalid distance', () => {
    expect(() => parseCommands('forward five')).toThrow(ParseException);
    expect(() => parseCommands('forward five')).toThrow('Line 1: Invalid distance: five');
  });

  it('throws for a missing direction', () => {
    expect(() => parseCommands('5')).toThrow(ParseException);
    expect(() => parseCommands('5')).toThrow('Line 1: Invalid command: 5');
  });

  it('throws for a missing distance', () => {
    expect(() => parseCommands('forward')).toThrow(ParseException);
    expect(() => parseCommands('forward')).toThrow('Line 1: Invalid command: forward');
  });

  it('throws for too many values', () => {
    expect(() => parseCommands('forward 5 extra')).toThrow(ParseException);
    expect(() => parseCommands('forward 5 extra')).toThrow(
      'Line 1: Invalid command: forward 5 extra',
    );
  });

  it('throws for a decimal distance', () => {
    expect(() => parseCommands('forward 3.5')).toThrow(ParseException);
    expect(() => parseCommands('forward 3.5')).toThrow('Line 1: Invalid distance: 3.5');
  });

  it('collects multiple parsing errors', () => {
    expect(() =>
      parseCommands(`forward five
backward 3
up
forward 8 extra`),
    ).toThrow(`Line 1: Invalid distance: five
Line 2: Invalid direction: backward
Line 3: Invalid command: up
Line 4: Invalid command: forward 8 extra`);
  });

  it('ignores blank lines at the beginning of the input', () => {
    expect(
      parseCommands(`

forward 5
down 3`),
    ).toEqual([
      {
        direction: 'forward',
        distance: 5,
      },
      {
        direction: 'down',
        distance: 3,
      },
    ]);
  });

  it('ignores blank lines at the end of the input', () => {
    expect(
      parseCommands(`forward 5
down 3


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
    ]);
  });

  it('ignores lines containing only whitespace', () => {
    expect(
      parseCommands(`forward 5

   
down 3`),
    ).toEqual([
      {
        direction: 'forward',
        distance: 5,
      },
      {
        direction: 'down',
        distance: 3,
      },
    ]);
  });

  it('accepts tab-separated values', () => {
    expect(parseCommands('forward\t5')).toEqual([
      {
        direction: 'forward',
        distance: 5,
      },
    ]);
  });

  it('throws for unrecognized input', () => {
    expect(() => parseCommands('!@#$%^&*')).toThrow(ParseException);
    expect(() => parseCommands('!@#$%^&*')).toThrow('Line 1: Invalid command: !@#$%^&*');
  });
});
