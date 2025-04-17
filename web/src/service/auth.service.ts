import envConfig from '@/config/env.config';
import { HTTP_STATUS_CODE } from '@/constraint/variable';
import http, { EntityError } from '@/lib/http';
import userService from '@/service/user.service';
import { ResponseApi } from '@/types/api.type';
import {
  LoginReqType,
  LoginResType,
  OTPReqType,
  OTPResType,
  RefreshTokenResType,
  RegisterReqType,
  ResetPasswordReqType,
  VerifyOTPReqType,
} from '@/types/auth.type';
import {
  ForgotPasswordFormType,
  LoginFormType,
  RegisterFormType,
  SendOTPFormType,
} from '@/types/schema/auth.schema';
import { User } from 'next-auth';

const authService = {
  login: async (data: LoginReqType): Promise<User> => {
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

  register: (data: RegisterReqType) => {
    return http.post<ResponseApi<RegisterFormType>>(
      '/api/v1/auth/register',
      data,
    );
  },

  sendOTPVerify: async (data: OTPReqType): Promise<OTPResType> => {
    try {
      const response = await http.post<ResponseApi<OTPResType>>(
        '/api/v1/auth/send-otp',
        {
          email: data.email,
          type: 'REGISTER',
        },
      );
      return response.payload.data;
    } catch (_) {
      throw new EntityError({
        status: HTTP_STATUS_CODE.UNAUTHORIZED,
        payload: {
          error: '',
          message: [
            {
              field: 'email',
              error: 'Email này đã tồn tại',
            },
          ],
        },
      });
    }
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
      await fetch(`${envConfig.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/logout`, {
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

  sendOTPForgetPassword: (email: string): Promise<any> => {
    return http.post<ResponseApi<void>>(
      '/api/v1/auth/send-otp',
      {
        email: email,
        type: 'FORGOT_PASSWORD',
      },
      undefined,
      false,
    );
  },

  verifyOTPForgetPassword: (data: VerifyOTPReqType) => {
    return http.post<ResponseApi<void>>(
      '/api/v1/auth/verify-otp',
      {
        email: data.email,
        type: 'FORGOT_PASSWORD',
        code: data.otp,
      },
      undefined,
      false,
    );
  },

  resetPassword: (data: ResetPasswordReqType) => {
    return http.post<ResponseApi<void>>(
      '/api/v1/auth/forget-password',
      {
        email: data.email,
        otp: data.otp,
        password: data.password,
      },
      undefined,
      false,
    );
  },
};
export default authService;
