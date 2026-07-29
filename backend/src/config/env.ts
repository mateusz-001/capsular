import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_ACCESS_EXPIRES_IN: z.coerce.number(),
  JWT_REFRESH_EXPIRES_IN: z.coerce.number(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors,
  );
  process.exit(1);
}

export const env = parsedEnv;
