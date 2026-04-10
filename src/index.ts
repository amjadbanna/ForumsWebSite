import express from "express"
import cors from "cors"
import { config } from "./config/config.js"

// Controllers
import { register, login } from "./controllers/auth.js"
import { createPost, getPosts, deletePost, editPost } from "./controllers/forum.js"
import { addComment, getCommentsByPost, editComment, deleteComment } from "./controllers/comment.js"
import { likePost } from "./controllers/like.js"
import { getStats, getUserStats } from "./controllers/admin.js"

// Middleware
import { authenticate } from "./middleware/authenticate.js"
import { requireRole } from "./middleware/requireRole.js"

const app = express()
app.use(cors())           // Allow cross-origin requests
app.use(express.json())   // Parse JSON request bodies

// ── Health check ──────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.send("Forum API is running")
})

// ── Auth routes (no login required) ──────────────────────────
// POST /auth/register   { username, password }
app.post("/auth/register", register)

// POST /auth/login      { username, password }  → { token, user }
app.post("/auth/login", login)

// ── Post routes ───────────────────────────────────────────────
// GET  /posts — public
app.get("/posts", getPosts)

// POST /posts           { title, content }
app.post("/posts", authenticate, createPost)

// PUT  /posts/:id       { title, content } — owner, superuser, or admin
app.put("/posts/:id", authenticate, editPost)

// DELETE /posts/:id — owner, superuser, or admin
app.delete("/posts/:id", authenticate, deletePost)

// ── Comment routes ────────────────────────────────────────────
// GET  /posts/:postId/comments — public
app.get("/posts/:postId/comments", getCommentsByPost)

// POST /posts/:postId/comments   { content }
app.post("/posts/:postId/comments", authenticate, addComment)

// PUT  /posts/:postId/comments/:commentId   { content }
app.put("/posts/:postId/comments/:commentId", authenticate, editComment)

// DELETE /posts/:postId/comments/:commentId
app.delete("/posts/:postId/comments/:commentId", authenticate, deleteComment)

// ── Like routes ───────────────────────────────────────────────
// POST /posts/:postId/like
app.post("/posts/:postId/like", authenticate, likePost)

// ── Admin routes (admin and superuser only) ───────────────────
// GET  /admin/stats — site-wide aggregate statistics
app.get("/admin/stats", authenticate, requireRole("admin", "superuser"), getStats)

// GET  /admin/users — per-user analytics
app.get("/admin/users", authenticate, requireRole("admin", "superuser"), getUserStats)

// ── Start server ──────────────────────────────────────────────
app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`)
})
