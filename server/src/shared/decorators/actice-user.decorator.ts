import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTPayload } from 'src/shared/types/jwt.type';

export const ActiveUser = createParamDecorator(
  (field: keyof JWTPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: JWTPayload | undefined = request.user;
    return field ? user?.[field] : user;
  },
);
