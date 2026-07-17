import type { NavigationCommand } from '../models/NavigationCommand';

export function parseCommands(input: string): NavigationCommand[] {
  const [direction, distance] = input.split(' ');

  return [
    {
      direction: direction as NavigationCommand['direction'],
      distance: Number(distance),
    },
  ];
}