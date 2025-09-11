import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("Already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully!🌷");
  } catch (err) {
    console.log("Error connecting to DB", err);
    process.exit(1);
  }
};
