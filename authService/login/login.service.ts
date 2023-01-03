import { User } from '../db/models/User';

export const findUser = async (phoneNumber: string) => {
  return await User.findOne({ phoneNumber });
};
