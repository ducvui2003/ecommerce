import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { X_API_KEY } from '@shared/constants/auth.constant';
import envConfig from 'src/configs/env.config';
import { TokenService } from 'src/shared/services/token.service';

@Injectable()
export class APIKeyGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const xAPIKey = request.headers[X_API_KEY];

    if (!xAPIKey || xAPIKey != envConfig.SECRET_KEY) return false;

    return true;
  }
}
