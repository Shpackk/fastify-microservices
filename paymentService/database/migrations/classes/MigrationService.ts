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
  }

  private async runMigrationWithClient(migration: Migration) {
    try {
      await this.client.query(migration[this.flag]);
      logSucces(migration[this.flag]);
    } catch (error) {
      logError(migration[this.flag], error);
    }
  }

  // private async updateMigrationLogTable(names: string[]) {
  //   try {
  //     await this.client
  //       .query(`INSERT INTO migrationsLog `);
  //   } catch (error) {
  //     logError('Updating migrationLog table error', error);
  //   }
  // }
}
// TODO - support work with migrations log table to store
// info about migrations that are applied to the system
// SELECT * FROM
//   unnest(
//     ARRAY[1, 2, 3, 4],
//     ARRAY['Shawn', 'Bible', 'Build', 'Jeff'],
//     ARRAY[23, 24, 28, 27]
//   ) AS data(id,name,age);
