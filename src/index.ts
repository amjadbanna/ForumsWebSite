import express from "express"
import { config } from "./config/config.js"

// --- Auth use cases (register / login) ---
import { register, login } from "./infrastructure/auth.js"

// --- Forum/Post use cases ---
import { createPost, getPosts, deletePost } from "./infrastructure/forum.js"

// --- Comment use cases ---
import { addComment, getCommentsByPost } from "./infrastructure/comment.js"

// --- Like use cases ---
import { likePost } from "./infrastructure/like.js"

// --- Admin use cases ---
import { getStats } from "./infrastructure/admin.js"

const app = express()
app.use(express.json())

// ── Health check ──────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.send("Forum API Running")
})

// ── Auth routes ───────────────────────────────────────────────
// POST /auth/register   { username, password }
app.post("/auth/register", register)

// POST /auth/login      { username, password }
app.post("/auth/login", login)

// ── Post routes ───────────────────────────────────────────────
// GET  /posts
app.get("/posts", getPosts)

// POST /posts           { title, content, userId }
app.post("/posts", createPost)

// DELETE /posts/:id
app.delete("/posts/:id", deletePost)

// ── Comment routes ────────────────────────────────────────────
// GET  /posts/:postId/comments
app.get("/posts/:postId/comments", getCommentsByPost)

// POST /posts/:postId/comments   { userId, content }
app.post("/posts/:postId/comments", addComment)

// ── Like routes ───────────────────────────────────────────────
// POST /posts/:postId/like       { userId }
app.post("/posts/:postId/like", likePost)

// ── Admin routes ──────────────────────────────────────────────
// GET  /admin/stats
app.get("/admin/stats", getStats)

// ── Start server ──────────────────────────────────────────────
app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`)
})
