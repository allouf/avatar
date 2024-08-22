import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cachedDb: mongoose.Connection | null = null;

export default async function connectToDatabase() {
  if (cachedDb) {
    console.log("Using cached database connection");
    return cachedDb;
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    console.log(`Connecting to MongoDB at ${MONGODB_URI}`);
    const db = await mongoose.connect(MONGODB_URI, {
      autoIndex: true,
    });

    console.log("Connected to MongoDB successfully");
    cachedDb = db.connections[0];
    return cachedDb;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}