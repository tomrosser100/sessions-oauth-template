import { MongoClient, ServerApiVersion } from "mongodb";

const dbClient = new MongoClient(process.env.MONGO_URI as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = async () => {
  await dbClient.connect();
  await dbClient.db("admin").command({ ping: 1 });
  console.log("connected to mongodb");
};

dbConnect()

export default dbClient;
