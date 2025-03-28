import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

config({
  path: '.env',
});

if (!fs.existsSync(path.resolve('.env'))) {
  console.error('No .env file found in the root directory');
  process.exit(1);
}

const envSchema = z.object({
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRY: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRY: z.string(),
  SECRET_KEY: z.string(),
  ORIGIN_ALLOWED: z.string().transform((value) => value.split(',')),
  OTP_EXPIRY: z.string(),

  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string().transform(Number),
  EMAIL_USER: z.string().email(),
  EMAIL_PASSWORD: z.string(),

  REDIS_URL: z.string(),
  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string().optional(),
});

const configServer = envSchema.safeParse(process.env);

if (!configServer.success) {
  console.error('Env has conflict');
  const errors = configServer.error.errors.map((error) => {
    console.error(error);
    return {
      property: error.path.join('.'),
      constraints: error['expected'],
      code: error.code,
    };
  });
  throw errors;
}

const envConfig = configServer.data;
export default envConfig;
