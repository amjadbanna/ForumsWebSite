import mongoose from "mongoose"

/**
 * Mongoose schema for a Like.
 * The compound unique index prevents a user from liking the same post twice.
 */
const likeSchema = new mongoose.Schema(
  {
    postId: { type: String, required: true },
    userId: { type: String, required: true }
  },
  { versionKey: false }
)

// Prevent duplicate likes at the database level
likeSchema.index({ postId: 1, userId: 1 }, { unique: true })

export const LikeModel = mongoose.model("Like", likeSchema)
