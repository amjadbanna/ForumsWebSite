import type { Post } from "../../domain/post.js"

/** Input Port — forum/post operations exposed to the outside world */
export interface IForumUseCases {
  /** Create a new post authored by userId; likes initialised to 0 */
  createPost(title: string, content: string, userId: string): Post

  /** Return all posts in the system */
  getPosts(): Post[]

  /** Delete a post by id */
  deletePost(id: string): void

  /** Update a post's title and content; returns undefined if not found */
  updatePost(id: string, title: string, content: string): Post | undefined
}
