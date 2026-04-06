import type { Comment } from "../../domain/comment.js"

/**
 * Input Port — defines the comment operations that the
 * application exposes to the outside world.
 */
export interface ICommentUseCases {
  /**
   * Add a comment to a post.
   * Returns the persisted Comment object.
   */
  addComment(postId: string, userId: string, content: string): Comment

  /** Return all comments for a given post */
  getCommentsByPost(postId: string): Comment[]
}
