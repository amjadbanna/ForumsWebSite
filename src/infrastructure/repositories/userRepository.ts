import type { User } from "../../domain/user.js"
import { users } from "../database.js"

export const addUser = (user: User): User => {
  users.push(user)
  return user
}

export const findUserByUsernameAndPassword = (
  username: string,
  password: string
): User | undefined => {
  return users.find(
    (user) => user.username === username && user.password === password
  )
}

export const getAllUsers = (): User[] => {
  return users
}