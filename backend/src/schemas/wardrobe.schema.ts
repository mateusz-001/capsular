import { z } from 'zod';
import { WardrobeCategory } from '../generated/prisma/enums.js';

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

export type CreateWardrobeItemInput = z.infer<typeof createWardrobeItemSchema>;
