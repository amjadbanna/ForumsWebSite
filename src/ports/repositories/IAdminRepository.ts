/** Site-wide aggregate statistics */
export interface SiteStats {
  totalUsers: number
  totalPosts: number
  totalComments: number
  totalLikes: number
}

/** Per-user activity summary */
export interface UserAnalytic {
  id: string
  username: string
  role: string
  postCount: number
  commentCount: number
  likeCount: number
}

/** Output Port — contract the infrastructure layer must fulfil for admin/analytics operations */
export interface IAdminRepository {
  /** Return aggregate counts across the whole site */
  getSiteStats(): SiteStats

  /** Return an activity summary for every user */
  getUserAnalytics(): UserAnalytic[]
}
