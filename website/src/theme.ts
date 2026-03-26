import { createTheme } from '@mantine/core';
import type { MantineColorsTuple } from '@mantine/core';

const ORANGE_SHADES: MantineColorsTuple = [
  '#fff4eb',
  '#ffe8d2',
  '#ffd0a8',
  '#ffb578',
  '#f89445',
  '#f07820',
  '#e96a1a',
  '#c85510',
  '#a8440d',
  '#8a350b',
];

export function createClubTheme(primaryColor = 'orange') {
  return createTheme({
    primaryColor,
    colors: primaryColor === 'orange' ? { orange: ORANGE_SHADES } : undefined,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  });
}

export const theme = createClubTheme();
