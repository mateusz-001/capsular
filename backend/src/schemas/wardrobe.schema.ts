import { z } from 'zod';
import { WardrobeCategory } from '../generated/prisma/enums.js';

export const wardrobeQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  category: z.enum(WardrobeCategory).optional(),
  search: z.string().max(100).optional(),
  brand: z.string().max(100).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const createWardrobeItemSchema = z.object({
  name: z
    .string()
    .min(1, 'Wardrobe name is required')
    .max(100, 'Wardrobe name must be less than 100 characters'),
  category: z.enum(WardrobeCategory),
  description: z.string().optional(),
  size: z.string().max(40).optional(),
  brand: z.string().max(100).optional(),
});

export const updateWardrobeItemSchema = createWardrobeItemSchema.partial();

export type WardrobeQuery = z.infer<typeof wardrobeQuerySchema>;
export type CreateWardrobeItemInput = z.infer<typeof createWardrobeItemSchema>;
export type UpdateWardrobeItemInput = z.infer<typeof updateWardrobeItemSchema>;
