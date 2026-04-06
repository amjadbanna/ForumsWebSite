import type { User } from "../../domain/user.js"

/**
 * Output Port — defines what the infrastructure layer must provide
 * for user data operations. Any actual DB or in-memory store must
 * implement every method listed here.
 */
export interface IUserRepository {
  /** Persist a new user and return it */
  addUser(user: User): User

  /** Look up a user by exact username + password match */
  findUserByUsernameAndPassword(
    username: string,
    password: string
  ): User | undefined

  /** Return every stored user */
  getAllUsers(): User[]
}
