/**
 * Result returned after a like attempt.
 */
export interface LikeResult {
  success: boolean
  message: string
}

/**
 * Input Port — defines the like operations that the
 * application exposes to the outside world.
 */
export interface ILikeUseCases {
  /**
   * Like a post on behalf of a user.
   * Returns a LikeResult indicating success or a reason for failure
   * (e.g. the user already liked the post).
   */
  likePost(postId: string, userId: string): LikeResult
}
