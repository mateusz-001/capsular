import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  getAvailableColors,
  getAvailableMaterials,
} from '../controllers/universal.controller.js';

const router = Router();

router.get('/colors', authMiddleware, asyncHandler(getAvailableColors));
router.get('/materials', authMiddleware, asyncHandler(getAvailableMaterials));

export default router;
