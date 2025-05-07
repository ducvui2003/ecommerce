import { PageReq } from '@/types/api.type';

type UserInfoResType = {
  id: number;
  email: string;
  name: string;
  avatar?: string | undefined;
  role: string;
};

type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

type GetUserQueryReqType = PageReq & {
  id?: number;
  name?: string;
  email?: string;
  status?: UserStatus[];
};

type GetUserResType = {
  id: number;
  email: string;
  name?: string;
  dob?: Date;
  phone?: string;
  status: UserStatus;
  avatar?: string;
  createdAt: Date;
  roleName: string;
};

export type {
  UserInfoResType,
  UserStatus,
  GetUserQueryReqType,
  GetUserResType,
};
