import type { User, UserStatus } from "../../domain/user.js"

/** Output Port — contract the infrastructure layer must fulfil for user data operations */
export interface IUserRepository {
  /** Persist a new user and return it */
  addUser(user: User): User

  /** Look up a user by exact username and password match — only returns active users */
  findUserByUsernameAndPassword(username: string, password: string): User | undefined

  /** Find a user by username (used for duplicate check during registration) */
  findUserByUsername(username: string): User | undefined

  /** Find a user by their id */
  findUserById(id: string): User | undefined

  /** Return every stored user */
  getAllUsers(): User[]

  /** Change a user's status (active / blocked / deleted) — soft delete lives here */
  updateUserStatus(id: string, status: UserStatus): User | undefined
}
