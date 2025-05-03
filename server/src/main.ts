import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import setupCors from 'src/configs/cors.config';
import setupSwagger from 'src/configs/swagger.config';
import envConfig from '@config/env.config';
import setupExceptionHandling from '@config/exception.config';
import setUpPipe from '@config/pipe.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupExceptionHandling(app);
  setupCors(app);
  setUpPipe(app)
  // Serializer Response
  // app.useGlobalInterceptors(new SerializerInterceptor());
  setupSwagger(app);
  await app.listen(envConfig.PORT);
}

bootstrap();
