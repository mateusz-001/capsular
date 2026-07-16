import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
import { env } from '../config/env.js';

const adapter = new PrismaPg({
  connectionString: env.data.DATABASE_URL,
});

console.log(
  'Prisma adapter initialized with connection string:',
  env.data.DATABASE_URL,
);

export const prisma = new PrismaClient({
  adapter,
});
