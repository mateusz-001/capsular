import { z } from 'zod';
import {
  BodyType,
  CapsuleStatus,
  Occasion,
  PriceSensitivity,
  ShoppingFrequency,
  StylePreference,
  UnitSystem,
  WardrobeGoal,
} from '../generated/prisma/browser.js';

export const profileSchema = z.object({
  firstName: z.string().trim().max(80).optional(),
  lastName: z.string().trim().max(80).optional(),
  dateOfBirth: z.coerce.date().optional(),
  countryCode: z.string().length(2).optional(),
  city: z.string().trim().max(120).optional(),
  timeZone: z.string().trim().max(64),
  unitSystem: z.enum(UnitSystem),
  heightCm: z.number().int().positive().optional(),
  weightKg: z.number().positive().optional(),
  bodyType: z.enum(BodyType).optional(),
  preferredStyles: z.enum(StylePreference).array(),
  typicalOccasions: z.enum(Occasion).array(),
  shoppingFrequency: z.enum(ShoppingFrequency).optional(),
  priceSensitivity: z.enum(PriceSensitivity).optional(),
  goals: z.enum(WardrobeGoal).array(),
  capsuleStatus: z.enum(CapsuleStatus).optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
