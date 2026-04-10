/** Result returned after a like attempt */
export interface LikeResult {
  success: boolean
  message: string
}

/** Input Port — like operations exposed to the outside world */
export interface ILikeUseCases {
  /**
   * Like a post on behalf of a user.
   * Returns a LikeResult indicating success or a reason for failure
   * (e.g. the user has already liked the post).
   */
  likePost(postId: string, userId: string): LikeResult
}
