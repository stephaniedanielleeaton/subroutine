import { describe, expect, it } from 'vitest';

import { PartOneNavigation } from './PartOneNavigation';
import { PartTwoNavigation } from './PartTwoNavigation';
import { parseCommands } from '../parsers/parseCommands';

describe('Navigation integration', () => {
  const input = `
    forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2
  `;

  const commands = parseCommands(input);

  describe('PartOneNavigation', () => {
    const navigation = new PartOneNavigation();

    it('navigates parsed commands using the part one rules', () => {
      expect(navigation.navigate(commands)).toEqual({
        horizontal: 15,
        depth: 10,
      });
    });
  });

  describe('PartTwoNavigation', () => {
    const navigation = new PartTwoNavigation();

    it('navigates parsed commands using the part two rules', () => {
      expect(navigation.navigate(commands)).toEqual({
        horizontal: 15,
        depth: 60,
      });
    });
  });
});
