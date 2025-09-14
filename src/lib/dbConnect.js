import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  servicesCollection: "car-doctor",
};

let client;

export default async function dbConnect(collectionName) {
  if (!client) {
    client = new MongoClient(process.env.NEXTAUTH_MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
  }

  return client.db(process.env.NEXTAUTH_DB_NAME).collection(collectionName);
}
