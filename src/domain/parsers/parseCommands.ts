import type { NavigationCommand } from '../models/NavigationCommand';

export function parseCommands(input: string): NavigationCommand[] {

    return input
    .split('\n')
    .filter((line) => line !== '')
    .map((line) => {
        const [direction, distance] = line.split(' ');

        return {
        direction: direction as NavigationCommand['direction'],
        distance: Number(distance),
        };
    });
}