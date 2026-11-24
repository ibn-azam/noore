import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.AUTH_DB_URI);
const db = client.db(process.env.USER_DB);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  user:{
    additionalFields:{
      role:{
        defaultValue:"user"
      }
    }
  },
});
