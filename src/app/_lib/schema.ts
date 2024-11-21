import { z } from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters long")
    .max(20, "Username cannot exceed 20 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password cannot exceed 50 characters"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters long")
    .max(20, "Username cannot exceed 20 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password cannot exceed 50 characters"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
