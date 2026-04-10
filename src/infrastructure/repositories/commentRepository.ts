import type { Comment } from "../../domain/comment.js"
import { comments } from "../database.js"

/** Persist a new comment and return it */
export const addNewComment = (comment: Comment): Comment => {
  comments.push(comment)
  return comment
}

/** Return all comments for a given post */
export const getCommentsByPostId = (postId: string): Comment[] =>
  comments.filter((c) => c.postId === postId)

/** Update a comment's content; returns undefined if not found */
export const updateComment = (id: string, content: string): Comment | undefined => {
  const comment = comments.find((c) => c.id === id)
  if (!comment) return undefined
  comment.content = content
  return comment
}

/** Remove a comment by id (no-op if not found) */
export const removeCommentById = (id: string): void => {
  const index = comments.findIndex((c) => c.id === id)
  if (index !== -1) comments.splice(index, 1)
}
