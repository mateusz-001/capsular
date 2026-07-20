import type { Request, Response } from 'express';
import { create, getAll, getById } from '../services/wardrobe.service.js';
import { createWardrobeItemSchema } from '../schemas/wardrobe.schema.js';

export const createWardrobeItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.user;
  const data = createWardrobeItemSchema.parse(req.body);

  console.log('Creating wardrobe item with data:', data);

  await create({ userId, data });

  res.status(201).json({
    message: 'Wardrobe item created successfully',
    data,
  });
};

export const getAllWardrobeItems = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.user;
  const wardrobeItems = await getAll(userId);
  console.log('Retrieved wardrobe items:', wardrobeItems);

  res.status(201).json({ data: wardrobeItems });
};

export const getSingleWardrobeItem = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { itemId } = req.params;

  if (!itemId) {
    return res.status(400).json({ message: 'Item ID is required' });
  }

  if (typeof itemId !== 'string') {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  const wardrobeItem = await getById(userId, itemId);

  if (!wardrobeItem) {
    return res.status(404).json({ message: 'Wardrobe item not found' });
  }

  res.status(200).json({ data: wardrobeItem });
};
