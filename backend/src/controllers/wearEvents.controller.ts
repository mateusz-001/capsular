import type { Request, Response } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
} from '../services/wearEvents.service.js';
import { wearEventQuerySchema } from '../schemas/wearEvent.schema.js';
import { itemIdSchema } from '../schemas/universal.schema.js';

export const createWearEvent = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  const wearEvent = await create(userId, req.body);

  res.status(201).json({
    message: 'Wear event created successfully',
    data: wearEvent,
  });
};

export const getWearEvents = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const query = wearEventQuerySchema.parse(req.query);

  const wearEvents = await getAll(userId, query);

  res.status(200).json({
    data: wearEvents,
    pagination: {
      page: query.page,
      limit: query.limit,
      total: wearEvents.length,
      totalPages: Math.ceil(wearEvents.length / query.limit),
    },
  });
};

export const getWearEventById = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const wearEventId = itemIdSchema.parse(req.params.id);

  const wearEvent = await getById(userId, wearEventId);

  res.status(200).json({
    data: wearEvent,
  });
};

export const deleteWearEvent = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const wearEventId = itemIdSchema.parse(req.params.id);

  await remove(userId, wearEventId);

  res.sendStatus(204);
};
