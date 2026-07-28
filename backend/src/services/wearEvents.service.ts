import { NotFoundError } from '../errors/NotFoundError.js';
import { WearSource } from '../generated/prisma/enums.js';
import { prisma } from '../lib/prisma.js';
import type {
  WearEventQuery,
  WearEventInput,
} from '../schemas/wearEvent.schema.js';

export const create = async (userId: string, data: WearEventInput) => {
  return prisma.$transaction(async (tx) => {
    const outfit = await tx.outfit.findFirst({
      where: {
        id: data.outfitId,
        userId,
      },
      include: {
        items: {
          include: {
            wardrobeItem: true,
          },
        },
      },
    });

    if (!outfit) {
      throw new NotFoundError('Outfit not found');
    }

    const wearEvent = await tx.wearEvent.create({
      data: {
        userId,
        outfitId: outfit.id,
        wornAt: data.wornAt ?? new Date(),
        source: data.source ?? WearSource.MANUAL,
        note: data.note ?? null,
        calendarEntryId: data.calendarEntryId ?? null,
      },
    });

    await tx.wearEventItem.createMany({
      data: outfit.items.map((item) => ({
        wearEventId: wearEvent.id,
        wardrobeItemId: item.wardrobeItemId,
        slotSnapshot: item.slot,
        layerOrderSnapshot: item.layerOrder,
        itemNameSnapshot: item.wardrobeItem.name,
        categorySnapshot: item.wardrobeItem.category,
      })),
    });

    await Promise.all(
      outfit.items.map((item) =>
        tx.wardrobeItem.update({
          where: {
            id: item.wardrobeItemId,
          },
          data: {
            wearCount: {
              increment: 1,
            },
            lastWorn: wearEvent.wornAt,
          },
        }),
      ),
    );

    return tx.wearEvent.findUnique({
      where: {
        id: wearEvent.id,
      },
      include: {
        items: true,
        outfit: true,
      },
    });
  });
};

export const getAll = async (userId: string, query: WearEventQuery) => {
  const where = {
    outfit: {
      userId,
    },
    ...(query.from && {
      wornAt: {
        gte: query.from,
      },
    }),
    ...(query.to && {
      wornAt: {
        lte: query.to,
      },
    }),
  };

  const orderBy = {
    [query.sortBy]: query.order,
  };

  const skip = (query.page - 1) * query.limit;
  const take = query.limit;

  const wearEvents = await prisma.wearEvent.findMany({
    where,
    orderBy,
    skip,
    take,
  });

  return wearEvents;
};

export const getById = async (userId: string, wearEventId: string) => {
  const wearEvent = await prisma.wearEvent.findFirst({
    where: {
      id: wearEventId,
      userId,
    },
    include: {
      items: true,
      outfit: true,
    },
  });

  if (!wearEvent) {
    throw new NotFoundError('Wear event not found');
  }

  return wearEvent;
};

export const remove = async (userId: string, wearEventId: string) => {
  return prisma.$transaction(async (tx) => {
    const wearEvent = await tx.wearEvent.findFirst({
      where: {
        id: wearEventId,
        userId,
      },
      include: {
        items: true,
      },
    });

    if (!wearEvent) {
      throw new NotFoundError('Wear event not found');
    }

    for (const item of wearEvent.items) {
      await tx.wardrobeItem.update({
        where: {
          id: item.wardrobeItemId,
        },
        data: {
          wearCount: {
            decrement: 1,
          },
        },
      });

      const latestWearEvent = await tx.wearEvent.findFirst({
        where: {
          userId,
          id: {
            not: wearEventId,
          },
          items: {
            some: {
              wardrobeItemId: item.wardrobeItemId,
            },
          },
        },
        orderBy: {
          wornAt: 'desc',
        },
      });

      await tx.wardrobeItem.update({
        where: {
          id: item.wardrobeItemId,
        },
        data: {
          lastWorn: latestWearEvent?.wornAt ?? null,
        },
      });
    }

    await tx.wearEvent.delete({
      where: {
        id: wearEventId,
      },
    });

    return {
      success: true,
    };
  });
};
