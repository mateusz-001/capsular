import { Router } from 'express';
import {
  createWardrobeItem,
  deleteWardrobeItem,
  getAllWardrobeItems,
  getSingleWardrobeItem,
  updateWardrobeItem,
  uploadWardrobeImage,
  deleteWardrobeImage,
  replaceWardrobeImage,
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
router.delete(
  '/:itemId/image/:imageId',
  authMiddleware,
  asyncHandler(deleteWardrobeImage),
);
router.put(
  '/:itemId/image/:imageId',
  authMiddleware,
  uploadMiddleware.single('image'),
  asyncHandler(replaceWardrobeImage),
);

export default router;
