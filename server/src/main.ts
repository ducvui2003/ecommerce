import { NestFactory } from '@nestjs/core';

import envConfig from '@config/env.config';
import setupExceptionHandling from '@config/exception.config';
import { AppModule } from 'src/app.module';
import setupCors from '@config/cors.config';
import setupWebsocket from '@config/websocker.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupExceptionHandling(app);
  setupCors(app);
  setupWebsocket(app);
  await app.listen(envConfig.PORT);
}

bootstrap();
