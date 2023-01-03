import { mongoose } from '../index';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    accountType: {
      type: String,
      enum: ['default', 'business'],
    },
  },
  { timestamps: true },
);

const User = mongoose.model('user', UserSchema);

export { User };
