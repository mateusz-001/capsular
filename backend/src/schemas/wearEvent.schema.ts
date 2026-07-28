import z from 'zod';
import { WearSource } from '../generated/prisma/enums.js';

export const createWearEventSchema = z.object({
  outfitId: z.uuid(),
  wornAt: z.date().optional(),
  source: z.enum(WearSource).optional(),
});

export const wearEventQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export type EventQuery = z.infer<typeof wearEventQuerySchema>;

export type WearEventInput = z.infer<typeof createWearEventSchema>;
