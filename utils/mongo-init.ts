import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedDb: mongoose.Connection | null = null;

export const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(MONGODB_URI, {
    autoIndex: true,
  });

  cachedDb = db.connections[0];
  return cachedDb;
};
