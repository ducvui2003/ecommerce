import { z } from 'zod';

export const CommentSchema= z.object({
  content: z.string().min(1).max(500),
  parentId: z.string().uuid().optional(),
  likes: z.number().default(0),
  product: z.number(),
});

export const CommentUpdateSchema = z.object({
  content: z.string().min(1).max(500),
  commentId: z.string().uuid(),
});

export const CommentResponseSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  likes: z.number(),
  parentId: z.string().uuid().optional(),
  updatedAt: z.date(),
});