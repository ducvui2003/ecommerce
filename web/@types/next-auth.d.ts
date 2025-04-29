import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

type ErrorStatus = 'RefreshAccessTokenError' | 'Valid';
declare module 'next-auth' {
  interface User extends DefaultUser {
    id: number;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    role: string;
  }

  interface Session {
    user: {
      id: number;
      role: string;
      accessToken: string;
    } & DefaultSession['user'];
    error: ErrorStatus;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    role: string;
    error: ErrorStatus;
  }
}
