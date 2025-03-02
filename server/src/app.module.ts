import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { LoggingMiddleware } from 'src/shared/middlewares/logging.middleware';
import { ZodValidationPipe } from 'src/shared/pipes/validation.pipe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import './configs/env.config';
import { AuthModule } from './routes/auth/auth.module';
import { UserModule } from './routes/user/user.module';
import { SharedModule } from './shared/shared.module';
import { HttpExceptionFilter } from 'src/shared/filters/validation-exception.filter';
@Module({
  imports: [SharedModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
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
