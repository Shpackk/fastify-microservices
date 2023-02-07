import { Client } from 'pg';
import { readFileSync } from 'fs';

const client = new Client({
  password: 'test',
  user: 'test',
});

client.connect((err) => {
  if (err) console.error('Error while connecting to PostgresQL', err.stack);
  else console.info('Connected');
});

// const createTableCardInfo = readFileSync(
//   `${__dirname}/sql/create_CardInfoTable.sql`,
//   'utf-8',
// );

// client.query(createTableCardInfo, (err, res) => {
//   if (err) console.error(err);
//   else console.info('table CardInfo is created');
// });

// client.query(
//   `INSERT INTO CardInfo (cardNumber, cardBalance) VALUES ('444332244555', 100) `,
//   (err, res) => {
//     if (err) console.error(err);
//     else console.info(res);
//   },
// );

// client.query(`SELECT * from CardInfo WHERE userId = 1`, (err, res) => {
//   if (err) console.error(err);
//   else console.info(res.rows);
// });
