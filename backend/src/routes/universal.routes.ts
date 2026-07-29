import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  addTag,
  deleteTag,
  getAvailableColors,
  getAvailableMaterials,
  getAvailableProfileOptions,
  getAvailableTags,
  updateTag,
} from '../controllers/universal.controller.js';

const router = Router();

router.get('/colors', authMiddleware, asyncHandler(getAvailableColors));
router.get('/materials', authMiddleware, asyncHandler(getAvailableMaterials));
router.get(
  '/profile-options',
  authMiddleware,
  asyncHandler(getAvailableProfileOptions),
);
router.get('/tags', authMiddleware, asyncHandler(getAvailableTags));
router.post('/tags', authMiddleware, asyncHandler(addTag));
router.delete('/tags/:tagId', authMiddleware, asyncHandler(deleteTag));
router.patch('/tags/:tagId', authMiddleware, asyncHandler(updateTag));

export default router;
