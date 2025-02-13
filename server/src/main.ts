import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import envConfig from 'src/shared/config';
import { TransformInterceptor } from 'src/shared/Interceptor/transform.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(envConfig.PORT);
}
bootstrap();
