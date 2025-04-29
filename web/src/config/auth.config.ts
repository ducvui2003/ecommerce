import envConfig from '@/config/env.config';
import authService from '@/service/auth.service';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider, {
  CredentialInput,
} from 'next-auth/providers/credentials';
import { HTTP_STATUS_CODE } from '@/constraint/variable';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

import oauth2Api from '@/service/oauth2.service';

const nextAuthConfig: NextAuthOptions = {
  debug: false,
  providers: [
    CredentialsProvider<Record<string, CredentialInput>>({
      name: 'credentials',
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
          console.info('auth.config.ts', 'error in authorize', error);
          return null;
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
      // console.log('Go to callback');
      // console.log('user', user);
      // console.log('account', account);
      // console.log('profile', profile);
      // console.log('email', email);
      // console.log('credentials', credentials);
      if (user) return true;
      throw Error('🔹 SignIn Callback: Error');
    },

    // Call when jwt created
    // user param is receive from authorize
    // token is a obj that is assign value related jwt (AT and RT)
    // return data encrypted and store cookie
    async jwt({ token, user, account }) {
      // console.log('go to jwt');
      // console.log('token', token);
      // console.log('user', user);
      // console.log('account', account);

      // Identify login = oauth 2
      if (account?.access_token) {
        switch (account.provider) {
          case 'google': {
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
              token.error = 'Valid';
              return token;
            } catch (error) {
              console.error('⚠️ Google login error:', error);
              break;
            }
          }
          case 'facebook': {
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
              token.error = 'Valid';

              return token;
            } catch (error) {
              console.error('⚠️ Facebook login error:', error);
              break;
            }
          }
        }
      }

      // Login = credential
      if (user) {
        token.id = user.id as number;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;
        token.error = 'Valid';
      }

      if (Date.now() <= (token.expiresAt as number) * 1000) return token;

      // Refresh access token if expired
      console.info('Token expired');
      const newTokens = await authService.renewToken(token.refreshToken);
      if (newTokens) {
        token.email = newTokens.email;
        token.id = newTokens.id;
        token.name = newTokens.name;
        token.picture = newTokens.image;
        token.accessToken = newTokens.accessToken;
        token.refreshToken = newTokens.refreshToken;
        token.expiresAt = newTokens.expiresAt;
        token.error = 'Valid';
      } else {
        // Refresh token expired => login again
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }

      return token;
    },

    // Customize session return if use useSession or getSession func
    session({ session, token, user }) {
      // console.log('session');
      // console.log('session', session);
      // console.log('token', token);
      // console.log('user', user);
      session.user = {
        id: token.id,
        name: token.name,
        accessToken: token.accessToken,
        role: token.role,
        email: token.email,
      };
      session.error = token.error;
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
      } finally {
        // toast({
        //   title: 'Đăng xuất',
        //   description: error?.payload?.error ?? 'Lỗi không xác định',
        //   variant: 'destructive',
        //   duration: duration,
        // });
      }
    },
  },
};
export default nextAuthConfig;
