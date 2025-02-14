import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constant';
import { TokenService } from 'src/shared/services/token.service';

@Injectable()
export class APIKeyGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken: string = request.headers.authorization?.split(' ')[1];

    if (!accessToken) return false;

    try {
      const decodedAccessToken =
        await this.tokenService.verifyAccessToken(accessToken);
      request[REQUEST_USER_KEY] = decodedAccessToken;
      return true;
    } catch {
      return false;
    }
  }
}
