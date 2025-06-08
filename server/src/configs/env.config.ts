import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

if (process.env.NODE_ENV !== 'production') {
  config({
    path: '.env',
  });

  if (!fs.existsSync(path.resolve('.env'))) {
    console.error('No .env file found in the root directory');
    process.exit(1);
  }
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

  REDIS_URL: z.string(),

  EMAIL_URL: z.string(),

  ADDRESS_ACCESS_TOKEN: z.string(),
  ADDRESS_APP_ID: z.string(),
  ADDRESS_BUSINESS_ID: z.string(),

  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),

  PAYMENT_API_KEY: z.string(),

  VNPAY_PAY_URL: z.string(),
  VNPAY_PAY_RETURN_URL: z.string(),
  VNPAY_TNN_CODE: z.string(),
  VNPAY_HASH_SECRET: z.string(),
  VNPAY_API_URL: z.string(),

  SEPAY_BANK: z.string(),
  SEPAY_ACCOUNT_NUMBER: z.string(),

  LOG_PRISMA_SQL: z.coerce.boolean().optional().default(false),
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
