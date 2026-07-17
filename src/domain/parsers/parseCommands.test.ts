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
});