import type { Request, Response } from 'express';
import {
  create,
  getAll,
  getById,
  remove,
  update,
} from '../services/outfits.service.js';
import { itemIdSchema } from '../schemas/universal.schema.js';
import { outfitsQuerySchema } from '../schemas/outfits.schema.js';

export const createOutfit = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const result = await create({ userId, data: req.body });

  res.status(201).json({
    message: 'Outfit created successfully',
    data: result,
  });
};

export const getOutfits = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const query = outfitsQuerySchema.parse(req.query);

  const outfits = await getAll(userId, query);

  res.status(200).json({
    data: outfits,
    pagination: {
      page: query.page,
      limit: query.limit,
      total: outfits.length,
      totalPages: Math.ceil(outfits.length / query.limit),
    },
  });
};

export const getOutfitById = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const outfitId = itemIdSchema.parse(req.params.outfitId);

  const outfit = await getById(userId, outfitId);

  res.status(200).json({ data: outfit });
};

export const deleteOutfit = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const outfitId = itemIdSchema.parse(req.params.outfitId);

  await remove(userId, outfitId);

  res.sendStatus(204);
};

export const updateOutfit = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const outfitId = itemIdSchema.parse(req.params.outfitId);

  const updatedOutfit = await update({ userId, outfitId, data: req.body });

  res.status(200).json({
    message: 'Outfit updated successfully',
    data: updatedOutfit,
  });
};
