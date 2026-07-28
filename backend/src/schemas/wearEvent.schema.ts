import z from 'zod';
import { WearSource } from '../generated/prisma/enums.js';

export const createWearEventSchema = z.object({
  outfitId: z.uuid(),
  wornAt: z.coerce.date().default(() => new Date()),
  source: z.enum(WearSource).default(WearSource.MANUAL),
  note: z.string().trim().max(1000).optional(),
  calendarEntryId: z.string().uuid().optional(),
});

export const wearEventQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export type WearEventQuery = z.infer<typeof wearEventQuerySchema>;

export type WearEventInput = z.infer<typeof createWearEventSchema>;
