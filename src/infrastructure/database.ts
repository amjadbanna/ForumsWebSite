import type { User } from "../domain/user.js"
import type { Post } from "../domain/post.js"
import type { Comment } from "../domain/comment.js"
import type { Like } from "../domain/like.js"

// In-memory data store — replaced by a real database in production
export const users: User[] = []
export const posts: Post[] = []
export const comments: Comment[] = []
export const likes: Like[] = []
