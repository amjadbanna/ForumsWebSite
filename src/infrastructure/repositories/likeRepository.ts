import type { Like } from "../../domain/like.js"
import { LikeModel } from "../models/LikeModel.js"

/** Persist a new like and return it */
export const addLike = async (like: Like): Promise<Like> => {
  await LikeModel.create(like)
  return like
}

/** Return true if the user has already liked the post */
export const hasUserLikedPost = async (
  postId: string,
  userId: string
): Promise<boolean> => {
  const doc = await LikeModel.exists({ postId, userId })
  return doc !== null
}

/** Return all likes for a given post */
export const getLikesByPostId = async (postId: string): Promise<Like[]> => {
  const docs = await LikeModel.find({ postId }).select("-_id").lean()
  return docs as unknown as Like[]
}
