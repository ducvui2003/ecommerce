import { z } from 'zod';

export const CommentSchema= z.object({
  content: z.string().min(1).max(500),
  parentId: z.string().uuid().optional(),
  likes: z.number().default(0),
  product: z.number(),
  userId: z.number(),
});
