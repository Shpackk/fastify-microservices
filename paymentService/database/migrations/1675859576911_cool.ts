export default {
  up: 'CREATE TABLE IF NOT EXISTS Cool (userId int, cardNumber varchar NOT NULL UNIQUE, cardBalance int);',
  down: 'DROP TABLE IF EXISTS Cool;',
};
