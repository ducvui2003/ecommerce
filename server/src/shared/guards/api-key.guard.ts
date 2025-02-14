import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import envConfig from 'src/shared/config';
import { TokenService } from 'src/shared/services/token.service';

@Injectable()
export class APIKeyGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const xAPIKey = request.headers['x-api-key'];

    if (!xAPIKey || xAPIKey != envConfig.SECRET_KEY) return false;

    return true;
  }
}
