import type { Request, Response } from 'express';
import { getColors, getMaterials } from '../services/universal.service.js';

export const getAvailableColors = async (_req: Request, res: Response) => {
  const colors = await getColors();

  res.status(200).json({ data: colors });
};

export const getAvailableMaterials = async (_req: Request, res: Response) => {
  const materials = await getMaterials();

  res.status(200).json({ data: materials });
};
