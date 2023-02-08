export default {
  up: 'CREATE TABLE IF NOT EXISTS AnotherCool (userId int, cardNumber varchar NOT NULL UNIQUE, cardBalance int);',
  down: 'DROP TABLE IF EXISTS AnotherCool;',
};
