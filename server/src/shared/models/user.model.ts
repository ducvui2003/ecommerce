import { UserStatus } from '@shared/constants/auth.constant';
import { z } from 'zod';

export const UserModel = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().nullable(),
  password: z.string(),
  phone: z.string().nullable(),
  dob: z.date().nullable(),
  avatar: z.string().nullable(),
  status: z.enum([UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BLOCKED]),
  roleId: z.number().positive(),

  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
});

export type UserType = z.infer<typeof UserModel>;
