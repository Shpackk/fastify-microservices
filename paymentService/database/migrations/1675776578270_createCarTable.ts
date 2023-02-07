const object = {
  up: 'CREATE TABLE IF NOT EXISTS CarTable (userId SERIAL PRIMARY KEY, cardNumber varchar NOT NULL UNIQUE, cardBalance int);',
  down: 'DROP TABLE IF EXISTS CarTable;',
};

export default object;
