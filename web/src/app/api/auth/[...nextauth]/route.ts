import envConfig from '@/config/env.config';
import NextAuth, { NextAuthOptions } from 'next-auth';

import authApiRequest from '@/service/auth.service';
import CredentialsProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';
import { HTTP_STATUS_CODE } from '@/constraint/variable';

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider<Record<string, CredentialInput>>({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      /**
       * Xử lý call api authentication tại đây
       *
       * @param {Record<string, string> | undefined} credentials:
       *  credential cho email và password đã quy định ở CredentialsProvider
       * @returns {User | null} trả về user object nếu login thành công, ngược lại trả về null
       * @throws {Error} throw error nếu có lỗi xảy ra, xử lý tại nơi gọi SignIn function của next auth
       */
      async authorize(credentials, req) {
        try {
          const res = await authApiRequest.login({
            email: credentials?.email || '',
            password: credentials?.password || '',
          });

          return res;
        } catch (error: any) {
          // 422 = email hoặc password không đúng
          if (error.status === HTTP_STATUS_CODE.ENTITY_ERROR_STATUS_CODE) {
            throw Error(HTTP_STATUS_CODE.ENTITY_ERROR_STATUS_CODE.toString());
          }
          throw new Error('Error but not cast in next auth');
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Save data in cookie
  },
  jwt: {
    secret: envConfig.NEXT_PUBLIC_AUTH_SECRET,
  },

  callbacks: {
    signIn({ user, account, profile, email, credentials }) {
      if (user) return true;
      throw Error('🔹 SignIn Callback: Error');
    },

    // Call when jwt created
    // user param is receive from authorize
    // token is a obj that is assign value related jwt (AT and RT)
    // return data encrypted and store cookie
    async jwt({ token, user, trigger }) {
      console.log('jwt trigger', trigger);
      if (user) {
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;
      }

      // Refresh access token if expired
      if (Date.now() > (token.expiresAt as number) * 1000) {
        const newTokens = await authApiRequest.renewToken(
          token.refreshToken as string,
        );
        if (newTokens) {
          token.accessToken = newTokens.accessToken;
          token.refreshToken = newTokens.refreshToken;
          token.expiresAt = newTokens.exp;
        }
      }

      console.log('🔹 JWT Callback:', token);
      return token;
    },

    // Customize session return if use useSession or getSession func
    session({ session, token, user }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  pages: {
    // redirect if not authorized
    signIn: '/login',
    signOut: '/signout',
  },

  events: {
    async signOut({ session, token }) {
      console.info('token', token);
      try {
        await authApiRequest.logout(token.accessToken, token.refreshToken);
      } catch (error) {
        console.error('⚠️ Error calling logout API:', error);
      }
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
