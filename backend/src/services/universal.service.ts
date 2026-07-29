import { NotFoundError } from '../errors/NotFoundError.js';
import { prisma } from '../lib/prisma.js';
import {
  UnitSystem,
  BodyType,
  StylePreference,
  Occasion,
  ShoppingFrequency,
  PriceSensitivity,
  WardrobeGoal,
  CapsuleStatus,
} from '../generated/prisma/enums.js';

interface CreateTagPayload {
  userId: string;
  name: string;
}

interface EditTagPayload {
  userId: string;
  tagId: string;
  name: string;
}

export const getColors = async () => {
  const colors = await prisma.color.findMany();

  if (!colors || colors.length === 0) {
    return [];
  }

  return colors;
};

export const getMaterials = async () => {
  const materials = await prisma.material.findMany();

  if (!materials || materials.length === 0) {
    return [];
  }

  return materials;
};

export const getProfileOptions = async () => {
  return {
    unitSystems: Object.values(UnitSystem),
    bodyTypes: Object.values(BodyType),
    stylePreferences: Object.values(StylePreference),
    occasions: Object.values(Occasion),
    shoppingFrequencies: Object.values(ShoppingFrequency),
    priceSensitivities: Object.values(PriceSensitivity),
    wardrobeGoals: Object.values(WardrobeGoal),
    capsuleStatuses: Object.values(CapsuleStatus),
  };
};

export const getTags = async () => {
  const tags = await prisma.tag.findMany();

  if (!tags || tags.length === 0) {
    return [];
  }

  return tags;
};

export const createTag = async ({ name, userId }: CreateTagPayload) => {
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  const tag = await prisma.tag.create({
    data: {
      userId,
      name,
      slug,
    },
  });

  return tag;
};

export const removeTag = async (userId: string, tagId: string) => {
  const tag = await prisma.tag.findFirst({
    where: {
      id: tagId,
      userId,
    },
  });

  if (!tag) {
    throw new NotFoundError('Tag not found');
  }

  return prisma.tag.delete({
    where: {
      id: tagId,
    },
  });
};

export const editTag = async ({ userId, tagId, name }: EditTagPayload) => {
  const tag = await prisma.tag.findFirst({
    where: {
      id: tagId,
      userId,
    },
  });

  if (!tag) {
    throw new NotFoundError('Tag not found');
  }

  const slug = name.toLowerCase().replace(/\s+/g, '-');

  const result = await prisma.tag.update({
    where: {
      id: tagId,
    },
    data: {
      name,
      slug,
    },
  });

  return result;
};
