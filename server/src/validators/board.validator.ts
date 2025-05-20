import { z } from "zod";

export const BoardSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string().optional(),
  description: z.string(),
  private: z.boolean(),
  ownerId: z.string(),
  createdAt: z.date().optional(),
});

export type Board = z.infer<typeof BoardSchema>;
