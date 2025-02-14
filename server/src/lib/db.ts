import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MongoDB_URI is not defined in env variables");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed`, error);
    process.exit(1);
  }
};
