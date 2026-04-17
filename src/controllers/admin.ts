import type { Request, Response } from "express"
import { getSiteStats, getUserAnalytics } from "../infrastructure/repositories/adminRepository.js"
import { removePostById, findPostById } from "../infrastructure/repositories/postRepository.js"
import { removeCommentById } from "../infrastructure/repositories/commentRepository.js"

/** GET /admin/stats — site-wide statistics (admin and superuser only) */
export const getStats = async (_req: Request, res: Response): Promise<void> => {
  res.json(await getSiteStats())
}

/** GET /admin/users — per-user analytics (admin and superuser only) */
export const getUserStats = async (_req: Request, res: Response): Promise<void> => {
  res.json(await getUserAnalytics())
}

/** DELETE /admin/posts/:id — admin can delete any post regardless of who wrote it */
export const adminDeletePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  const post = await findPostById(id)
  if (!post) {
    res.status(404).json({ message: "Post not found" })
    return
  }

  await removePostById(id)
  res.json({ message: "Post deleted by admin" })
}

/** DELETE /admin/comments/:id — admin can delete any comment regardless of who wrote it */
export const adminDeleteComment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  await removeCommentById(id)
  res.json({ message: "Comment deleted by admin" })
}
