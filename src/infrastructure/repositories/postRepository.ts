import type { Post } from "../../domain/post.js"
import { posts } from "../database.js"

export const addPost = (post: Post): Post => {
  posts.push(post)
  return post
}

export const getAllPosts = (): Post[] => {
  return posts
}

export const removePostById = (id: string): void => {
  const index = posts.findIndex((post) => post.id === id)

  if (index !== -1) {
    posts.splice(index, 1)
  }
}

export const findPostById = (id: string): Post | undefined => {
  return posts.find((post) => post.id === id)
}

export const increasePostLikeCount = (id: string): void => {
  const post = posts.find((item) => item.id === id)

  if (post) {
    post.likes = post.likes + 1
  }
}