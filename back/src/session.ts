import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";

declare module "express-session" {
  interface SessionData {
    authorised?: boolean;
    email?: string;
  }
}

const MongoDBStore = connectMongoDBSession(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI as string,
  collection: "sessions",
});

store.on("error", (error: string) => {
  console.log(error);
});

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  store: store,
  cookie: {
    maxAge: 10 * 1000,
  },
});
