import { NotFoundError } from '../errors/NotFoundError.js';
import type { WardrobeItemColor } from '../generated/prisma/client.js';
import { prisma } from '../lib/prisma.js';
import type {
  AddWardrobeItemColorInput,
  AddWardrobeItemMaterialInput,
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

interface AddWardrobeItemColorPayload {
  userId: string;
  itemId: string;
  data: AddWardrobeItemColorInput;
}

interface AddWardrobeItemMaterialPayload {
  userId: string;
  itemId: string;
  data: AddWardrobeItemMaterialInput;
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
        colors: {
          include: {
            color: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
        materials: {
          include: {
            material: true,
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
      colors: {
        include: {
          color: true,
        },
        orderBy: {
          position: 'asc',
        },
      },
      materials: {
        include: {
          material: true,
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

export const addColor = async ({
  userId,
  itemId,
  data,
}: AddWardrobeItemColorPayload): Promise<WardrobeItemColor> => {
  const matchingWardrobeItem = await prisma.wardrobeItem.findFirst({
    where: {
      userId,
      id: itemId,
      archivedAt: null,
    },
  });

  if (!matchingWardrobeItem) {
    throw new NotFoundError('Wardrobe item not found');
  }

  const color = await prisma.color.findUnique({
    where: {
      id: data.colorId,
    },
  });

  if (!color) {
    throw new NotFoundError('Color not found');
  }

  const position = await prisma.wardrobeItemColor.count({
    where: {
      wardrobeItemId: itemId,
    },
  });

  return prisma.wardrobeItemColor.create({
    data: {
      wardrobeItemId: itemId,
      colorId: data.colorId,
      role: data.role,
      position,
    },
    include: {
      color: true,
    },
  });
};

export const deleteColor = async (
  userId: string,
  itemId: string,
  colorId: string,
) => {
  const matchingWardrobeItem = await prisma.wardrobeItem.findFirst({
    where: {
      userId,
      id: itemId,
      archivedAt: null,
    },
  });

  if (!matchingWardrobeItem) {
    throw new NotFoundError('Wardrobe item not found');
  }

  const matchingWardrobeItemColor = await prisma.wardrobeItemColor.findFirst({
    where: {
      wardrobeItemId: itemId,
      colorId,
    },
  });

  if (!matchingWardrobeItemColor) {
    throw new NotFoundError('Wardrobe item color not found');
  }

  const result = await prisma.wardrobeItemColor.deleteMany({
    where: {
      wardrobeItemId: itemId,
      colorId,
    },
  });

  return result;
};

export const addMaterial = async ({
  userId,
  itemId,
  data,
}: AddWardrobeItemMaterialPayload) => {
  const matchingWardrobeItem = await prisma.wardrobeItem.findFirst({
    where: {
      userId,
      id: itemId,
      archivedAt: null,
    },
  });

  if (!matchingWardrobeItem) {
    throw new NotFoundError('Wardrobe item not found');
  }

  const material = await prisma.material.findUnique({
    where: {
      id: data.materialId,
    },
  });

  if (!material) {
    throw new NotFoundError('Material not found');
  }

  return prisma.wardrobeItemMaterial.create({
    data: removeUndefinedValuesFromPayload({
      wardrobeItemId: itemId,
      ...data,
    }) as Parameters<typeof prisma.wardrobeItemMaterial.create>[0]['data'],
    include: {
      material: true,
    },
  });
};

export const updateMaterial = async (
  userId: string,
  itemId: string,
  materialId: string,
  data: Partial<AddWardrobeItemMaterialInput>,
) => {
  const matchingWardrobeItem = await prisma.wardrobeItem.findFirst({
    where: {
      userId,
      id: itemId,
      archivedAt: null,
    },
  });

  if (!matchingWardrobeItem) {
    throw new NotFoundError('Wardrobe item not found');
  }

  const matchingWardrobeItemMaterial =
    await prisma.wardrobeItemMaterial.findFirst({
      where: {
        wardrobeItemId: itemId,
        materialId,
      },
    });

  if (!matchingWardrobeItemMaterial) {
    throw new NotFoundError('Wardrobe item material not found');
  }

  const result = await prisma.wardrobeItemMaterial.updateMany({
    where: {
      wardrobeItemId: itemId,
      materialId,
    },
    data: removeUndefinedValuesFromPayload(data) as Parameters<
      typeof prisma.wardrobeItemMaterial.updateMany
    >[0]['data'],
  });

  return result;
};

export const deleteMaterial = async (
  userId: string,
  itemId: string,
  materialId: string,
) => {
  const matchingWardrobeItem = await prisma.wardrobeItem.findFirst({
    where: {
      userId,
      id: itemId,
      archivedAt: null,
    },
  });

  if (!matchingWardrobeItem) {
    throw new NotFoundError('Wardrobe item not found');
  }

  const matchingWardrobeItemMaterial =
    await prisma.wardrobeItemMaterial.findFirst({
      where: {
        wardrobeItemId: itemId,
        materialId,
      },
    });

  if (!matchingWardrobeItemMaterial) {
    throw new NotFoundError('Wardrobe item material not found');
  }

  const result = await prisma.wardrobeItemMaterial.deleteMany({
    where: {
      wardrobeItemId: itemId,
      materialId,
    },
  });

  return result;
};
