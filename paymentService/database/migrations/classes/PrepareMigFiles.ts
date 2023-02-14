import { readdirSync } from 'node:fs';
import type { Migration } from '../utility';

export class PrepareMigrations {
  public fileNames: string[] = [];
  private migrations: Migration[] = [];
  private regExp = new RegExp(/\d*(_)(\w*)/g);

  constructor(private readonly dirName: string) {}

  findMigrationsInCurrentDir() {
    const migrationsDir = readdirSync(this.dirName);

    for (const fileName of migrationsDir) {
      if (fileName.match(this.regExp)) {
        this.fileNames.push(fileName.replace('.ts', ''));
      }
    }

    return this;
  }

  async importMigFiles(notTrackedMigrations: string[]) {
    for (const fileName of notTrackedMigrations) {
      let { default: migration } = await import('../' + fileName);
      this.migrations.push(migration);
    }
  }

  sanitizeMigrations() {
    const sanitized = this.migrations.map(({ up, down }) => {
      return {
        up: up.replaceAll('\n', ''),
        down: down.replaceAll('\n', ''),
      };
    });
    this.migrations = sanitized;
    return this.migrations;
  }
}
