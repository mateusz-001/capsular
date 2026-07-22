import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { outfitSchema } from '../schemas/outfits.schema.js';
import { validate } from '../utils/validate.js';
import {
  createOutfit,
  deleteOutfit,
  updateOutfit,
  getOutfits,
  getOutfitById,
} from '../controllers/outfits.controller.js';

const router = Router();

router.get('/', authMiddleware, asyncHandler(getOutfits));
router.get('/:outfitId', authMiddleware, asyncHandler(getOutfitById));
router.post(
  '/',
  authMiddleware,
  validate(outfitSchema),
  asyncHandler(createOutfit),
);
router.delete('/:outfitId', authMiddleware, asyncHandler(deleteOutfit));
router.patch(
  '/:outfitId',
  authMiddleware,
  validate(outfitSchema.partial()),
  asyncHandler(updateOutfit),
);

export default router;
