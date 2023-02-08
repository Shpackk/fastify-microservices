export default {
  up: 'CREATE TABLE IF NOT EXISTS CardInfo (userId int, cardNumber varchar NOT NULL UNIQUE, cardBalance int);',
  down: 'DROP TABLE IF EXISTS CardInfo;',
};
