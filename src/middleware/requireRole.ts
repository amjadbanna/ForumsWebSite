import type { Request, Response, NextFunction } from "express"
import type { Role } from "../domain/user.js"

/**
 * Allows only users with one of the specified roles.
 * Must be used after the authenticate() middleware.
 *
 * Example: requireRole("admin", "superuser")
 */
export const requireRole = (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role as Role | undefined

    if (!userRole || !roles.includes(userRole)) {
      res.status(403).json({ message: "You do not have permission to perform this action" })
      return
    }

    next()
  }
