import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: number;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    role: string;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
    refreshToken: string;
  }

  interface JWT {
    id: number;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    role: string;
  }
}
