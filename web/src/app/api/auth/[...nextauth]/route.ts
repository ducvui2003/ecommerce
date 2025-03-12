import envConfig from '@/config/env.config';
import NextAuth, { NextAuthOptions, User } from 'next-auth';

import authService from '@/service/auth.service';
import CredentialsProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';
import { HTTP_STATUS_CODE } from '@/constraint/variable';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

import oauth2Api from '@/service/oauth2.service';

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
          const res = await authService.login({
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

    GoogleProvider({
      clientId: envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { scope: 'openid email profile', response_type: 'code' },
      },
    }),

    FacebookProvider({
      clientId: envConfig.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: envConfig.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
      token: 'https://graph.facebook.com/v22.0/oauth/access_token',
      authorization: {
        url: 'https://www.facebook.com/v22.0/dialog/oauth',
        params: { fields: 'id,name,email,picture' },
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
    async jwt({ token, user, account }) {
      // console.log('jwt trigger', trigger);
      if (account?.access_token) {
        console.log('Call to nest');
        if (account?.provider === 'google') {
          try {
            const userData: User = await oauth2Api.login(
              account.access_token,
              'google',
            );
            token.id = userData.id;
            token.name = userData.name;
            token.email = userData.email;
            token.role = userData.role;
            token.accessToken = userData.accessToken;
            token.refreshToken = userData.refreshToken;
            token.expiresAt = userData.expiresAt;
            console.log('token', token);
            return token;
          } catch (error) {
            console.error('⚠️ Google login error:', error);
          }
        }
        if (account?.provider === 'facebook') {
          try {
            const userData: User = await oauth2Api.login(
              account.access_token,
              'facebook',
            );
            token.id = userData.id;
            token.name = userData.name;
            token.email = userData.email;
            token.role = userData.role;
            token.accessToken = userData.accessToken;
            token.refreshToken = userData.refreshToken;
            token.expiresAt = userData.expiresAt;
            console.log('token', token);
            return token;
          } catch (error) {
            console.error('⚠️ Facebook login error:', error);
          }
        }
      }

      if (user) {
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;
      }

      // Refresh access token if expired
      if (Date.now() > (token.expiresAt as number) * 1000) {
        const newTokens = await authService.renewToken(
          token.refreshToken as string,
        );
        if (newTokens) {
          token.email = newTokens.email;
          token.id = newTokens.id;
          token.name = newTokens.name;
          token.picture = newTokens.image;
          token.accessToken = newTokens.accessToken;
          token.refreshToken = newTokens.refreshToken;
          token.expiresAt = newTokens.expiresAt;
        }
      }

      // console.log('🔹 JWT Callback:', token);
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
      try {
        console.log('Call logout api');
        await authService.logout(token.accessToken, token.refreshToken);
      } catch (error) {
        console.error('⚠️ Error calling logout API:', error);
      }
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
