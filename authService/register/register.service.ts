import { RegisterDto } from './types';
import * as registerRepository from './register.repository';
import { HttpError } from '../errors/HttpError';

const registrationHandler = async (registrationUser: RegisterDto) => {
  const savedUser = await registerRepository.saveUser(registrationUser);

  if (!savedUser) throw new HttpError(500, 'Something went wrong');

  return savedUser;
};

export { registrationHandler };
