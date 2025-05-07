import { UserStatus } from '@shared/constants/auth.constant';
import { AddressModel } from '@shared/models/address.model';
import { RoleModel } from '@shared/models/role.model';
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
  role: RoleModel.optional(),
  addresses: z.array(AddressModel).optional(),

  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
});

export type UserType = z.infer<typeof UserModel>;
