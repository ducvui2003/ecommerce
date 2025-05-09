import middleWareAuth from '@/middlewares/auth.middleware';
import middlewarePreventAfterAuth from '@/middlewares/preventAfterAuth';

const middlewares = [
  middlewarePreventAfterAuth,
  middleWareAuth.authMiddlewareWithUser,
  middleWareAuth.authMiddlewareWithSeller,
  middleWareAuth.authMiddlewareWithAdmin,
];

export default middlewares;
