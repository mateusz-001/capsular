import type { Request, Response } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../services/wardrobe.service.js';
import {
  createWardrobeItemSchema,
  updateWardrobeItemSchema,
} from '../schemas/wardrobe.schema.js';
import { itemIdSchema } from '../schemas/universal.schema.js';

export const createWardrobeItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.user;
  const data = createWardrobeItemSchema.parse(req.body);

  const wardrobeItem = await create({ userId, data });

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
  const wardrobeItems = await getAll(userId);

  res.status(200).json({ data: wardrobeItems });
};

export const getSingleWardrobeItem = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);

  const wardrobeItem = await getById(userId, itemId);

  if (!wardrobeItem) {
    return res.status(404).json({ message: 'Wardrobe item not found' });
  }

  res.status(200).json({ data: wardrobeItem });
};

export const updateWardrobeItem = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);
  const data = updateWardrobeItemSchema.parse(req.body);

  const updatedWardrobeItem = await update(userId, itemId, data);

  if (updatedWardrobeItem.count === 0) {
    return res.status(404).json({ message: 'Wardrobe item not found' });
  }

  res
    .status(200)
    .json({
      message: 'Wardrobe item updated successfully',
      data: updatedWardrobeItem,
    });
};

export const deleteWardrobeItem = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);

  const deletedWardrobeItem = await remove(userId, itemId);

  if (deletedWardrobeItem.count === 0) {
    return res.status(404).json({ message: 'Wardrobe item not found' });
  }

  res.status(200).json({ message: 'Wardrobe item deleted successfully' });
};
