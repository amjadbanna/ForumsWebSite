import { type Request, type Response } from "express"

let comments: any[] = []

export const addComment = (req: Request, res: Response) => {
  const comment = {
    id: Date.now().toString(),
    postId: req.params.postId,
    authorId: req.body.userId,
    content: req.body.content
  }

  comments.push(comment)
  res.json(comment)
}