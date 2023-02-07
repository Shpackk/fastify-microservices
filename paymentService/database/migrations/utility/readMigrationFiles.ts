import { readdirSync } from 'node:fs';

const regExp = new RegExp(/\d*(_)(\w*)/g);

const readAndFilter = (directoryWithMigrations: string) => {
  const migrationsDir = readdirSync(directoryWithMigrations);

  return migrationsDir.filter((fileName) => fileName.match(regExp));
};

export { readAndFilter };
