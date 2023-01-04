import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export const hash = (password: string) => hashSync(password, genSaltSync());

export const compare = (password: string, hashedPassword: string) =>
  compareSync(password, hashedPassword);
