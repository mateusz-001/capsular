import { Router } from 'express';
import {
  createWardrobeItem,
  deleteWardrobeItem,
  getAllWardrobeItems,
  getSingleWardrobeItem,
  updateWardrobeItem,
} from '../controllers/wardrobe.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  createWardrobeItemSchema,
  updateWardrobeItemSchema,
} from '../schemas/wardrobe.schema.js';
import { validate } from '../utils/validate.js';

const router = Router();

router.get('/', authMiddleware, asyncHandler(getAllWardrobeItems));
router.get('/:itemId', authMiddleware, asyncHandler(getSingleWardrobeItem));
router.delete('/:itemId', authMiddleware, asyncHandler(deleteWardrobeItem));
router.patch(
  '/:itemId',
  authMiddleware,
  validate(updateWardrobeItemSchema),
  asyncHandler(updateWardrobeItem),
);
router.post(
  '/',
  authMiddleware,
  validate(createWardrobeItemSchema),
  asyncHandler(createWardrobeItem),
);

export default router;
