import type { Request, Response } from "express"
import { addLike, hasUserLikedPost } from "../infrastructure/repositories/likeRepository.js"
import { increasePostLikeCount } from "../infrastructure/repositories/postRepository.js"
import type { Like } from "../domain/like.js"

export const likePost = (req: Request, res: Response) => {
  const postId = req.params.postId as string
  const userId = req.body.userId

  const alreadyLiked = hasUserLikedPost(postId, userId)

  if (alreadyLiked) {
    return res.status(400).json({ message: "Post already liked" })
  }

  const like: Like = {
    postId,
    userId
  }

  addLike(like)
  increasePostLikeCount(postId)

  res.json({ message: "Post liked" })
}