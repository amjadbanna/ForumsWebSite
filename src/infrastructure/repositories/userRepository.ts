import type { User } from "../../domain/user.js"
import { UserModel } from "../models/UserModel.js"

/** Persist a new user and return it */
export const addUser = async (user: User): Promise<User> => {
  await UserModel.create(user)
  return user
}

/** Find a user by username and password */
export const findUserByUsernameAndPassword = async (
  username: string,
  password: string
): Promise<User | undefined> => {
  const doc = await UserModel.findOne({ username, password }).select("-_id").lean()
  return doc ? (doc as unknown as User) : undefined
}

/** Find a user by username (used for duplicate check during registration) */
export const findUserByUsername = async (
  username: string
): Promise<User | undefined> => {
  const doc = await UserModel.findOne({ username }).select("-_id").lean()
  return doc ? (doc as unknown as User) : undefined
}

/** Return all users */
export const getAllUsers = async (): Promise<User[]> => {
  const docs = await UserModel.find().select("-_id").lean()
  return docs as unknown as User[]
}
