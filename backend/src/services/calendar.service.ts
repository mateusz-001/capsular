import type {
  CalendarQuery,
  CreateCalendarEntryInput,
} from '../schemas/calendar.schema.js';
import { removeUndefinedValuesFromPayload } from '../utils/removeUndefinedValuesFromPayload.js';
import { prisma } from '../lib/prisma.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

interface CreateCalendarEntryPayload {
  userId: string;
  data: CreateCalendarEntryInput;
}

interface UpdateCalendarEntryPayload {
  userId: string;
  entryId: string;
  data: Partial<CreateCalendarEntryInput>;
}

export const create = async ({ userId, data }: CreateCalendarEntryPayload) => {
  const payload = removeUndefinedValuesFromPayload({
    userId,
    ...data,
  });

  return prisma.calendarEntry.create({
    data: payload as Parameters<typeof prisma.calendarEntry.create>[0]['data'],
  });
};

export const getAll = async (userId: string, query: CalendarQuery) => {
  if (!query.from && !query.to) {
    throw new BadRequestError(
      'From and To query parameters are required to fetch calendar entries',
    );
  }

  const result = await prisma.calendarEntry.findMany({
    where: {
      userId,
      plannedDate: {
        gte: query.from,
        lte: query.to,
      },
    },
    orderBy: {
      plannedDate: 'desc',
    },
  });

  if (!result) {
    return [];
  }

  return result;
};

export const getById = async (userId: string, entryId: string) => {
  const entry = await prisma.calendarEntry.findUnique({
    where: {
      id: entryId,
      userId,
    },
    include: {
      outfit: {
        include: {
          items: {
            include: {
              wardrobeItem: {
                include: {
                  images: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!entry) {
    throw new NotFoundError('Calendar entry not found');
  }

  return entry;
};

export const deleteEntry = async (userId: string, entryId: string) => {
  const entry = await prisma.calendarEntry.findUnique({
    where: {
      id: entryId,
      userId,
    },
  });

  if (!entry) {
    throw new NotFoundError('Calendar entry not found');
  }

  await prisma.calendarEntry.delete({
    where: {
      id: entryId,
      userId,
    },
  });

  return entry;
};

export const updateEntry = async ({
  userId,
  entryId,
  data,
}: UpdateCalendarEntryPayload) => {
  const entry = await prisma.calendarEntry.findUnique({
    where: {
      id: entryId,
      userId,
    },
  });

  if (!entry) {
    throw new NotFoundError('Calendar entry not found');
  }

  const payload = removeUndefinedValuesFromPayload({
    ...data,
  });

  return prisma.calendarEntry.update({
    where: {
      id: entryId,
      userId,
    },
    data: payload as Parameters<typeof prisma.calendarEntry.update>[0]['data'],
  });
};
