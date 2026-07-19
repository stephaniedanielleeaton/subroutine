import type { NavigationCommand } from '../models/NavigationCommand';
import type { Position } from '../models/Position';
import type { Navigation } from './Navigation';

export class PartOneNavigation implements Navigation {
  navigate(commands: NavigationCommand[]): Position {
    const position: Position = {
      horizontal: 0,
      depth: 0,
    };

    for (const command of commands) {
      switch (command.direction) {
        case 'forward':
          position.horizontal += command.distance;
          break;

        case 'down':
          position.depth += command.distance;
          break;

        case 'up':
          position.depth -= command.distance;
          break;
      }
    }

    return position;
  }
}
