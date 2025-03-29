import envConfig from '@config/env.config';
import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from '@shared/guards/access-token.guard';
import { APIKeyGuard } from '@shared/guards/api-key.guard';
import { LoggingMiddleware } from '@shared/middlewares/logging.middleware';
import { UserRepository } from '@shared/repositories/user.repository';
import { CacheService } from '@shared/services/cache/cache.service';
import { HashingService } from '@shared/services/hashing.service';
import { MailFactory } from '@shared/services/mail/mail-factory.service';
import { MailForgotPasswordService } from '@shared/services/mail/mail-forgot-password.service';
import { MailRegisterService } from '@shared/services/mail/mail-register-verify.service';
import { PrismaService } from '@shared/services/prisma.service';
import { TokenService } from '@shared/services/token.service';

const sharedServices: Provider[] = [
  PrismaService,
  HashingService,
  TokenService,
  AccessTokenGuard,
  APIKeyGuard,
  LoggingMiddleware,
  UserRepository,
  MailFactory,
  {
    provide: 'MAIL_REGISTER',
    useClass: MailRegisterService,
  },
  {
    provide: 'MAIL_FORGOT_PASSWORD',
    useClass: MailForgotPasswordService,
  },
  CacheService,
];

@Global()
@Module({
  providers: sharedServices,
  exports: sharedServices,
  imports: [
    JwtModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          stores: [
            createKeyv({
              url: envConfig.REDIS_URL,
            }),
          ],
        };
      },
    }),
  ],
})
export class SharedModule {}
