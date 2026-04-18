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
    role:     { type: String, enum: ["user", "admin", "superuser"], default: "user" },

    // Soft delete — instead of removing the document, we change this field.
    // active  = normal account
    // blocked = suspended, can't log in
    // deleted = soft-deleted, can't log in, treated as gone
    status:   { type: String, enum: ["active", "blocked", "deleted"], default: "active" }
  },
  { versionKey: false } // removes __v field
)

export const UserModel = mongoose.model("User", userSchema)
