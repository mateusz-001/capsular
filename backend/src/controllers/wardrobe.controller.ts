import type { Request, Response } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../services/wardrobe.service.js';
import { itemIdSchema } from '../schemas/universal.schema.js';
import { wardrobeQuerySchema } from '../schemas/wardrobe.schema.js';

export const createWardrobeItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.user;

  const wardrobeItem = await create({ userId, data: req.body });

  res.status(201).json({
    message: 'Wardrobe item created successfully',
    data: wardrobeItem,
  });
};

export const getAllWardrobeItems = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.user;
  const query = wardrobeQuerySchema.parse(req.query);

  const wardrobeItems = await getAll(userId, query);

  res.status(200).json({
    data: wardrobeItems,
    pagination: {
      page: query.page,
      limit: query.limit,
      total: wardrobeItems.total,
      totalPages: Math.ceil(wardrobeItems.total / query.limit),
    },
  });
};

export const getSingleWardrobeItem = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const itemId = itemIdSchema.parse(req.params.itemId);

  const wardrobeItem = await getById(userId, itemId);

  res.status(200).json({ data: wardrobeItem });
};

export const updateWardrobeItem = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);

  const updatedWardrobeItem = await update(userId, itemId, req.body);

  res.status(200).json({
    message: 'Wardrobe item updated successfully',
    data: updatedWardrobeItem,
  });
};

export const deleteWardrobeItem = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);

  await remove(userId, itemId);

  res.sendStatus(204);
};
