import mongoose from "mongoose"
import { config } from "../config/config.js"

/**
 * Opens the Mongoose connection to MongoDB Atlas.
 * Call this once at startup (in index.ts) before the server begins listening.
 */
export const connectDatabase = async (): Promise<void> => {
  if (!config.mongoUri) {
    throw new Error("MONGODB_URI is not set in environment variables")
  }

  await mongoose.connect(config.mongoUri)
  console.log("Connected to MongoDB")
}
