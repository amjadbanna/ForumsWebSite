import type { Post } from "../../domain/post.js"

/**
 * Input Port — defines the forum/post operations that the
 * application exposes to the outside world.
 */
export interface IForumUseCases {
  /**
   * Create a new post authored by userId.
   * Returns the persisted Post with likes initialised to 0.
   */
  createPost(title: string, content: string, userId: string): Post

  /** Return all posts in the system */
  getPosts(): Post[]

  /** Delete a post by its id (no-op if not found) */
  deletePost(id: string): void
}
