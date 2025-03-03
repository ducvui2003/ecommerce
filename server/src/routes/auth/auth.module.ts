import { Module } from '@nestjs/common';
import { AuthController } from '@route/auth/auth.controller';
import { PrismaAuthRepository } from '@route/auth/auth.repository';
import { AuthService } from '@route/auth/auth.service';
import { RoleService } from '@route/auth/role.service';

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
})
export class AuthModule {}
