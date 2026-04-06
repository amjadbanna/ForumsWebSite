import type { Request, Response } from "express"
import { addNewComment } from "../infrastructure/repositories/commentRepository.js"
import type { Comment } from "../domain/comment.js"

export const addComment = (req: Request, res: Response) => {
  const comment: Comment = {
    id: Date.now().toString(),
    postId: req.params.postId as string,
    authorId: req.body.userId,
    content: req.body.content
  }

  const newComment = addNewComment(comment)

  res.json(newComment)
}