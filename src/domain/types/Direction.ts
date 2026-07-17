export const directions = ['forward', 'down', 'up'] as const;

export type Direction = (typeof directions)[number];
