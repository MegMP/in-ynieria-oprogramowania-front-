import { z } from "zod";

export const UserUpdateSchema = z.object({
  login: z.string().nonempty("Login is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});
