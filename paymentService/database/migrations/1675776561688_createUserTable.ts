const object = {
  up: 'CREATE TABLE IF NOT EXISTS UserTable (userId SERIAL PRIMARY KEY, cardNumber varchar NOT NULL UNIQUE, cardBalance int);',
  down: 'DROP TABLE IF EXISTS UserTable;',
};

export default object;
