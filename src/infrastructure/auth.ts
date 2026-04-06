import type { Request, Response } from "express"
import { addUser, findUserByUsernameAndPassword } from "../infrastructure/repositories/userRepository.js"
import type { User } from "../domain/user.js"

export const register = (req: Request, res: Response) => {
  const user: User = {
    id: Date.now().toString(),
    username: req.body.username,
    password: req.body.password,
    role: "user"
  }

  const newUser = addUser(user)

  res.json(newUser)
}

export const login = (req: Request, res: Response) => {
  const user = findUserByUsernameAndPassword(
    req.body.username,
    req.body.password
  )

  if (!user) {
    return res.status(401).json({ message: "Invalid login" })
  }

  res.json(user)
}