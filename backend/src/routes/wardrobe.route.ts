import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { createWardrobeItem } from '../controllers/wardrobe.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createWardrobeItem);

export default router;
