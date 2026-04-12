import type { Request, Response } from "express"
import { addUser, findUserByUsernameAndPassword, findUserByUsername } from "../infrastructure/repositories/userRepository.js"
import { createToken } from "../middleware/jwt.js"
import type { User } from "../domain/user.js"

/** POST /auth/register — create a new user account */
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body as { username: string; password: string }

  if (await findUserByUsername(username)) {
    res.status(409).json({ message: "Username is already taken" })
    return
  }

  const user: User = {
    id: Date.now().toString(),
    username,
    password,
    role: "user"
  }

  const newUser = await addUser(user)
  const token = createToken({ id: newUser.id, username: newUser.username, role: newUser.role })

  res.status(201).json({ token, user: { id: newUser.id, username: newUser.username, role: newUser.role } })
}

/** POST /auth/login — validate credentials and return a JWT */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body as { username: string; password: string }
  const user = await findUserByUsernameAndPassword(username, password)

  if (!user) {
    res.status(401).json({ message: "Invalid username or password" })
    return
  }

  const token = createToken({ id: user.id, username: user.username, role: user.role })
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } })
}
