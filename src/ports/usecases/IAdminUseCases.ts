import type { SiteStats } from "../repositories/IAdminRepository.js"

/**
 * Input Port — defines the admin/analytics operations that the
 * application exposes to privileged callers.
 */
export interface IAdminUseCases {
  /** Return aggregate counts for users, posts, comments, and likes */
  getSiteStats(): SiteStats
}
