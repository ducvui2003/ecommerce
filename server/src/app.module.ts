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
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OauthModule } from '@route/oauth/oauth.module';
import { AddressModule } from './routes/address/address.module';
import { SerializerInterceptor } from '@shared/interceptors/serializer.interceptor';
import { UnprocessableEntityExceptionFilter } from '@shared/filters/unprocessable-entity.exception.filter';
import { HttpExceptionFilter } from '@shared/filters/http.exception.filter';

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
      provide: APP_INTERCEPTOR,
      useClass: SerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnprocessableEntityExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
