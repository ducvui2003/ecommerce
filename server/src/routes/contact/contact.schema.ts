import { z } from 'zod';

export const CreateContactSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string(),
  message: z.string().min(1, 'Message is required'),
});

type CreateOrderType = z.infer<typeof CreateContactSchema>;