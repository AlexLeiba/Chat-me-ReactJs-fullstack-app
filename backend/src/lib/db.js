import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      '\n\n Connected to MongoDB host =>>',
      connectDB.connection.host
    );
  } catch (err) {
    console.log('\n\n Mongodb connection error =>>', err);
  }
};
