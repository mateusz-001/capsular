import { Router } from 'express';
import {
  createWardrobeItem,
  getAllWardrobeItems,
  getSingleWardrobeItem,
} from '../controllers/wardrobe.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createWardrobeItem);
router.get('/', authMiddleware, getAllWardrobeItems);
router.get('/:itemId', authMiddleware, getSingleWardrobeItem);

export default router;
