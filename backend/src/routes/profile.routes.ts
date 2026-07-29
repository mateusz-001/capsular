import { Router } from 'express';
import { getProfile } from '../services/profile.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  createProfile,
  getProfileCompletionRate,
  getProfileInfo,
  updateProfileInfo,
} from '../controllers/profile.controller.js';
import { validate } from '../utils/validate.js';
import { profileSchema } from '../schemas/profile.schema.js';

const router = Router();

router.get('/', authMiddleware, asyncHandler(getProfileInfo));
router.get(
  '/completion',
  authMiddleware,
  asyncHandler(getProfileCompletionRate),
);
router.post(
  '/',
  authMiddleware,
  validate(profileSchema),
  asyncHandler(createProfile),
);
router.patch(
  '/',
  authMiddleware,
  validate(profileSchema.partial()),
  asyncHandler(updateProfileInfo),
);

export default router;
