import type { User } from "../../domain/user.js"

/** Output Port — contract the infrastructure layer must fulfil for user data operations */
export interface IUserRepository {
  /** Persist a new user and return it */
  addUser(user: User): User

  /** Look up a user by exact username and password match */
  findUserByUsernameAndPassword(username: string, password: string): User | undefined

  /** Find a user by username (used for duplicate check during registration) */
  findUserByUsername(username: string): User | undefined

  /** Return every stored user */
  getAllUsers(): User[]
}
