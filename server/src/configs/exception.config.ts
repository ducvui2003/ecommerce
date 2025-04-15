import { INestApplication } from '@nestjs/common';
import { GlobalExceptionFilter } from '@shared/filters/global-exception.filter';
import { AppExceptionFilter } from '@shared/filters/app.exception.filter';

export default function setupExceptionHandling(
  app: INestApplication<any>,
): void {
  app.useGlobalFilters(new AppExceptionFilter(), new GlobalExceptionFilter());
}
