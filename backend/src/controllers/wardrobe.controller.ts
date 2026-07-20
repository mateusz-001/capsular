import type { Request, Response } from 'express';
import { create } from '../services/wardrobe.service.js';
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
