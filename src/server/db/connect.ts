import "server-only";
import mongoose from "mongoose";

export async function connect() {
  await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: process.env.DB_NAME!,
  });
}
