import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

try {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    if (!client) client = new MongoClient(uri, options);
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);

    clientPromise = client.connect();
  }
} catch (e) {}

export const connectToDatabase = async () => {
  try {
    await clientPromise;
    await client;
    return client.db("test");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    throw error;
  }
};

export default clientPromise;
