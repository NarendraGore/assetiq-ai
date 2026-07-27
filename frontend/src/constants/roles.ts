export const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
  EMPLOYEE: "Employee",
} as const;

export type UserRole =
  (typeof ROLES)[keyof typeof ROLES];