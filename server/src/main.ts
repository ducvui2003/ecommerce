import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import envConfig from 'src/configs/env.config';
import { AppModule } from './app.module';
import { TransformInterceptor } from 'src/shared/interceptors/transform.interceptor';

import setupCors from 'src/configs/cors.config';
import setupSwagger from 'src/configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupCors(app);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(
          errors.map((error) => ({
            field: error.property,
            error: Object.values(
              error.constraints as Record<string, string>,
            ).join(', '),
          })),
        );
      },
    }),
  );

  app.useGlobalInterceptors(new TransformInterceptor());

  setupSwagger(app);

  await app.listen(envConfig.PORT);
}
bootstrap();
