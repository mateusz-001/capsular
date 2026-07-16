import express from 'express';
import { prisma } from './lib/prisma.js';

const app = express();

app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: 'ok',
      service: 'capsular-backend',
      database: 'connected',
      users: await prisma.user.count(),
    });
  } catch (error) {
    console.error('Error in /health route:', error);

    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      database: 'disconnected',
    });
  }
});

export default app;
