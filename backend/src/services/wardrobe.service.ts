import { prisma } from '../lib/prisma.js';
import type {
  CreateWardrobeItemInput,
  UpdateWardrobeItemInput,
} from '../schemas/wardrobe.schema.js';

interface CreateWardrobeItemPayload {
  userId: string;
  data: CreateWardrobeItemInput;
}

export const create = async ({ userId, data }: CreateWardrobeItemPayload) => {
  return prisma.wardrobeItem.create({
    data: {
      userId,
      name: data.name,
      category: data.category,
      description: data.description ?? null,
      size: data.size ?? null,
      brand: data.brand ?? null,
    },
  });
};

export const getAll = async (userId: string) => {
  return prisma.wardrobeItem.findMany({
    where: { userId, archivedAt: null },
  });
};

export const getById = async (userId: string, itemId: string) => {
  return prisma.wardrobeItem.findFirst({
    where: {
      userId,
      id: itemId,
      archivedAt: null,
    },
  });
};

export const update = async (
  userId: string,
  itemId: string,
  data: Partial<UpdateWardrobeItemInput>,
) => {
  const updateData = {
    ...(data.name !== undefined ? { name: data.name } : {}),
    ...(data.category !== undefined ? { category: data.category } : {}),
    ...(data.description !== undefined
      ? { description: data.description }
      : {}),
    ...(data.size !== undefined ? { size: data.size } : {}),
    ...(data.brand !== undefined ? { brand: data.brand } : {}),
  };

  return prisma.wardrobeItem.updateMany({
    where: {
      userId,
      id: itemId,
    },
    data: updateData,
  });
};

export const remove = async (userId: string, itemId: string) => {
  return prisma.wardrobeItem.updateMany({
    where: {
      userId,
      id: itemId,
    },
    data: {
      archivedAt: new Date(),
    },
  });
};
