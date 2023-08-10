import mongoose from "mongoose";

let isConnected = false;

export const connectoToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongo is connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_NAME,
    });
    isConnected = true;
    console.log("Mongo db connected!");
  } catch (error) {
    console.log(error);
  }
};
