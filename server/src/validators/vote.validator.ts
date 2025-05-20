import { z } from "zod";

export const voteSchema = z.object({
  id: z.string().optional(),
  suggestionId: z.string().optional(),
  userId: z.string().optional(),
  createdAt: z.date().optional(),
});