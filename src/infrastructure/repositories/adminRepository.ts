import { users, posts, comments, likes } from "../database.js"

/** Return aggregate counts across the whole site */
export const getSiteStats = () => ({
  totalUsers: users.length,
  totalPosts: posts.length,
  totalComments: comments.length,
  totalLikes: likes.length
})

/** Return per-user activity: post, comment, and like counts for each user */
export const getUserAnalytics = () =>
  users.map((user) => ({
    id: user.id,
    username: user.username,
    role: user.role,
    postCount: posts.filter((p) => p.authorId === user.id).length,
    commentCount: comments.filter((c) => c.authorId === user.id).length,
    likeCount: likes.filter((l) => l.userId === user.id).length
  }))
