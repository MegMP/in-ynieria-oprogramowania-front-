import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().nonempty("Login is required"),
  password: z.string().nonempty("Password is required"),
});
