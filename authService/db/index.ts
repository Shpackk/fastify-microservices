import mongoose from 'mongoose';
mongoose.set('strictQuery', false); //deprecation is soon

mongoose
  .connect(
    'mongodb+srv://AuthServiceAdmin:AuthServiceAdmin@authservicedb.fjwdfcc.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => console.info('MongoDB is connected'))
  .catch((error) => console.error(error));

export { mongoose };
