import mongoose from "mongoose";

/**
 * Mongoose schema for a Comment.
 */
const commentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    postId: { type: String, required: true },
    authorId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  { versionKey: false },
);

export const CommentModel = mongoose.model("Comment", commentSchema);
