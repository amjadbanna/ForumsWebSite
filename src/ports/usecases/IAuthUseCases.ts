import type { User } from "../../domain/user.js"

/**
 * Input Port — defines the authentication operations that the
 * application exposes to the outside world (HTTP controllers, etc).
 * The infrastructure layer calls these methods; it never touches
 * the repository directly.
 */
export interface IAuthUseCases {
  /**
   * Create a new user account with role "user".
   * Returns the persisted User object.
   */
  register(username: string, password: string): User

  /**
   * Validate credentials and return the matching User,
   * or undefined if no match is found.
   */
  login(username: string, password: string): User | undefined
}
