import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { LoggingMiddleware } from '@shared/middlewares/logging.middleware';
import { ZodValidationPipe } from '@shared/pipes/validation.pipe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import '@config/env.config';
import { AuthModule } from '@route/auth/auth.module';
import { UserModule } from '@route/user/user.module';
import { SharedModule } from '@shared/shared.module';
import { HttpExceptionFilter } from '@shared/filters/validation-exception.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OauthModule } from '@route/oauth/oauth.module';
import { AddressModule } from './routes/address/address.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    EventEmitterModule.forRoot(),
    OauthModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
