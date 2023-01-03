import bcrypt from 'bcrypt';

export const hash = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export const compare = (password: string, hashedPassword: string) =>
  bcrypt.compareSync(password, hashedPassword);
