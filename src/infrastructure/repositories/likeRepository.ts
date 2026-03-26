import type { Like } from "../../domain/like.js"
import { likes } from "../database.js"

export const addLike = (like: Like): Like => {
  likes.push(like)
  return like
}

export const hasUserLikedPost = (postId: string, userId: string): boolean => {
  return likes.some((like) => like.postId === postId && like.userId === userId)
}

export const getLikesByPostId = (postId: string): Like[] => {
  return likes.filter((like) => like.postId === postId)
}