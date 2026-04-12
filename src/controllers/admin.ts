import type { Request, Response } from "express"
import { getSiteStats, getUserAnalytics } from "../infrastructure/repositories/adminRepository.js"

/** GET /admin/stats — site-wide statistics (admin and superuser only) */
export const getStats = async (_req: Request, res: Response): Promise<void> => {
  res.json(await getSiteStats())
}

/** GET /admin/users — per-user analytics (admin and superuser only) */
export const getUserStats = async (_req: Request, res: Response): Promise<void> => {
  res.json(await getUserAnalytics())
}
