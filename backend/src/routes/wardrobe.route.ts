import { Router } from 'express';
import {
  createWardrobeItem,
  deleteWardrobeItem,
  getAllWardrobeItems,
  getSingleWardrobeItem,
  updateWardrobeItem,
} from '../controllers/wardrobe.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createWardrobeItem);
router.get('/', authMiddleware, getAllWardrobeItems);
router.get('/:itemId', authMiddleware, getSingleWardrobeItem);
router.delete('/:itemId', authMiddleware, deleteWardrobeItem);
router.patch('/:itemId', authMiddleware, updateWardrobeItem);

export default router;
