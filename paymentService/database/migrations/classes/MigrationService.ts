import { Client } from 'pg';
import {
  type Migration,
  logSucces,
  logError,
  getMigrationFlag,
} from '../utility';

type FlagType = ReturnType<typeof getMigrationFlag>;

export class MigrationService {
  constructor(
    private readonly client: Client,
    private readonly flag: FlagType,
  ) {}

  async migrate(migrations: Migration[]) {
    for (const migration of migrations) {
      await this.runMigrationWithClient(migration);
    }
    return this;
  }

  private async runMigrationWithClient(migration: Migration) {
    try {
      await this.client.query(migration[this.flag]);
      logSucces(migration[this.flag]);
    } catch (error) {
      logError(migration[this.flag], error);
    }
  }

  async checkSyncWithDB(pendingMigrations: string[]) {
    try {
      const { rows } = await this.client.query(
        `SELECT CONCAT(created_at, '_', migrationname) as migration FROM migrationsLog`,
      );

      const outOfSyncMigrations = pendingMigrations.filter((migration, idx) =>
        this.flag === 'up'
          ? migration !== rows[idx]?.migration
          : migration === rows[idx]?.migration,
      );

      if (outOfSyncMigrations.length > 0) {
        return outOfSyncMigrations;
      }

      logSucces('DB is up to date. Migrations are not applied.');
      process.exit(1);
    } catch (error) {
      logError('Updating migrationLog table error', error);
    }
  }

  async trackNewMigrations(outOfSyncMigrations: string[]) {
    try {
      if (this.flag === 'up') {
        await this.client.query(
          `INSERT INTO migrationsLog (migrationName, created_at) VALUES ${this.spreadForBulkInsert(
            outOfSyncMigrations,
          )};`,
        );
      } else await this.client.query(`DROP TABLE IF EXISTS migrationsLog;`);
    } catch (error) {
      logError('Couldnt update the migration table', error);
    }
  }
  private spreadForBulkInsert(migrations: string[]) {
    return migrations
      .map((migration) => {
        const data = migration.split('_');
        return `('${data[1]}', '${data[0]}')`;
      })
      .join(',');
  }
}
