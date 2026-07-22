import { prisma } from '../lib/prisma.js';
import type {
  CreateOutfitInput,
  OutfitsQuery,
  UpdateOutfitInput,
} from '../schemas/outfits.schema.js';
import { removeUndefinedValuesFromPayload } from '../utils/removeUndefinedValuesFromPayload.js';
import { NotFoundError } from '../errors/NotFoundError.js';

interface CreateOutfitPayload {
  userId: string;
  data: CreateOutfitInput;
}

interface UpdateOutfitPayload {
  userId: string;
  outfitId: string;
  data: UpdateOutfitInput;
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
  });

  return outfits;
};

export const getById = async (userId: string, outfitId: string) => {
  const outfit = await prisma.outfit.findFirst({
    where: {
      id: outfitId,
      userId,
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
