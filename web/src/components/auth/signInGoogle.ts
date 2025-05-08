import envConfig from '@/config/env.config';
import { HOME_PAGE } from '@/constraint/variable';

const redirectUri = 'http://localhost:3000/api/auth/callback/google';

const signInGoogle = ({
  redirectUrl = HOME_PAGE,
}: {
  redirectUrl?: string;
} = {}) => {
  const params = new URLSearchParams({
    client_id: envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: encodeURIComponent(redirectUrl),
  });

  window.location.replace(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
  );
};
export default signInGoogle;
