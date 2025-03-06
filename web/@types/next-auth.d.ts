import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

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
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: number;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    role: string;
  }
}
