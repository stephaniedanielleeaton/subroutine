import type { NavigationCommand } from '../models/NavigationCommand';
import type { Position } from '../models/Position';

export function navigatePartTwo(
  commands: NavigationCommand[],
): Position {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (const command of commands) {
    switch (command.direction) {
      case 'forward':
        horizontal += command.distance;
        depth += aim * command.distance;
        break;

      case 'down':
        aim += command.distance;
        break;

      case 'up':
        aim -= command.distance;
        break;
    }
  }

  return {
    horizontal,
    depth,
  };
}