import { users, posts, comments, likes } from "../database.js"

export const getSiteStats = () => {
  return {
    totalUsers: users.length,
    totalPosts: posts.length,
    totalComments: comments.length,
    totalLikes: likes.length
  }
}