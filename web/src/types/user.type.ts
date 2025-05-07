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
  role: string;
};

type GetAddressDetailResType = {
  id: string;
  province: string;
  district: string;
  ward: string;
  detail: string;
  createdAt: Date;
};

type GetUserDetailResType = GetUserResType & {
  addresses: GetAddressDetailResType[];
};

export type {
  UserInfoResType,
  UserStatus,
  GetUserQueryReqType,
  GetUserResType,
  GetUserDetailResType,
};
