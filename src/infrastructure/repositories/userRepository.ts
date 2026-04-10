import type { User } from "../../domain/user.js"
import { users } from "../database.js"

/** Persist a new user and return it */
export const addUser = (user: User): User => {
  users.push(user)
  return user
}

/** Find a user by username and password */
export const findUserByUsernameAndPassword = (
  username: string,
  password: string
): User | undefined =>
  users.find((u) => u.username === username && u.password === password)

/** Find a user by username (used for duplicate check during registration) */
export const findUserByUsername = (username: string): User | undefined =>
  users.find((u) => u.username === username)

/** Return all users */
export const getAllUsers = (): User[] => users
