import { z } from 'zod';
import { OutfitSlot } from '../generated/prisma/enums.js';

export const outfitSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(255).optional(),
});

export const outfitsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().max(100).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const createOutfitItemSchema = z.object({
  slot: z.enum(OutfitSlot),
  layerOrder: z.number().int().min(1).optional(),
  wardrobeItemId: z.uuid(),
});

export const updateOutfitSchema = outfitSchema.partial();
export const updateOutfitItemSchema = createOutfitItemSchema.partial();

export type OutfitsQuery = z.infer<typeof outfitsQuerySchema>;
export type CreateOutfitInput = z.infer<typeof outfitSchema>;
export type UpdateOutfitInput = z.infer<typeof updateOutfitSchema>;
export type CreateOutfitItemInput = z.infer<typeof createOutfitItemSchema>;
export type UpdateOutfitItemInput = z.infer<typeof updateOutfitItemSchema>;
