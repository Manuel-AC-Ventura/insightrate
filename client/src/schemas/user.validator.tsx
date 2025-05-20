import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
  passwordConfirmation: z.string().min(6, "Password confirmation is required").optional(),
});