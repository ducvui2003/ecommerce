import { PageReq } from '@/types/api.type';
import { Role } from '@/types/auth.type';

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

interface User {
  id: number;
  email: string;
  name: string;
  image?: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  role: Role;
}

export type {
  UserInfoResType,
  UserStatus,
  GetUserQueryReqType,
  GetUserResType,
  GetUserDetailResType,
  User,
};
