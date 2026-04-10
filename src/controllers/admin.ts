import type { Request, Response } from "express"
import { getSiteStats, getUserAnalytics } from "../infrastructure/repositories/adminRepository.js"

/** GET /admin/stats — site-wide statistics (admin and superuser only) */
export const getStats = (_req: Request, res: Response): void => {
  res.json(getSiteStats())
}

/** GET /admin/users — per-user analytics (admin and superuser only) */
export const getUserStats = (_req: Request, res: Response): void => {
  res.json(getUserAnalytics())
}
