import { type Request, type Response } from "express"

let likes: any[] = []

export const likePost = (req: Request, res: Response) => {
  likes.push({
    postId: req.params.postId,
    userId: req.body.userId
  })

  res.json({ message: "Post liked" })
}