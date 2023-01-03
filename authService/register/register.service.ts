import { User } from '../db/models/User';
import { RegisterDto } from './types';

export const saveUser = async (RegisterDto: RegisterDto) => {
  return await User.create(RegisterDto);
};
