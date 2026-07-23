import { prisma } from '../lib/prisma.js';
import type {
  CreateOutfitInput,
  CreateOutfitItemInput,
  OutfitsQuery,
  UpdateOutfitInput,
  UpdateOutfitItemInput,
} from '../schemas/outfits.schema.js';
import { removeUndefinedValuesFromPayload } from '../utils/removeUndefinedValuesFromPayload.js';
import { NotFoundError } from '../errors/NotFoundError.js';

interface CreateOutfitPayload {
  userId: string;
  data: CreateOutfitInput;
}

interface CreateOutfitItemPayload {
  outfitId: string;
  data: CreateOutfitItemInput;
}

interface UpdateOutfitPayload {
  userId: string;
  outfitId: string;
  itemId: string;
  data: UpdateOutfitInput;
}

interface UpdateOutfitItemPayload {
  outfitId: string;
  itemId: string;
  data: UpdateOutfitItemInput;
}

export const getAll = async (userId: string, query: OutfitsQuery) => {
  const where = {
    userId,
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

  const outfits = await prisma.outfit.findMany({
    where,
    orderBy,
    skip,
    take,
    include: {
      items: true,
    },
  });

  return outfits;
};

export const getById = async (userId: string, outfitId: string) => {
  const outfit = await prisma.outfit.findFirst({
    where: {
      id: outfitId,
      userId,
    },
    include: {
      items: true,
    },
  });

  if (!outfit) {
    throw new NotFoundError('Outfit not found');
  }

  return outfit;
};

export const create = async ({ userId, data }: CreateOutfitPayload) => {
  const payload = removeUndefinedValuesFromPayload({
    data,
  });

  return prisma.outfit.create({
    data: {
      userId,
      ...payload.data,
    } as unknown as Parameters<typeof prisma.outfit.create>[0]['data'],
  });
};

export const createItem = async ({
  outfitId,
  data,
}: CreateOutfitItemPayload) => {
  const outfit = await prisma.outfit.findUnique({
    where: {
      id: outfitId,
    },
  });

  if (!outfit) {
    throw new NotFoundError('Outfit not found');
  }

  const payload = removeUndefinedValuesFromPayload({
    data,
  });

  return prisma.outfitItem.create({
    data: {
      outfitId,
      ...payload.data,
    } as unknown as Parameters<typeof prisma.outfitItem.create>[0]['data'],
  });
};

export const remove = async (userId: string, outfitId: string) => {
  const outfit = await prisma.outfit.findFirst({
    where: {
      id: outfitId,
      userId,
    },
  });

  if (!outfit) {
    throw new NotFoundError('Outfit not found');
  }

  await prisma.outfit.delete({
    where: {
      id: outfitId,
      userId,
    },
  });
};

export const removeItem = async (outfitId: string, itemId: string) => {
  const outfitItem = await prisma.outfitItem.findFirst({
    where: {
      outfitId,
      id: itemId,
    },
  });

  if (!outfitItem) {
    throw new NotFoundError('Outfit item not found');
  }

  await prisma.outfitItem.delete({
    where: {
      id: outfitItem.id,
    },
  });
};

export const update = async ({
  userId,
  outfitId,
  data,
}: UpdateOutfitPayload) => {
  const updateData = removeUndefinedValuesFromPayload({ data });

  const result = await prisma.outfit.updateMany({
    where: {
      userId,
      id: outfitId,
    },
    data: updateData as Parameters<typeof prisma.outfit.updateMany>[0]['data'],
  });

  if (result.count === 0) {
    throw new NotFoundError('Outfit not found');
  }

  return result;
};

export const updateItem = async ({
  outfitId,
  itemId,
  data,
}: UpdateOutfitItemPayload) => {
  const updateData = removeUndefinedValuesFromPayload({ data });

  console.log('Updating outfit item with data:', updateData);
  const result = await prisma.outfitItem.updateMany({
    where: {
      outfitId,
      id: itemId,
    },
    data: { ...updateData.data } as Parameters<
      typeof prisma.outfitItem.updateMany
    >[0]['data'],
  });

  if (result.count === 0) {
    throw new NotFoundError('Outfit item not found');
  }

  return result;
};
