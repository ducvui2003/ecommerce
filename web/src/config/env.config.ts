import { z } from 'zod';

const configSchema = z.object({
  NEXT_PUBLIC_SERVER_URL: z.string(),
  NEXT_PUBLIC_AUTH_SECRET: z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: z.string(),
  NEXT_PUBLIC_FACEBOOK_CLIENT_ID: z.string(),
  NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_AUTH_SECRET: process.env.NEXT_PUBLIC_AUTH_SECRET,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  NEXT_PUBLIC_FACEBOOK_CLIENT_ID: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
  NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET:
    process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
});

if (!configProject.success) {
  console.log(configProject.error.issues);
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ');
}

const envConfig = configProject.data;
export default envConfig;
