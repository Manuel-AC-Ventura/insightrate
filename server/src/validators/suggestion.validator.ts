import { z } from 'zod';

export const suggestionStatusSchema = z.enum(['novo', 'planejado', 'em_andamento', 'concluido']);

export const suggestionSchema = z.object({
  id: z.string().optional(),
  boardId: z.string(),
  authorId: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: suggestionStatusSchema,
  votesCount: z.number().optional(),
  createdAt: z.date().optional(),
});