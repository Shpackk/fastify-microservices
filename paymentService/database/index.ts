import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  password: process.env.PGPASSWORD,
  user: process.env.PGUSER,
});

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

client.query(
  `INSERT INTO CardInfo (userId, cardNumber, cardBalance) VALUES (1,54494393994, 400)`,
  (err, res) => {
    if (err) console.error(err);
    else console.info(res);
  },
);

client.query(`SELECT * from CardInfo`, (err, res) => {
  if (err) console.error(err);
  else console.info(res.rows);
});
