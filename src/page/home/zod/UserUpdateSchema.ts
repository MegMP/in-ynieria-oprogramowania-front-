import { z } from "zod";

export const UserUpdateSchema = z.object({
  login: z.string().min(1, "Login is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});
