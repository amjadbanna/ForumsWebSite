export const config = {
  port: parseInt(process.env["PORT"] ?? "3000", 10),
  mongoUri: process.env["MONGODB_URI"] ?? "",
  jwtSecret: process.env["JWT_SECRET"] ?? "fallback-secret"
}
