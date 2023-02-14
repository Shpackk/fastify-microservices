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
    setup.createMigrationTable();

    const migFiles = prepare.findMigrationsInCurrentDir();

    const notTrackedMigrations = await migrationService.checkSyncWithDB(
      migFiles.fileNames,
    );

    await migFiles.importMigFiles(notTrackedMigrations!);

    const sanitizedQueries = migFiles.sanitizeMigrations();

    await migrationService.migrate(sanitizedQueries);

    await migrationService.trackNewMigrations(notTrackedMigrations!);

    ClientForMigration.closeConnection();
    process.exit(1);
  } catch (error) {
    console.error(error);
  }
};

migrate();
