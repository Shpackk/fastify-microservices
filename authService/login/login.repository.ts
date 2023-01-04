import { User } from '../db/models/User';

const findUser = async (phoneNumber: string) =>
  await User.findOne({ phoneNumber });

export { findUser };
