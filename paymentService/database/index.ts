import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client();

client.connect((err) => {
  if (err) console.error('Error while connecting to PostgresQL', err.stack);
  else console.info('Connected');
});

// client.query(
//   `INSERT INTO CardInfo (cardNumber, cardBalance) VALUES ('444332244555', 100) `,
//   (err, res) => {
//     if (err) console.error(err);
//     else console.info(res);
//   },
// );

client.query('BEGIN;');
client.query('SET track_io_timing = TRUE;');

const query = `EXPLAIN (ANALYZE,BUFFERS) INSERT INTO CardInfo (userId, cardNumber, cardBalance) VALUES ($1, $2, $3);`;
const values = [3, Math.round(Math.random() * 100), 400];

client.query(query, values, (err, res) => {
  if (err) console.error(err);
  else console.info(res);

  client.query('ROLLBACK;', () => {
    client.query(`SELECT * from CardInfo`, (err, res) => {
      if (err) console.error(err);
      else console.info(res.rows);
      client.end();
    });
  });
});
