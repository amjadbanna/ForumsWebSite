import { Router } from "express"
import { getStats, getUserStats, adminDeletePost, adminDeleteComment } from "../../../controllers/admin.js"
import { authenticate } from "../../../middleware/authenticate.js"
import { requireRole } from "../../../middleware/requireRole.js"

// All admin routes require a valid token AND an admin or superuser role
const router = Router()

// GET /admin/stats — total counts for users, posts, comments, and likes
router.get("/stats", authenticate, requireRole("admin", "superuser"), getStats)

// GET /admin/users — per-user activity breakdown
router.get("/users", authenticate, requireRole("admin", "superuser"), getUserStats)

// DELETE /admin/posts/:id — admin can delete any post (not just their own)
router.delete("/posts/:id", authenticate, requireRole("admin", "superuser"), adminDeletePost)

// DELETE /admin/comments/:id — admin can delete any comment (not just their own)
router.delete("/comments/:id", authenticate, requireRole("admin", "superuser"), adminDeleteComment)

export default router
