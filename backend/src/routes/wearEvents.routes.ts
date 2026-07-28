import { Router } from 'express';
import {
  createWearEvent,
  deleteWearEvent,
  getWearEventById,
  getWearEvents,
} from '../controllers/wearEvents.controller.js';
import { validate } from '../utils/validate.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createWearEventSchema } from '../schemas/wearEvent.schema.js';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validate(createWearEventSchema),
  createWearEvent,
);
router.get('/', authMiddleware, getWearEvents);
router.get('/:id', authMiddleware, getWearEventById);
router.delete('/:id', authMiddleware, deleteWearEvent);

export default router;
