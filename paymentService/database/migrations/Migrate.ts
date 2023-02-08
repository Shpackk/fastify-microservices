import {
  ClientForMigration,
  MigrationService,
  PrepareMigrations,
  SetupService,
} from './classes/index';
import { getMigrationFlag } from './utility';

const client = ClientForMigration.getInstance();

const prepare = new PrepareMigrations(__dirname);

const migrationService = new MigrationService(
  client,
  getMigrationFlag(process.argv),
);

const setup = new SetupService(client);

const migrate = async () => {
  try {
    const migFiles = await prepare
      .findMigrationsInCurrentDir()
      .importMigFiles();

    setup.createMigrationTable();

    const sanitizedQueries = migFiles.sanitizeMigrations();

    await migrationService.migrate(sanitizedQueries);

    ClientForMigration.closeConnection();
  } catch (error) {
    console.error(error);
  }
};

migrate();
