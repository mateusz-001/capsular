import { Router } from 'express';
import {
  createWardrobeItem,
  deleteWardrobeItem,
  getAllWardrobeItems,
  getSingleWardrobeItem,
  updateWardrobeItem,
  uploadWardrobeImage,
} from '../controllers/wardrobe.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  wardrobeItemSchema,
  updateWardrobeItemSchema,
} from '../schemas/wardrobe.schema.js';
import { validate } from '../utils/validate.js';
import uploadMiddleware from '../middlewares/upload.middleware.js';

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
  validate(wardrobeItemSchema),
  asyncHandler(createWardrobeItem),
);

// CLOUDINARY IMAGE UPLOAD

router.post(
  '/:itemId/image',
  authMiddleware,
  uploadMiddleware.single('image'),
  asyncHandler(uploadWardrobeImage),
);

export default router;
