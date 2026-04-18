export type Role = "user" | "admin" | "superuser"

export interface User {
  id: string
  username: string
  password: string
  role: Role
}

/**
 * Factory function — the ONLY correct way to create a User object.
 * This enforces the rules that must always be true for a User to exist.
 * If any rule is broken, it throws an error before the bad data ever reaches the database.
 */
export function createUser(id: string, username: string, password: string, role: Role = "user"): User {
  // A user without a username makes no sense — reject it immediately
  if (!username || !username.trim()) throw new Error("Username is required")

  // Minimum password length — short passwords are too easy to guess
  if (!password || password.length < 6) throw new Error("Password must be at least 6 characters")

  return { id, username: username.trim(), password, role }
}
