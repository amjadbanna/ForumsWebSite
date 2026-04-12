import mongoose from "mongoose"

/**
 * Mongoose schema for a User.
 * We store our own `id` (string) so the rest of the codebase
 * never has to deal with Mongo ObjectIds.
 */
const userSchema = new mongoose.Schema(
  {
    id:       { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ["user", "admin", "superuser"], default: "user" }
  },
  { versionKey: false } // removes __v field
)

export const UserModel = mongoose.model("User", userSchema)
