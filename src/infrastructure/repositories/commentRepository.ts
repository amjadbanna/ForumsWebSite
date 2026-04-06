import type { Comment } from "../../domain/comment.js"
import { comments } from "../database.js"

export const addNewComment = (comment: Comment): Comment => {
  comments.push(comment)
  return comment
}

export const getCommentsByPostId = (postId: string): Comment[] => {
  return comments.filter((comment) => comment.postId === postId)
}