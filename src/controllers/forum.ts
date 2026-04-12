import type { Request, Response } from "express"
import {
  addPost,
  getAllPosts,
  removePostById,
  updatePost,
  findPostById
} from "../infrastructure/repositories/postRepository.js"
import type { Post } from "../domain/post.js"

/** POST /posts — create a new forum post */
export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, content } = req.body as { title: string; content: string }
  const userId = req.user!.id

  const post: Post = {
    id: Date.now().toString(),
    title,
    content,
    authorId: userId,
    likes: 0,
    createdAt: new Date().toISOString()
  }

  res.status(201).json(await addPost(post))
}

/** GET /posts — return all posts */
export const getPosts = async (_req: Request, res: Response): Promise<void> => {
  res.json(await getAllPosts())
}

/** DELETE /posts/:id — delete a post (owner, superuser, or admin only) */
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const post = await findPostById(req.params.id as string)

  if (!post) {
    res.status(404).json({ message: "Post not found" })
    return
  }

  const user = req.user!
  if (post.authorId !== user.id && user.role !== "superuser" && user.role !== "admin") {
    res.status(403).json({ message: "You do not have permission to delete this post" })
    return
  }

  await removePostById(post.id)
  res.json({ message: "Post deleted" })
}

/** PUT /posts/:id — edit a post (owner, superuser, or admin only) */
export const editPost = async (req: Request, res: Response): Promise<void> => {
  const post = await findPostById(req.params.id as string)

  if (!post) {
    res.status(404).json({ message: "Post not found" })
    return
  }

  const user = req.user!
  if (post.authorId !== user.id && user.role !== "superuser" && user.role !== "admin") {
    res.status(403).json({ message: "You do not have permission to edit this post" })
    return
  }

  const { title, content } = req.body as { title: string; content: string }
  const updated = await updatePost(post.id, title, content)
  res.json(updated)
}
