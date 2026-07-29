import { Router } from 'express';
import {
  getActiveSessions,
  login,
  me,
  refresh,
  register,
  logoutUser,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/register', asyncHandler(register));
router.get('/me', authMiddleware, asyncHandler(me));
router.get('/sessions', authMiddleware, asyncHandler(getActiveSessions));
router.post('/login', asyncHandler(login));
router.post('/refresh', asyncHandler(refresh));
router.post('/logout', authMiddleware, asyncHandler(logoutUser));

export default router;
