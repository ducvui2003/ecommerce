import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedUserRepository } from '@shared/repositories/shared-user.repository';
import { PrismaUserRepository } from '@route/user/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
