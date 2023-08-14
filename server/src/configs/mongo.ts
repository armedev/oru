import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const connectionString = process.env.MONGO_URL;

const client = new MongoClient(connectionString!);

export const connect = async () => {
  let conn;
  try {
    conn = await client.connect();
  } catch (err: any) {
    console.error(err);
    throw new Error("Error initializing db ");
  }

  let db = conn.db("oru");
  return db;
};
