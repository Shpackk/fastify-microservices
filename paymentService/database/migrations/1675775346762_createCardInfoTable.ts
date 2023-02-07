const object = {
  up: 'CREATE TABLE IF NOT EXISTS CardInfo (userId SERIAL PRIMARY KEY, cardNumber varchar NOT NULL UNIQUE, cardBalance int);',
  down: 'DROP TABLE IF EXISTS CardInfo;',
};

export default object;
