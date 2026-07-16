import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

export default router.get('/', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      service: 'capsular-backend',
      database: 'connected',
      users: await prisma.user.count(),
    });
  } catch (error) {
    console.error('Error in /api/health route:', error);

    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      database: 'disconnected',
    });
  }
});
