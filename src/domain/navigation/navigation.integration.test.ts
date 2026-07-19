import { describe, expect, it } from 'vitest';

import { navigate } from './navigate';
import { parseCommands } from '../parsers/parseCommands';

describe('navigation integration', () => {
  it('navigates parsed commands', () => {
    const input = `
      forward 5
      down 5
      forward 8
      up 3
      down 8
      forward 2
    `;

    const commands = parseCommands(input);

    expect(navigate(commands)).toEqual({
      horizontal: 15,
      depth: 10,
    });
  });
});
