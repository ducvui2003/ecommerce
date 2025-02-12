import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import envConfig from 'src/shared/config';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

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

  await app.listen(envConfig.PORT);
}
bootstrap();
