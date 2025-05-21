import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  createdAt: z.date().optional(),
});