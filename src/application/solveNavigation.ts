import type { Navigation } from '../domain/navigation/Navigation';
import { parseCommands } from '../domain/parsers/parseCommands';

export function solveNavigation(input: string, navigation: Navigation): number {
  const commands = parseCommands(input);
  const position = navigation.navigate(commands);

  return position.horizontal * position.depth;
}
