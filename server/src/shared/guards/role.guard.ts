import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  REQUEST_USER_KEY,
  ROLES_KEY,
  RoleName,
} from '@shared/constants/auth.constant';
import { JwtPayload } from '@shared/types/jwt.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<RoleName[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true; // No roles required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const jwt: JwtPayload = request[REQUEST_USER_KEY];

    if (jwt.role && requiredRoles.includes(jwt.role as RoleName)) {
      return true;
    }

    throw new ForbiddenException({
      message: `${requiredRoles.join(', ')} role is required to access this resource.`,
      errorCode: 'FORBIDDEN',
      statusCode: 403,
    });
  }
}
