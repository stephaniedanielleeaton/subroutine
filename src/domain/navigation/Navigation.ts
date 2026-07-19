import type { NavigationCommand } from '../models/NavigationCommand';
import type { Position } from '../models/Position';

export interface Navigation {
  navigate(commands: NavigationCommand[]): Position;
}
