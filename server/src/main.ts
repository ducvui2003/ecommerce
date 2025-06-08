import { NestFactory } from '@nestjs/core';

import envConfig from '@config/env.config';
import setupExceptionHandling from '@config/exception.config';
import { AppModule } from 'src/app.module';
import setupCors from '@config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupExceptionHandling(app);
  setupCors(app);
  await app.listen(envConfig.PORT);
}

bootstrap();
