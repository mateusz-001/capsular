import type { Request, Response } from 'express';
import {
  createTag,
  editTag,
  getColors,
  getMaterials,
  getTags,
  removeTag,
} from '../services/universal.service.js';
import { itemIdSchema } from '../schemas/universal.schema.js';

export const getAvailableColors = async (_req: Request, res: Response) => {
  const colors = await getColors();

  res.status(200).json({ data: colors });
};

export const getAvailableMaterials = async (_req: Request, res: Response) => {
  const materials = await getMaterials();

  res.status(200).json({ data: materials });
};

export const getAvailableTags = async (_req: Request, res: Response) => {
  const tags = await getTags();

  res.status(200).json({ data: tags });
};

export const addTag = async (req: Request, res: Response) => {
  const { name } = req.body;
  const userId = req.user.userId;

  const tag = await createTag({ userId, name });

  res.status(200).json({ message: 'Tag created successfully', data: tag });
};

export const deleteTag = async (req: Request, res: Response) => {
  const tagId = itemIdSchema.parse(req.params.tagId);
  const userId = req.user.userId;

  await removeTag(userId, tagId);

  res.sendStatus(204);
};

export const updateTag = async (req: Request, res: Response) => {
  const tagId = itemIdSchema.parse(req.params.tagId);
  const userId = req.user.userId;
  const { name } = req.body;

  const updatedTag = await editTag({ userId, tagId, name });

  res
    .status(200)
    .json({ message: 'Tag updated successfully', data: updatedTag });
};
