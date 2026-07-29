import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  createCalendarEntry,
  deleteCalendarEntry,
  getCalendarEntries,
  getCalendarEntryById,
  updateCalendarEntry,
} from '../controllers/calendar.controller.js';
import { createCalendarEntrySchema } from '../schemas/calendar.schema.js';
import { validate } from '../utils/validate.js';

const router = Router();

router.get('/', authMiddleware, asyncHandler(getCalendarEntries));
router.get('/:entryId', authMiddleware, asyncHandler(getCalendarEntryById));
router.post(
  '/',
  authMiddleware,
  validate(createCalendarEntrySchema),
  asyncHandler(createCalendarEntry),
);
router.patch(
  '/:entryId',
  authMiddleware,
  validate(createCalendarEntrySchema.partial()),
  asyncHandler(updateCalendarEntry),
);
router.delete('/:entryId', authMiddleware, asyncHandler(deleteCalendarEntry));

export default router;
