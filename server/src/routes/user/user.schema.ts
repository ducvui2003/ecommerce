import { UnprocessableEntityException } from '@nestjs/common';
import { UserStatus } from '@shared/constants/auth.constant';
import { AddressModel } from '@shared/models/address.model';
import { UserModel, UserType } from '@shared/models/user.model';
import { PageableSchema } from '@shared/types/request.type';
import { z } from 'zod';

const UserInfoBodySchema = UserModel.pick({
  name: true,
  phone: true,
  dob: true,
}).extend({
  name: z.string().optional(),
  phone: z.string().optional(),
  dob: z.coerce.date().optional(),
  avatar: z.string().optional(),
});

type GetUserResType = Partial<
  Pick<
    UserType,
    | 'id'
    | 'email'
    | 'name'
    | 'dob'
    | 'phone'
    | 'status'
    | 'avatar'
    | 'createdAt'
  > & {
    role: string;
  }
>;

const GetUserQuerySchema = PageableSchema.extend({
  id: z.coerce.number().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  status: z
    .union([z.coerce.string(), z.array(z.coerce.string())])
    .transform((val) => {
      if (val === undefined) return [];
      if (Array.isArray(val)) {
        return val.map((item) => {
          if (item.toUpperCase() in UserStatus) {
            return item as UserStatus;
          }
          throw new UnprocessableEntityException({
            field: 'status',
            error: item + ' is not exist in UserStatus',
          });
        });
      } else {
        if (val.toUpperCase() in UserStatus) {
          return [val as UserStatus];
        }
        return [];
      }
    }),
});
type GetUserQueryType = z.infer<typeof GetUserQuerySchema>;

type UserInformationAllowed = Omit<UserType, 'password' | 'role'> & {
  role: string;
};
type InfoUpdate = Partial<Pick<UserType, 'name' | 'phone' | 'dob'>>;

const GetUserResSchema = UserModel.pick({
  id: true,
  name: true,
  email: true,
  // dob: true,
  status: true,
  createdAt: true,
}).extend({
  role: z.string(),
});

type GetUserResSchemaType = z.infer<typeof GetUserResSchema>;

const GetUserDetailResSchema = UserModel.pick({
  id: true,
  name: true,
  email: true,
  status: true,
  dob: true,
  phone: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  role: z.string(),
  addresses: z
    .array(
      AddressModel.pick({
        province: true,
        district: true,
        ward: true,
        detail: true,
      }),
    )
    .optional(),
});

type GetUserDetailResType = z.infer<typeof GetUserDetailResSchema>;

export {
  GetUserDetailResSchema,
  GetUserQuerySchema,
  GetUserResSchema,
  UserInfoBodySchema,
};
export type {
  GetUserDetailResType,
  GetUserQueryType,
  GetUserResSchemaType,
  GetUserResType,
  InfoUpdate,
  UserInformationAllowed,
};
