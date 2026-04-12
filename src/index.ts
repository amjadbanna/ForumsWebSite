import "dotenv/config" // Load .env variables FIRST before anything else reads them
import express from "express"
import cors from "cors"
import { config } from "./config/config.js"
import { connectDatabase } from "./infrastructure/database.js"

// Route files — each file groups related endpoints together
import authRoutes from "./ports/rest/routes/auth.routes.js"
import postsRoutes from "./ports/rest/routes/posts.routes.js"
import adminRoutes from "./ports/rest/routes/admin.routes.js"

const app = express()

// Allow requests from other origins (needed for frontend apps)
app.use(cors())

// Parse incoming JSON request bodies
app.use(express.json())

// Health check — just confirms the server is alive
app.get("/", (_req, res) => {
  res.send("Forum API is running")
})

// Mount route groups
app.use("/auth", authRoutes)   // /auth/register, /auth/login
app.use("/posts", postsRoutes) // /posts, /posts/:id, /posts/:postId/comments, /posts/:postId/like
app.use("/admin", adminRoutes) // /admin/stats, /admin/users

// Connect to MongoDB first, then start the server
connectDatabase()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running at http://localhost:${config.port}`)
    })
  })
  .catch((err: unknown) => {
    console.error("Failed to connect to MongoDB:", err)
    process.exit(1) // Crash hard so the problem is obvious
  })
