import http from '@/lib/http';
import { ResponseApi } from '@/types/api.type';
import { LoginResType } from '@/types/auth.type';
import { User } from 'next-auth';

const oauth2Api = {
  login: async (
    accessToken: string,
    provider: 'google' | 'facebook',
  ): Promise<User> => {
    try {
      const res = await http.post<ResponseApi<LoginResType>>('/api/oauth2', {
        accessToken,
        provider,
      });
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
    } catch (e) {
      throw e;
    }
  },
};

export default oauth2Api;
