import { z } from 'zod';

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

export const updateOutfitSchema = outfitSchema.partial();

export type OutfitsQuery = z.infer<typeof outfitsQuerySchema>;
export type CreateOutfitInput = z.infer<typeof outfitSchema>;
export type UpdateOutfitInput = z.infer<typeof updateOutfitSchema>;
