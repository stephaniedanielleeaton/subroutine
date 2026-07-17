import type { NavigationCommand } from '../models/NavigationCommand';
import { directions } from '../types/Direction';
import type { Direction } from '../types/Direction';

export function parseCommands(input: string): NavigationCommand[] {
  return input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => {
      const parts = line.split(' ');

      if (parts.length !== 2) {
        throw new Error(`Invalid command: ${line}`);
      }

      return {
        direction: parseDirection(parts[0]!),
        distance: parseDistance(parts[1]!),
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
  if (!/^\d+$/.test(value)) {
    throw new Error(`Invalid distance: ${value}`);
  }

  return Number(value);
}