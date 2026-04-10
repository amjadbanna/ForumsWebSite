import type { Like } from "../../domain/like.js"
import { likes } from "../database.js"

/** Persist a new like and return it */
export const addLike = (like: Like): Like => {
  likes.push(like)
  return like
}

/** Return true if the user has already liked the post */
export const hasUserLikedPost = (postId: string, userId: string): boolean =>
  likes.some((like) => like.postId === postId && like.userId === userId)

/** Return all likes for a given post */
export const getLikesByPostId = (postId: string): Like[] =>
  likes.filter((like) => like.postId === postId)
