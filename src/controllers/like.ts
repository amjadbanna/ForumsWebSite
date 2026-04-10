import type { Request, Response } from "express"
import { addLike, hasUserLikedPost } from "../infrastructure/repositories/likeRepository.js"
import { increasePostLikeCount } from "../infrastructure/repositories/postRepository.js"
import type { Like } from "../domain/like.js"

/** POST /posts/:postId/like — like a post (each user can only like once) */
export const likePost = (req: Request, res: Response): void => {
  const postId = req.params.postId as string
  const userId = req.user!.id // Set by authenticate()

  // Prevent the same user from liking the same post twice
  if (hasUserLikedPost(postId, userId)) {
    res.status(400).json({ message: "You have already liked this post" })
    return
  }

  const like: Like = { postId, userId }
  addLike(like)
  increasePostLikeCount(postId)

  res.json({ message: "Post liked" })
}
