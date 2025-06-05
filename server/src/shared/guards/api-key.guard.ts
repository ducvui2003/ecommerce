import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { API_KEY } from '@shared/constants/auth.constant';
import envConfig from 'src/configs/env.config';
import { TokenService } from 'src/shared/services/token.service';

@Injectable()
export class APIKeyGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const xAPIKey = request.headers.authorization.split(' ')[1];
    if (!xAPIKey || xAPIKey != envConfig.PAYMENT_API_KEY) return false;

    return true;
  }
}
