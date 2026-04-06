import type { Post } from "../../domain/post.js"

/**
 * Output Port — defines what the infrastructure layer must provide
 * for post data operations.
 */
export interface IPostRepository {
  /** Persist a new post and return it */
  addPost(post: Post): Post

  /** Return every stored post */
  getAllPosts(): Post[]

  /** Remove a post by its id (no-op if not found) */
  removePostById(id: string): void

  /** Find a single post by id, or undefined if not found */
  findPostById(id: string): Post | undefined

  /** Increment the like counter of a post by 1 */
  increasePostLikeCount(id: string): void
}
