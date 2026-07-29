import type { Request, Response } from 'express';

import {
  create,
  deleteEntry,
  getAll,
  getById,
  updateEntry,
} from '../services/calendar.service.js';
import { calendarQuerySchema } from '../schemas/calendar.schema.js';
import { itemIdSchema } from '../schemas/universal.schema.js';

export const createCalendarEntry = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const data = req.body;

  const entry = await create({ userId, data });

  res
    .status(201)
    .json({ message: 'Calendar entry created successfully', data: entry });
};

export const getCalendarEntries = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const query = calendarQuerySchema.parse(req.query);

  const entries = await getAll(userId, query);

  res.status(200).json({ data: entries });
};

export const getCalendarEntryById = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const entryId = itemIdSchema.parse(req.params.entryId);

  const entry = await getById(userId, entryId);

  res.status(200).json({ data: entry });
};

export const updateCalendarEntry = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const entryId = itemIdSchema.parse(req.params.entryId);
  const data = req.body;

  const updatedEntry = await updateEntry({ userId, entryId, data });

  res.status(200).json({
    message: 'Calendar entry updated successfully',
    data: updatedEntry,
  });
};

export const deleteCalendarEntry = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const entryId = itemIdSchema.parse(req.params.entryId);

  await deleteEntry(userId, entryId);

  res.sendStatus(204);
};
