import type { Request, Response } from "express"
import {
  addNewComment,
  getCommentsByPostId,
  updateComment,
  removeCommentById
} from "../infrastructure/repositories/commentRepository.js"
import type { Comment } from "../domain/comment.js"

/** POST /posts/:postId/comments — add a comment to a post */
export const addComment = async (req: Request, res: Response): Promise<void> => {
  const comment: Comment = {
    id: Date.now().toString(),
    postId: req.params.postId as string,
    authorId: req.user!.id,
    content: (req.body as { content: string }).content,
    createdAt: new Date().toISOString()
  }

  res.status(201).json(await addNewComment(comment))
}

/** GET /posts/:postId/comments — return all comments for a post */
export const getCommentsByPost = async (req: Request, res: Response): Promise<void> => {
  res.json(await getCommentsByPostId(req.params.postId as string))
}

/** PUT /posts/:postId/comments/:commentId — edit a comment */
export const editComment = async (req: Request, res: Response): Promise<void> => {
  const comments = await getCommentsByPostId(req.params.postId as string)
  const comment = comments.find((c) => c.id === req.params.commentId)

  if (!comment) {
    res.status(404).json({ message: "Comment not found" })
    return
  }

  const user = req.user!
  if (comment.authorId !== user.id && user.role !== "superuser" && user.role !== "admin") {
    res.status(403).json({ message: "You do not have permission to edit this comment" })
    return
  }

  const updated = await updateComment(comment.id, (req.body as { content: string }).content)
  res.json(updated)
}

/** DELETE /posts/:postId/comments/:commentId — delete a comment */
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const comments = await getCommentsByPostId(req.params.postId as string)
  const comment = comments.find((c) => c.id === req.params.commentId)

  if (!comment) {
    res.status(404).json({ message: "Comment not found" })
    return
  }

  const user = req.user!
  if (comment.authorId !== user.id && user.role !== "superuser" && user.role !== "admin") {
    res.status(403).json({ message: "You do not have permission to delete this comment" })
    return
  }

  await removeCommentById(comment.id)
  res.json({ message: "Comment deleted" })
}
