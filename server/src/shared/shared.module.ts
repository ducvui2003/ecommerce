import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '@shared/repositories/user.repository';
import { APIKeyGuard } from '@shared/guards/api-key.guard';
import { PrismaService } from '@shared/services/prisma.service';
import { HashingService } from '@shared/services/hashing.service';
import { TokenService } from '@shared/services/token.service';
import { AccessTokenGuard } from '@shared/guards/access-token.guard';
import { LoggingMiddleware } from '@shared/middlewares/logging.middleware';
import { MailService } from '@shared/services/mail.service';

const sharedServices = [
  PrismaService,
  HashingService,
  TokenService,
  AccessTokenGuard,
  APIKeyGuard,
  LoggingMiddleware,
  UserRepository,
  MailService,
];

@Global()
@Module({
  providers: sharedServices,
  exports: sharedServices,
  imports: [JwtModule],
})
export class SharedModule {}
