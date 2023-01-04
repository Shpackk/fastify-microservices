import { User } from '../db/models/User';
import { RegisterDto } from './types';

const saveUser = async (registrationUser: RegisterDto) =>
  await User.create(registrationUser);

export { saveUser };
