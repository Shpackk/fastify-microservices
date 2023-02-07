import { Client } from 'pg';
import {
  logError,
  logSucces,
  type Migration,
  importAllMigrationsData,
  sanitizeMigrations,
  readAndFilter,
} from './utility';

const client = new Client({
  password: 'test',
  user: 'test',
});

const filteredFiles = readAndFilter(__dirname);

importAllMigrationsData(filteredFiles).then(async (migrations) => {
  const sanitized = sanitizeMigrations(migrations);

  client.connect((err) => console.log(err || 'Connection Established'));

  for (const migration of sanitized) {
    await runMigrationWithClient(migration, client);
  }

  client.end((err) => console.log(err || 'Connection closed.'));
});

const runMigrationWithClient = async (migration: Migration, client: Client) => {
  try {
    await client.query(migration.up);
    logSucces(migration.up);
  } catch (error) {
    logError(migration.up, error);
    await client.query(migration.down);
  }
};
