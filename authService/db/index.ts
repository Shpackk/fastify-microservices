import mongoose from 'mongoose';
mongoose.set('strictQuery', false); //deprecation is soon

const mongoUrl = process.env.MONGO_URI;

mongoose
  .connect(mongoUrl!)
  .then(() => console.info('MongoDB is connected'))
  .catch((error) => console.error(error));

export { mongoose };
