import type { Post } from "../../domain/post.js"
import { posts } from "../database.js"

/** Persist a new post and return it */
export const addPost = (post: Post): Post => {
  posts.push(post)
  return post
}

/** Return all posts */
export const getAllPosts = (): Post[] => posts

/** Remove a post by id (no-op if not found) */
export const removePostById = (id: string): void => {
  const index = posts.findIndex((p) => p.id === id)
  if (index !== -1) posts.splice(index, 1)
}

/** Find a single post by id, or undefined if not found */
export const findPostById = (id: string): Post | undefined =>
  posts.find((p) => p.id === id)

/** Update a post's title and content; returns undefined if not found */
export const updatePost = (id: string, title: string, content: string): Post | undefined => {
  const post = posts.find((p) => p.id === id)
  if (!post) return undefined
  post.title = title
  post.content = content
  return post
}

/** Increment the like counter of a post by 1 */
export const increasePostLikeCount = (id: string): void => {
  const post = posts.find((p) => p.id === id)
  if (post) post.likes += 1
}
