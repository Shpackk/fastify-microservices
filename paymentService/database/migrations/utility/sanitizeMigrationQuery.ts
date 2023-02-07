import type { Migration } from './types';

export const sanitizeMigrations = (migrations: Migration[]) =>
  migrations.map(({ up, down }) => {
    return {
      up: up.replaceAll('\n', ''),
      down: down.replaceAll('\n', ''),
    };
  });
