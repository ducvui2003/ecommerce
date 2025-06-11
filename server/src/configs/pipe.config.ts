import { INestApplication, ValidationPipe } from '@nestjs/common';

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
