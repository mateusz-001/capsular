import { z } from 'zod';
import {
  AvailabilityStatus,
  Occasion,
  Season,
  WardrobeCategory,
  WaterResistance,
} from '../generated/prisma/enums.js';

export const wardrobeQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  category: z.enum(WardrobeCategory).optional(),
  search: z.string().max(100).optional(),
  brand: z.string().max(100).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const wardrobeItemSchema = z.object({
  name: z
    .string()
    .min(1, 'Wardrobe name is required')
    .max(120, 'Wardrobe name must be less than 120 characters'),
  description: z.string().optional(),
  category: z.enum(WardrobeCategory),
  subcategory: z
    .string()
    .max(80, 'Subcategory must be less than 80 characters')
    .optional(),
  brand: z
    .string()
    .max(100, 'Brand must be less than 100 characters')
    .optional(),
  size: z.string().max(40, 'Size must be less than 40 characters').optional(),
  availability: z.enum(AvailabilityStatus).optional(),
  availableFrom: z.coerce.date().optional(),
  unavailableReason: z
    .string()
    .max(160, 'Unavailable reason must be less than 160 characters')
    .optional(),
  isFavorite: z.boolean().optional(),
  seasons: z.array(z.enum(Season)).optional(),
  occasions: z.array(z.enum(Occasion)).optional(),
  warmthLevel: z
    .number()
    .int()
    .min(1, 'Warmth level must be between 1 and 5')
    .max(5, 'Warmth level must be between 1 and 5')
    .optional(),
  waterResistance: z.enum(WaterResistance).optional(),
  isWindResistant: z.boolean().optional(),
  purchaseDate: z.coerce.date().optional(),
  purchasePrice: z
    .number()
    .nonnegative('Purchase price cannot be negative')
    .optional(),
  currencyCode: z
    .string()
    .length(3, 'Currency code must be exactly 3 characters')
    .transform((value) => value.toUpperCase())
    .optional(),
  wearCountBeforeTracking: z
    .number()
    .int()
    .min(0, 'Wear count cannot be negative')
    .optional(),
  lastWornBeforeTracking: z.coerce.date().optional(),
});

export const updateWardrobeItemSchema = wardrobeItemSchema.partial();

export type WardrobeQuery = z.infer<typeof wardrobeQuerySchema>;
export type CreateWardrobeItemInput = z.infer<typeof wardrobeItemSchema>;
export type UpdateWardrobeItemInput = z.infer<typeof updateWardrobeItemSchema>;
