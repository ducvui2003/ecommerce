import { UserModel } from '@shared/models/user.model';
import { z } from 'zod';

export const UserInfoBodySchema = UserModel.pick({
  name: true,
  phone: true,
  dob: true,
}).extend({
  name: z.string().optional(),
  phone: z.string().optional(),
  dob: z.date().optional(),
});
