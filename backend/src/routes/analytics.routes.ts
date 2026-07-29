import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getDashboardAnalytics } from '../controllers/analytics.controller.js';

const router = Router();

router.get('/dashboard', authMiddleware, getDashboardAnalytics);

export default router;
