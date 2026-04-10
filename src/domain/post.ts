export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  likes: number
  createdAt: string // ISO timestamp
}
