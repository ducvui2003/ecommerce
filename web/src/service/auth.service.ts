import http from '@/lib/http';
import { ResponseApi } from '@/types/schema/api.schema';
import {
  LoginBodyReqType,
  LoginRes,
  RegisterBodyReqType,
  RegisterRes,
} from '@/types/schema/auth.schema';
import { TokenType } from '@/types/token';

const authApiRequest = {
  login: (data: LoginBodyReqType) => {
    return http.post<ResponseApi<LoginRes>>('/api/v1/auth/login', data);
  },
  register: (data: RegisterBodyReqType) => {
    return http.post<ResponseApi<RegisterRes>>('/api/v1/auth/register', data);
  },
  auth: ({ accessToken, refreshToken }: TokenType) => {
    http.post<ResponseApi<RegisterRes>>(
      '/api/auth',
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      {
        baseUrl: '',
      },
    );
  },
  logoutFromNextServer: (refreshToken: string) => {
    http.post<ResponseApi<undefined>>('/api/v1/auth/logout', {
      refreshToken,
    });
  },
  logoutFromNextClient: () =>
    http.post<ResponseApi<RegisterRes>>('/api/auth/logout', null, {
      baseUrl: '',
    }),
};
export default authApiRequest;
