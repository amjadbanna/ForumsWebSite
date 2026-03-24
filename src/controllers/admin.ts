import { type Request, type Response } from "express"

export const getStats = (req: Request, res: Response) => {
  res.json({
    message: "Admin analytics placeholder"
  })
}