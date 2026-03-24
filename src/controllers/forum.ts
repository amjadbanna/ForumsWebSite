import { type Request, type Response } from "express";


let posts: any[] = []

export const createPost = (req: Request, res: Response) => {
  const post = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.userId,
    likes: 0
  }

  posts.push(post)
  res.json(post)
}

export const getPosts = (req: Request, res: Response) => {
  res.json(posts)
}

export const deletePost = (req: Request, res: Response) => {
  posts = posts.filter(p => p.id !== req.params.id)
  res.json({ message: "Post deleted" })
}