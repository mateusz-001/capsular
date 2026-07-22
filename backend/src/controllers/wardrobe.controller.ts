import type { Request, Response } from 'express';
import {
  addColor,
  addMaterial,
  create,
  deleteColor,
  deleteMaterial,
  getAll,
  getById,
  remove,
  update,
  updateMaterial,
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

  await deleteImage({
    itemId,
    userId,
    imageId,
  });

  res.sendStatus(204);
};

export const replaceWardrobeImage = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);
  const imageId = itemIdSchema.parse(req.params.imageId);
  const file = req.file;

  if (!file) {
    throw new BadRequestError('Image file is required');
  }

  await deleteImage({
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
      uploadedImage,
    },
  });
};

export const addWardrobeItemColor = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);

  const addedColor = await addColor({
    userId,
    itemId,
    data: req.body,
  });

  res.status(200).json({
    message: 'Color added to wardrobe item successfully',
    data: addedColor,
  });
};

export const removeWardrobeItemColor = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);
  const colorId = itemIdSchema.parse(req.params.colorId);

  await deleteColor(userId, itemId, colorId);

  res.sendStatus(204);
};

export const addWardrobeItemMaterial = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);

  const addedMaterial = await addMaterial({
    userId,
    itemId,
    data: req.body,
  });

  res.status(200).json({
    message: 'Material added to wardrobe item successfully',
    data: addedMaterial,
  });
};

export const updateWardrobeItemMaterial = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);
  const materialId = itemIdSchema.parse(req.params.materialId);

  const updatedMaterial = await updateMaterial(
    userId,
    itemId,
    materialId,
    req.body,
  );

  res.status(200).json({
    message: 'Material updated successfully',
    data: updatedMaterial,
  });
};

export const removeWardrobeItemMaterial = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.user;
  const itemId = itemIdSchema.parse(req.params.itemId);
  const materialId = itemIdSchema.parse(req.params.materialId);

  await deleteMaterial(userId, itemId, materialId);

  res.sendStatus(204);
};
