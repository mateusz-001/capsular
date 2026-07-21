import { NotFoundError } from '../errors/NotFoundError.js';
import { prisma } from '../lib/prisma.js';
import type {
  CreateWardrobeItemInput,
  UpdateWardrobeItemInput,
  WardrobeQuery,
} from '../schemas/wardrobe.schema.js';
import { removeUndefinedValuesFromPayload } from '../utils/removeUndefinedValuesFromPayload.js';
import { deleteImage } from './image.service.js';

interface CreateWardrobeItemPayload {
  userId: string;
  data: CreateWardrobeItemInput;
}

export const create = async ({ userId, data }: CreateWardrobeItemPayload) => {
  const payload = removeUndefinedValuesFromPayload({
    userId,
    ...data,
  });

  return prisma.wardrobeItem.create({
    data: payload as Parameters<typeof prisma.wardrobeItem.create>[0]['data'],
  });
};

export const getAll = async (userId: string, query: WardrobeQuery) => {
  const where = {
    userId,
    archivedAt: null,

    ...(query.category && {
      category: query.category,
    }),

    ...(query.brand && {
      brand: query.brand,
    }),

    ...(query.search && {
      name: {
        contains: query.search,
        mode: 'insensitive' as const,
      },
    }),
  };

  const orderBy = {
    [query.sortBy]: query.order,
  };

  const skip = (query.page - 1) * query.limit;
  const take = query.limit;

  const [items, total] = await prisma.$transaction([
    prisma.wardrobeItem.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        images: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    }),
    prisma.wardrobeItem.count({ where }),
  ]);

  return { items, total };
};

export const getById = async (userId: string, itemId: string) => {
  const item = await prisma.wardrobeItem.findFirst({
    where: {
      userId,
      id: itemId,
      archivedAt: null,
    },
    include: {
      images: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!item) {
    throw new NotFoundError('Wardrobe item not found');
  }

  return item;
};

export const update = async (
  userId: string,
  itemId: string,
  data: Partial<UpdateWardrobeItemInput>,
) => {
  const updateData = removeUndefinedValuesFromPayload(data);

  const result = await prisma.wardrobeItem.updateMany({
    where: {
      userId,
      id: itemId,
    },
    data: updateData as Parameters<
      typeof prisma.wardrobeItem.updateMany
    >[0]['data'],
  });

  if (result.count === 0) {
    throw new NotFoundError('Wardrobe item not found');
  }

  return result;
};

export const remove = async (userId: string, itemId: string) => {
  const wardrobeItem = await prisma.wardrobeItem.findFirst({
    where: {
      userId,
      id: itemId,
      archivedAt: null,
    },
    include: {
      images: true,
    },
  });

  if (!wardrobeItem) {
    throw new NotFoundError('Wardrobe item not found');
  }

  for (const image of wardrobeItem.images) {
    await deleteImage({
      itemId,
      userId,
      imageId: image.id,
    });
  }

  const result = await prisma.wardrobeItem.updateMany({
    where: {
      userId,
      id: itemId,
    },
    data: {
      archivedAt: new Date(),
    },
  });

  return result;
};

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
