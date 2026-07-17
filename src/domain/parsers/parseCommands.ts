import type { NavigationCommand } from '../models/NavigationCommand';
import { directions } from '../types/Direction';
import type { Direction } from '../types/Direction';

export function parseCommands(input: string): NavigationCommand[] {
  return input
    .split('\n')
    .filter((line) => line !== '')
   .map((line) => {
    const [direction, distance] = line.split(' ');

    if (direction === undefined || distance === undefined) {
        throw new Error(`Invalid command: ${line}`);
    }

    return {
        direction: parseDirection(direction),
        distance: parseDistance(distance),
    };
    });
}

function parseDirection(value: string): Direction {
  if (directions.includes(value as Direction)) {
    return value as Direction;
  }

  throw new Error(`Invalid direction: ${value}`);
}

function parseDistance(value: string): number {
  const distance = Number(value);

  if (Number.isNaN(distance)) {
    throw new Error(`Invalid distance: ${value}`);
  }

  return distance;
}