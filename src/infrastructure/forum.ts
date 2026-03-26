import type { Request, Response } from "express"
import { addPost, getAllPosts, removePostById } from "../infrastructure/repositories/postRepository.js"
import type { Post } from "../domain/post.js"

export const createPost = (req: Request, res: Response) => {
  const post: Post = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content,
    authorId: req.body.userId,
    likes: 0
  }

  const newPost = addPost(post)

  res.json(newPost)
}

export const getPosts = (req: Request, res: Response) => {
  const posts = getAllPosts()
  res.json(posts)
}

export const deletePost = (req: Request, res: Response) => {
  removePostById(req.params.id as string)
  res.json({ message: "Post deleted" })
}