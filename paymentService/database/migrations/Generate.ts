#!/usr/bin/env node
import { existsSync, writeFileSync } from 'node:fs';

const migrationTemplate = "export default { \n\t up: '', \n\t down: '' \n};";
const migrationName = process.argv
  .find((argument) => argument.includes('name=') && !argument.endsWith('='))
  ?.trim()
  .split('=')[1];

if (migrationName === undefined || '') {
  console.info('Name for migration was not specified', '');
  process.exit(1);
}

const migrationNameWithTime = `${new Date().getTime()}_${migrationName}`;

if (existsSync(`${__dirname}/${migrationNameWithTime}`)) {
  console.info('Migration with that name already exists', '');
  process.exit(1);
}

writeFileSync(`${__dirname}/${migrationNameWithTime}.ts`, migrationTemplate);

console.info(`Migration ${migrationNameWithTime} created! I hope.`);
process.exit(1);
