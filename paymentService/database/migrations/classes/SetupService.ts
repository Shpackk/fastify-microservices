import { Client } from 'pg';

export class SetupService {
  constructor(private readonly client: Client) {}

  createMigrationTable() {
    this.client.query(
      `CREATE TABLE IF NOT EXISTS MigrationsLog (
      migrationName varchar,
      created_at varchar
    );`,
      (err) => {
        if (err) console.error("Couldn't create migrations table", err);
        else console.info('Migration table created');
      },
    );
  }
}
