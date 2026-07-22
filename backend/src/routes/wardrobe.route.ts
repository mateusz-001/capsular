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
  addWardrobeItemColor,
  addWardrobeItemMaterial,
  removeWardrobeItemColor,
  removeWardrobeItemMaterial,
  updateWardrobeItemMaterial,
} from '../controllers/wardrobe.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  wardrobeItemSchema,
  updateWardrobeItemSchema,
  addColorSchema,
  addMaterialSchema,
} from '../schemas/wardrobe.schema.js';
import { validate } from '../utils/validate.js';
import uploadMiddleware from '../middlewares/upload.middleware.js';

const router = Router();

router.get('/', authMiddleware, asyncHandler(getAllWardrobeItems));
router.post(
  '/',
  authMiddleware,
  validate(wardrobeItemSchema),
  asyncHandler(createWardrobeItem),
);

router.get('/:itemId', authMiddleware, asyncHandler(getSingleWardrobeItem));
router.delete('/:itemId', authMiddleware, asyncHandler(deleteWardrobeItem));
router.patch(
  '/:itemId',
  authMiddleware,
  validate(updateWardrobeItemSchema),
  asyncHandler(updateWardrobeItem),
);

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

router.post(
  '/:itemId/colors',
  authMiddleware,
  validate(addColorSchema),
  asyncHandler(addWardrobeItemColor),
);
router.delete(
  '/:itemId/colors/:colorId',
  authMiddleware,
  asyncHandler(removeWardrobeItemColor),
);
router.post(
  '/:itemId/materials',
  authMiddleware,
  validate(addMaterialSchema),
  asyncHandler(addWardrobeItemMaterial),
);
router.patch(
  '/:itemId/materials/:materialId',
  authMiddleware,
  validate(updateWardrobeItemSchema),
  asyncHandler(updateWardrobeItemMaterial),
);
router.delete(
  '/:itemId/materials/:materialId',
  authMiddleware,
  asyncHandler(removeWardrobeItemMaterial),
);

export default router;
