import mongoose from "mongoose"

/**
 * Mongoose schema for a Post.
 */
const postSchema = new mongoose.Schema(
  {
    id:        { type: String, required: true, unique: true },
    title:     { type: String, required: true },
    content:   { type: String, required: true },
    authorId:  { type: String, required: true },
    likes:     { type: Number, default: 0 },
    createdAt: { type: String, required: true }
  },
  { versionKey: false }
)

export const PostModel = mongoose.model("Post", postSchema)
