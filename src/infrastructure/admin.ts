import type { Request, Response } from "express"
import { getSiteStats } from "../infrastructure/repositories/adminRepository.js"

export const getStats = (req: Request, res: Response) => {
  const stats = getSiteStats()
  res.json(stats)
}