import { prisma } from '../lib/prisma.js';
import type { CreateWardrobeItemInput } from '../schemas/wardrobe.schema.js';

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
    where: { userId },
  });
};

export const getById = async (userId: string, itemId: string) => {
  return prisma.wardrobeItem.findFirst({
    where: {
      userId,
      id: itemId,
    },
  });
};
