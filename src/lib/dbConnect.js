import { MongoClient, ServerApiVersion } from "mongodb";

export default function dbConnect(collectionName) {
  const uri = process.env.NEXTAUTH_MONGODB_URI;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.db(process.env.NEXTAUTH_DB_NAME).collection(collectionName);
}