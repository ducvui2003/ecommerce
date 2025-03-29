import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '@shared/constants/auth.constant';
import { JwtCustomClaims } from 'src/shared/types/jwt.type';

/**
 *  Get properties of JWTPayload
 */
export const ActiveUser = createParamDecorator(
  (field: keyof JwtCustomClaims | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: JwtCustomClaims | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
