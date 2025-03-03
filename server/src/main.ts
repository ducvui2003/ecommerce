import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import setupCors from 'src/configs/cors.config';
import setupSwagger from 'src/configs/swagger.config';
import { SerializerInterceptor } from '@shared/interceptors/serializer.interceptor';
import envConfig from '@config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupCors(app);

  app.useGlobalInterceptors(new SerializerInterceptor(new Reflector()));

  setupSwagger(app);
  await app.listen(envConfig.PORT);
}
bootstrap();
