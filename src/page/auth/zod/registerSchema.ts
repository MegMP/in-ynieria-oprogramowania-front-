import { z } from "zod";

export const registerSchema = z.object({
  login: z.string().nonempty("Login is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});
