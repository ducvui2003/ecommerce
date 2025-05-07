import { UnprocessableEntityException } from '@nestjs/common';
import { UserStatus } from '@shared/constants/auth.constant';
import { AddressType } from '@shared/models/address.model';
import { RoleType } from '@shared/models/role.model';
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
  dob: z.date().optional(),
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
    roleName: string;
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

type GetUserDetailResType = Omit<
  UserType,
  'password' | 'roleId' | 'role' | 'Addresses'
> & {
  addresses?: AddressType[];
  role: RoleType['name'];
};

export { UserInfoBodySchema, GetUserQuerySchema };
export type {
  GetUserQueryType,
  GetUserResType,
  GetUserDetailResType,
  UserInformationAllowed,
  InfoUpdate,
};
