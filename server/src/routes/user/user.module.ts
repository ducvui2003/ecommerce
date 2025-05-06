import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from '@route/user/user.repository';
import { UserManagerController } from '@route/user/user-manager.controller';
import { UserManagerService } from '@route/user/user-manger.service';

@Module({
  controllers: [UserController, UserManagerController],
  providers: [
    UserService,
    UserManagerService,
    {
      provide: 'USER_REPOSITORY',
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
