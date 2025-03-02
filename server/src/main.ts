import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import setupCors from 'src/configs/cors.config';
import setupSwagger from 'src/configs/swagger.config';
import { SerializerInterceptor } from '@shared/interceptors/serializer.interceptor';
import envConfig from '@config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupCors(app);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     transformOptions: { enableImplicitConversion: true },
  //     exceptionFactory: (errors: ValidationError[]) => {
  //       return new UnprocessableEntityException(
  //         errors.map((error) => ({
  //           field: error.property,
  //           error: Object.values(
  //             error.constraints as Record<string, string>,
  //           ).join(', '),
  //         })),
  //       );
  //     },
  //   }),
  // );

  app.useGlobalInterceptors(new SerializerInterceptor(new Reflector()));

  setupSwagger(app);
  await app.listen(envConfig.PORT);
}
bootstrap();
