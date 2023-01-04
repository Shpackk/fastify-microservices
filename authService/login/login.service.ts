import { HttpError } from '../errors/HttpError';
import { compare } from '../hashing';
import * as loginRepository from './login.repository';
import { LoginDto } from './types';

const loginHandler = async ({ password, phoneNumber }: LoginDto) => {
  const user = await loginRepository.findUser(phoneNumber);

  if (!user) throw new HttpError(404, 'User not found');

  if (!compare(password, user.password!))
    throw new HttpError(403, 'Incorrect password');

  return user;
};

export { loginHandler };
