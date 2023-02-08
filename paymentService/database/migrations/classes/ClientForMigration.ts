import { Client } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

export class ClientForMigration {
  private static instance: Client;

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Client({
      password: process.env.PGPASSWORD,
      user: process.env.PGUSER,
    });
    this.instance.connect((err) =>
      err ? console.error(err) : console.info('Connected w PG established'),
    );
    return this.instance;
  }

  static closeConnection() {
    this.instance.end((err) => {
      err ? console.error(err) : console.info('Connection w PG closed');
    });
  }
}
