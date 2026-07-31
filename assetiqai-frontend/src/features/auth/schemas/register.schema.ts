import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long"),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long"),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email"),

    phoneNumber: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain one uppercase letter")
      .regex(/[a-z]/, "Must contain one lowercase letter")
      .regex(/[0-9]/, "Must contain one number")
      .regex(/[^A-Za-z0-9]/, "Must contain one special character"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;