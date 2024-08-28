import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'; // default value if env var is not set
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

const client = new MongoClient(MONGODB_URI);

const db = client.db();

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export async function disconnectFromDatabase() {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}