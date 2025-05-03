import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter } from '@shared/filters/app.exception.filter';
import { GlobalExceptionFilter } from '@shared/filters/global-exception.filter';

export default function setUpPipe(
  app: INestApplication<any>,
): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}
