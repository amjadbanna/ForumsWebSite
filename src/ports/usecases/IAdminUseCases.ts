import type { SiteStats, UserAnalytic } from "../repositories/IAdminRepository.js"

/** Input Port — admin/analytics operations exposed to privileged callers */
export interface IAdminUseCases {
  /** Return aggregate counts for users, posts, comments, and likes */
  getSiteStats(): SiteStats

  /** Return per-user activity analytics */
  getUserAnalytics(): UserAnalytic[]
}
