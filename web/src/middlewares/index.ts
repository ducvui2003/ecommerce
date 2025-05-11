import middleWareAuth from '@/middlewares/auth.middleware';
import middlewarePreventAfterAuth from '@/middlewares/preventAfterAuth';
import middlewareRefreshToken from '@/middlewares/refresh-token.middleware';

const middlewares = [
  middlewarePreventAfterAuth,
  middlewareRefreshToken,
  middleWareAuth.authMiddlewareWithUser,
  middleWareAuth.authMiddlewareWithSeller,
  middleWareAuth.authMiddlewareWithAdmin,
];

export default middlewares;
