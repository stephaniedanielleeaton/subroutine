import type { Direction } from '../types/Direction';

export interface NavigationCommand {
  direction: Direction;
  distance: number;
}