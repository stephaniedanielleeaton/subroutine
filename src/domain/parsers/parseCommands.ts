import type { NavigationCommand } from '../models/NavigationCommand';
import { ParseException, type ParseError } from './ParseException';
import { directions } from '../types/Direction';
import type { Direction } from '../types/Direction';

export function parseCommands(input: string): NavigationCommand[] {
  const commands: NavigationCommand[] = [];
  const errors: ParseError[] = [];

  const lines = input.split('\n');

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (line === '') {
      return;
    }

    const parts = line.split(/\s+/);

    if (parts.length !== 2) {
      errors.push({
        line: index + 1,
        message: `Invalid command: ${rawLine}`,
      });

      return;
    }

    const direction = tryParseDirection(parts[0]!);
    const distance = tryParseDistance(parts[1]!);

    if (direction === null) {
      errors.push({
        line: index + 1,
        message: `Invalid direction: ${parts[0]}`,
      });
    }

    if (distance === null) {
      errors.push({
        line: index + 1,
        message: `Invalid distance: ${parts[1]}`,
      });
    }

    if (direction !== null && distance !== null) {
      commands.push({
        direction,
        distance,
      });
    }
  });

  if (errors.length > 0) {
    throw new ParseException(errors);
  }

  return commands;
}

function tryParseDirection(value: string): Direction | null {
  const normalized = value.toLowerCase();

  if (directions.includes(normalized as Direction)) {
    return normalized as Direction;
  }

  return null;
}

function tryParseDistance(value: string): number | null {
  if (!/^-?\d+$/.test(value)) {
    return null;
  }

  return Number(value);
}
