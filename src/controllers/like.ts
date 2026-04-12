import type { Request, Response } from "express"
import { addLike, hasUserLikedPost } from "../infrastructure/repositories/likeRepository.js"
import { increasePostLikeCount } from "../infrastructure/repositories/postRepository.js"
import type { Like } from "../domain/like.js"

/** POST /posts/:postId/like — like a post (each user can only like once) */
export const likePost = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.postId as string
  const userId = req.user!.id

  if (await hasUserLikedPost(postId, userId)) {
    res.status(400).json({ message: "You have already liked this post" })
    return
  }

  const like: Like = { postId, userId }
  await addLike(like)
  await increasePostLikeCount(postId)

  res.json({ message: "Post liked" })
}
