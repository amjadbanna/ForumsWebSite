import type { Like } from "../../domain/like.js"

/**
 * Output Port — defines what the infrastructure layer must provide
 * for like data operations.
 */
export interface ILikeRepository {
  /** Persist a new like and return it */
  addLike(like: Like): Like

  /** Return true if the user has already liked the post */
  hasUserLikedPost(postId: string, userId: string): boolean

  /** Return all likes for a given post */
  getLikesByPostId(postId: string): Like[]
}
