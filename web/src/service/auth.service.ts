import http from '@/lib/http';
import { ResponseApi } from '@/types/api.type';
import {
  LoginBodyReqType,
  RegisterBodyReqType,
  RegisterRes,
} from '@/types/schema/auth.schema';
import { LoginResType, RefreshTokenResType } from '@/types/auth.type';
import envConfig from '@/config/env.config';
import { User } from 'next-auth';
import { error } from 'console';

const authApiRequest = {
  login: async (data: LoginBodyReqType): Promise<User> => {
    try {
      const res = await http.post<ResponseApi<LoginResType>>(
        '/api/v1/auth/login',
        data,
      );
      const body = res.payload.data;
      return {
        id: body.id,
        email: body.email,
        image: null,
        accessToken: body.accessToken,
        refreshToken: body.refreshToken,
        expiresAt: body.exp,
        role: 'USER',
      };
    } catch (error) {
      throw error;
    }
  },
  register: (data: RegisterBodyReqType) => {
    return http.post<ResponseApi<RegisterRes>>('/api/v1/auth/register', data);
  },

  renewToken: async (
    refreshToken: string,
  ): Promise<RefreshTokenResType | undefined> => {
    try {
      const body = {
        refreshToken: refreshToken,
      };
      const res = await fetch(
        `${envConfig.NEXT_PUBLIC_SERVER_URL}/api/v1/refresh-token`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const data: ResponseApi<RefreshTokenResType> = await res.json();

      return {
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
        exp: data.data.exp,
      };
    } catch (error) {
      console.error('Renew token failed');
      return undefined;
    }
  },

  logout: async (accessToken: string, refreshToken: string): Promise<void> => {
    try {
      const body = {
        refreshToken: refreshToken,
      };
      await fetch(`${envConfig.NEXT_PUBLIC_SERVER_URL}/api/v1/logout`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('✅ Successfully logged out from external API');
    } catch (error) {
      console.error('⚠️ Error calling logout API:', error);
    }
  },
};
export default authApiRequest;
