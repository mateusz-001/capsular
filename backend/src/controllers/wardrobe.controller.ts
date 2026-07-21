import type { Request, Response } from 'express';
import {
  create,
  getAll,
  getById,
  getColors,
  getMaterials,
  remove,
  update,
} from '../services/wardrobe.service.js';
import { itemIdSchema } from '../schemas/universal.schema.js';
import { wardrobeQuerySchema } from '../schemas/wardrobe.schema.js';
import { deleteImage, uploadImage } from '../services/image.service.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

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

  const result = await remove(userId, itemId);

  if (result.count === 0) {
    throw new NotFoundError('Wardrobe item not found');
  }

  res.sendStatus(204);
};

export const uploadWardrobeImage = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);
  const file = req.file;

  if (!file) {
    throw new BadRequestError('Image file is required');
  }

  const image = await uploadImage({
    itemId,
    userId,
    file,
  });

  res.status(200).json({
    message: 'Image uploaded successfully',
    data: image,
  });
};

export const deleteWardrobeImage = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);
  const imageId = itemIdSchema.parse(req.params.imageId);

  const image = await deleteImage({
    itemId,
    userId,
    imageId,
  });

  res.status(200).json({
    message: 'Image deleted successfully',
    data: image,
  });
};

export const replaceWardrobeImage = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);
  const imageId = itemIdSchema.parse(req.params.imageId);
  const file = req.file;

  if (!file) {
    throw new BadRequestError('Image file is required');
  }

  const deletedImage = await deleteImage({
    itemId,
    userId,
    imageId,
  });

  const uploadedImage = await uploadImage({
    itemId,
    userId,
    file,
  });

  res.status(200).json({
    message: 'Image replaced successfully',
    data: {
      deletedImage,
      uploadedImage,
    },
  });
};

export const getAvailableColors = async (_req: Request, res: Response) => {
  console.log('COLORS ENDPOINT HIT');

  const colors = await getColors();

  res.status(200).json({ data: colors });
};

export const getAvailableMaterials = async (_req: Request, res: Response) => {
  const materials = await getMaterials();

  res.status(200).json({ data: materials });
};
