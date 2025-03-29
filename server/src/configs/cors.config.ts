import { INestApplication } from '@nestjs/common';
import envConfig from 'src/configs/env.config';

export default function setupCors(app: INestApplication<any>) {
  app.enableCors({
    origin: envConfig.ORIGIN_ALLOWED, // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });
}
