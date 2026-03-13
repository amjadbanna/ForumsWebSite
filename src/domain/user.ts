export type Role = "user" | "admin" | "superuser";

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
}
