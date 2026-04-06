import type { Comment } from "../../domain/comment.js"

/**
 * Output Port — defines what the infrastructure layer must provide
 * for comment data operations.
 */
export interface ICommentRepository {
  /** Persist a new comment and return it */
  addNewComment(comment: Comment): Comment

  /** Return all comments for a given post */
  getCommentsByPostId(postId: string): Comment[]
}
