import type { Request, Response } from "express"
import {
  addNewComment,
  getCommentsByPostId,
  updateComment,
  removeCommentById
} from "../infrastructure/repositories/commentRepository.js"
import type { Comment } from "../domain/comment.js"

/** POST /posts/:postId/comments — add a comment to a post */
export const addComment = (req: Request, res: Response): void => {
  const comment: Comment = {
    id: Date.now().toString(),
    postId: req.params.postId as string,
    authorId: req.user!.id, // Set by authenticate()
    content: (req.body as { content: string }).content,
    createdAt: new Date().toISOString()
  }

  res.status(201).json(addNewComment(comment))
}

/** GET /posts/:postId/comments — return all comments for a post */
export const getCommentsByPost = (req: Request, res: Response): void => {
  res.json(getCommentsByPostId(req.params.postId as string))
}

/** PUT /posts/:postId/comments/:commentId — edit a comment */
export const editComment = (req: Request, res: Response): void => {
  // Find the comment and verify it belongs to the given post
  const comments = getCommentsByPostId(req.params.postId as string)
  const comment = comments.find((c) => c.id === req.params.commentId)

  if (!comment) {
    res.status(404).json({ message: "Comment not found" })
    return
  }

  const user = req.user!
  // Only the author, a superuser, or an admin can edit
  if (comment.authorId !== user.id && user.role !== "superuser" && user.role !== "admin") {
    res.status(403).json({ message: "You do not have permission to edit this comment" })
    return
  }

  const updated = updateComment(comment.id, (req.body as { content: string }).content)
  res.json(updated)
}

/** DELETE /posts/:postId/comments/:commentId — delete a comment */
export const deleteComment = (req: Request, res: Response): void => {
  const comments = getCommentsByPostId(req.params.postId as string)
  const comment = comments.find((c) => c.id === req.params.commentId)

  if (!comment) {
    res.status(404).json({ message: "Comment not found" })
    return
  }

  const user = req.user!
  // Only the author, a superuser, or an admin can delete
  if (comment.authorId !== user.id && user.role !== "superuser" && user.role !== "admin") {
    res.status(403).json({ message: "You do not have permission to delete this comment" })
    return
  }

  removeCommentById(comment.id)
  res.json({ message: "Comment deleted" })
}
