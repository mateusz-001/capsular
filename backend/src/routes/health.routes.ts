import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

export default router.get(
  '/',
  asyncHandler(async (_req, res) => {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      service: 'capsular-backend',
      database: 'connected',
      users: await prisma.user.count(),
    });
  }),
);
