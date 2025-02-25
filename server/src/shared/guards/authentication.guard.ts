import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  AUTH_TYPE_KEY,
  AuthType,
  ConditionType,
} from 'src/shared/constants/auth.constant';
import { AuthTypeDecoratorPayload } from 'src/shared/decorators/auth.decorator';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { APIKeyGuard } from 'src/shared/guards/api-key.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly authTypeGuardMap: Record<string, CanActivate> = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.APIKey]: this.apiKeyGuard,
    [AuthType.None]: { canActivate: () => true },
  };
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: APIKeyGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypeValue = this.reflector.getAllAndOverride<
      AuthTypeDecoratorPayload | undefined
    >(AUTH_TYPE_KEY, [context.getHandler(), context.getClass()]) ?? {
      authType: AuthType.None,
      options: { condition: ConditionType.And },
    };

    if (authTypeValue.authType === AuthType.None) return true;

    const guards: CanActivate[] = authTypeValue.authType.map(
      (authType) => this.authTypeGuardMap[authType],
    );

    if (authTypeValue.options.condition === ConditionType.And) {
      for (const guard of guards) {
        const canActive = await guard.canActivate(context);
        if (!canActive) throw new UnauthorizedException();
      }
      return true;
    }

    if (authTypeValue.options.condition === ConditionType.Or) {
      for (const guard of guards) {
        const canActive = await guard.canActivate(context);
        if (canActive) return true;
      }
      throw new UnauthorizedException();
    }
    return false;
  }
}
