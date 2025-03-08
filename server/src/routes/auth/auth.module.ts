import { Module } from '@nestjs/common';
import { AuthController } from '@route/auth/auth.controller';
import { PrismaAuthRepository } from '@route/auth/auth.repository';
import { AuthService } from '@route/auth/auth.service';
import { OauthService } from '@route/oauth/oauth.service';
import { RoleService } from '@route/auth/role.service';
import { TokenService } from '@shared/services/token.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AuthRepository',
      useClass: PrismaAuthRepository,
    },
    RoleService,
  ],
  exports: [RoleService, AuthService],
})
export class AuthModule {}
