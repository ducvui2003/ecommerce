import envConfig from '@/config/env.config';
import http from '@/lib/http';
import userService from '@/service/user.service';
import { ResponseApi } from '@/types/api.type';
import { LoginResType, RefreshTokenResType } from '@/types/auth.type';
import {
  LoginBodyReqType,
  RegisterBodyReqType,
  RegisterResType,
  SendOTPReqType,
  SendOTPResType,
} from '@/types/schema/auth.schema';
import { User } from 'next-auth';

const authService = {
  login: async (data: LoginBodyReqType): Promise<User> => {
    try {
      const res = await http.post<ResponseApi<LoginResType>>(
        '/api/v1/auth/login',
        data,
      );
      const body = res.payload.data;

      const userInfo = await userService.getInfo(body.accessToken);
      return {
        ...userInfo,
        image: userInfo.avatar,
        accessToken: body.accessToken,
        refreshToken: body.refreshToken,
        expiresAt: body.exp,
      };
    } catch (error) {
      throw error;
    }
  },

  register: (data: RegisterBodyReqType) => {
    const { 'confirm-password': _, ...dataAfter } = data;
    return http.post<ResponseApi<RegisterResType>>(
      '/api/v1/auth/register',
      dataAfter,
    );
  },

  sendOTP: (data: SendOTPReqType): Promise<any> => {
    return http.post<ResponseApi<SendOTPResType>>('/api/v1/auth/send-otp', {
      email: data.email,
      type: 'REGISTER',
    });
  },

  renewToken: async (refreshToken: string): Promise<User> => {
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

      const userInfo = await userService.getInfo(data.data.accessToken);

      return {
        ...userInfo,
        image: userInfo.avatar,
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken,
        expiresAt: data.data.exp,
      };
    } catch (error) {
      console.error('Renew token failed');
      throw error;
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
export default authService;
