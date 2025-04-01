import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from '@shared/repositories/user.repository';
import { PrismaUserRepository } from '@route/user/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY_MODULE',
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
