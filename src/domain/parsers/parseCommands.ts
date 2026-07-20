import type { NavigationCommand } from '../models/NavigationCommand';
import { ParseException, type ParseError } from './ParseException';
import { directions } from '../types/Direction';
import type { Direction } from '../types/Direction';

type DirectionResult = Direction | ParseError;
type DistanceResult = number | ParseError;

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

    const direction = parseDirection(parts[0]!, index + 1);
    const distance = parseDistance(parts[1]!, index + 1);

    if (isParseError(direction)) {
      errors.push(direction);
    }

    if (isParseError(distance)) {
      errors.push(distance);
    }

    if (!isParseError(direction) && !isParseError(distance)) {
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

function parseDirection(value: string, line: number): DirectionResult {
  const normalized = value.toLowerCase();

  if (directions.includes(normalized as Direction)) {
    return normalized as Direction;
  }

  return {
    line,
    message: `Invalid direction: ${value}`,
  };
}

function parseDistance(value: string, line: number): DistanceResult {
  if (!/^-?\d+$/.test(value)) {
    return {
      line,
      message: `Invalid distance: ${value}`,
    };
  }

  return Number(value);
}

function isParseError(value: unknown): value is ParseError {
  return typeof value === 'object' && value !== null && 'line' in value && 'message' in value;
}
