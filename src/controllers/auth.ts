import { type Request, type Response } from "express"

let users: any[] = []

export const register = (req: Request, res: Response) => {
  const user = {
    id: Date.now().toString(),
    username: req.body.username,
    password: req.body.password,
    role: "user"
  }

  users.push(user)
  res.json(user)
}

export const login = (req: Request, res: Response) => {
  const user = users.find(
    u => u.username === req.body.username && u.password === req.body.password
  )

  if (!user) return res.status(401).json({ message: "Invalid login" })

  res.json(user)
}