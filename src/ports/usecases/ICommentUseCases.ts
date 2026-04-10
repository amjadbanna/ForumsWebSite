import type { Comment } from "../../domain/comment.js"

/** Input Port — comment operations exposed to the outside world */
export interface ICommentUseCases {
  /** Add a comment to a post and return it */
  addComment(postId: string, userId: string, content: string): Comment

  /** Return all comments for a given post */
  getCommentsByPost(postId: string): Comment[]

  /** Update a comment's content; returns undefined if not found */
  updateComment(id: string, content: string): Comment | undefined

  /** Delete a comment by id */
  deleteComment(id: string): void
}
