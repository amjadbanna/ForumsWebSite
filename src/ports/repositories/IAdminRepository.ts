/**
 * Shape of the aggregate stats returned by the admin repository.
 */
export interface SiteStats {
  totalUsers: number
  totalPosts: number
  totalComments: number
  totalLikes: number
}

/**
 * Output Port — defines what the infrastructure layer must provide
 * for admin/analytics operations.
 */
export interface IAdminRepository {
  /** Return aggregate counts across the whole site */
  getSiteStats(): SiteStats
}
