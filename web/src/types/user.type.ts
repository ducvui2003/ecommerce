import { PageReq } from '@/types/api.type';
import { Role } from '@/types/auth.type';
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
type UserInfoResType = {
  id: number;
  email: string;
  name: string;
  avatar?: string | undefined;
  role: string;
};

type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

type SearchQueyReqType = {
  id?: number;
  name?: string;
  email?: string;
  status?: UserStatus | UserStatus[];
};

type GetUserQueryReqType = PageReq<SearchQueyReqType>;

type GetUserResType = {
  id: number;
  email: string;
  name: string;
  dob: Date;
  phone: string;
  status: UserStatus;
  avatar?: string;
  createdAt: Date;
  role: Role;
};

type GetAddressDetailResType = {
  province: string;
  district: string;
  ward: string;
  detail: string;
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
  SearchQueyReqType,
  User,
};
