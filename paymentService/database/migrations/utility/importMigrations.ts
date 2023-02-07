import type { Migration } from './types';

export const importAllMigrationsData = async (migrations: string[]) => {
  const migrationsData: Migration[] = [];

  for (const migration of migrations) {
    let { default: awaitedMigr } = await import('../' + migration);
    migrationsData.push(awaitedMigr);
  }
  return migrationsData;
};
