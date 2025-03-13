import { Global, Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '@shared/repositories/user.repository';
import { APIKeyGuard } from '@shared/guards/api-key.guard';
import { PrismaService } from '@shared/services/prisma.service';
import { HashingService } from '@shared/services/hashing.service';
import { TokenService } from '@shared/services/token.service';
import { AccessTokenGuard } from '@shared/guards/access-token.guard';
import { LoggingMiddleware } from '@shared/middlewares/logging.middleware';
import { MailService } from '@shared/services/mail/mail.service';
import { MailFactory } from '@shared/services/mail/mail-factory.service';
import { MailRegisterService } from '@shared/services/mail/mail-register-verify.service';
import { MailForgotPasswordService } from '@shared/services/mail/mail-forgot-password.service';

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
];

@Global()
@Module({
  providers: sharedServices,
  exports: sharedServices,
  imports: [JwtModule],
})
export class SharedModule {}
