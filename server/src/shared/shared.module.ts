import envConfig from '@config/env.config';
import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  SHARED_PAYMENT_REPOSITORY,
  SHARED_CART_ITEM_REPOSITORY,
  SHARED_USER_REPOSITORY,
  SHARED_PRODUCT_REPOSITORY,
} from '@shared/constants/dependency.constant';
import { AccessTokenGuard } from '@shared/guards/access-token.guard';
import { APIKeyGuard } from '@shared/guards/api-key.guard';
import { LoggingMiddleware } from '@shared/middlewares/logging.middleware';
import { SharedPrismaPaymentRepository } from '@shared/repositories/shared-payment.repository';
import { SharedResourceRepository } from '@shared/repositories/shared-resource.repository';
import { PrismaCartItemRepository } from '@shared/repositories/shared-cart-item.repository';
import { SharedRoleRepository } from '@shared/repositories/shared-role.repository';
import { SharedPrismaUserRepository } from '@shared/repositories/shared-user.repository';
import { CacheService } from '@shared/services/cache/cache.service';
import { CloudinaryService } from '@shared/services/file/cloudinary/cloudinary.service';
import { HashingService } from '@shared/services/hashing.service';
import { MailFactory } from '@shared/services/mail/mail-factory.service';
import { MailForgotPasswordService } from '@shared/services/mail/mail-forgot-password.service';
import { MailRegisterService } from '@shared/services/mail/mail-register-verify.service';
import { PrismaService } from '@shared/services/prisma.service';
import { TokenService } from '@shared/services/token.service';
import { PrismaProductRepository } from '@shared/repositories/shared-product.repository';

const sharedServices: Provider[] = [
  PrismaService,
  HashingService,
  TokenService,
  AccessTokenGuard,
  APIKeyGuard,
  LoggingMiddleware,
  MailFactory,

  {
    provide: SHARED_USER_REPOSITORY,
    useClass: SharedPrismaUserRepository,
  },
  {
    provide: 'MAIL_REGISTER',
    useClass: MailRegisterService,
  },
  {
    provide: 'MAIL_FORGOT_PASSWORD',
    useClass: MailForgotPasswordService,
  },
  {
    provide: 'FILE_SERVICE',
    useClass: CloudinaryService,
  },
  {
    provide: SHARED_PAYMENT_REPOSITORY,
    useClass: SharedPrismaPaymentRepository,
  },
  {
    provide: SHARED_PRODUCT_REPOSITORY,
    useClass: PrismaProductRepository,
  },
  { provide: SHARED_CART_ITEM_REPOSITORY, useClass: PrismaCartItemRepository },
  CacheService,
  SharedRoleRepository,
  SharedResourceRepository,
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
