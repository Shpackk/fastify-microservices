#!/usr/bin/env node
import { existsSync, writeFileSync } from 'node:fs';

const cyanConsole = '\x1b[0;36m';
const redConsole = '\x1b[0;31m';
const resetColor = '\x1b[0m';

const paintSuccess = (str: string) => cyanConsole + str + resetColor;
const paintError = (str: string) => redConsole + str + resetColor;
/**
 * \x1b <--- change color scheme of the output
 *
 *  ANSI COLOR CODES
 *  [0;31m <--- red for errors.
 *  [0;36m <--- cyan for success.
 *
 * \x1b[0m <--- console resets back to the default color scheme.
 */

const migrationName = process.argv
  .find((argument) => argument.includes('name=') && !argument.endsWith('='))
  ?.trim()
  .split('=')[1];

if (migrationName === undefined || '') {
  console.info(paintError('Name for migration was not specified'));
  process.exit(1);
}

const migrationNameWithTime = `${new Date().getTime()}_${migrationName}`;

if (existsSync(`${__dirname}/${migrationNameWithTime}`)) {
  console.info(paintError('Migration with that name already exists'));
  process.exit(1);
}

writeFileSync(`${__dirname}/${migrationNameWithTime}.ts`, '');

console.info(
  paintSuccess(`Migration ${migrationNameWithTime} created! I hope.`),
);
process.exit(1);
