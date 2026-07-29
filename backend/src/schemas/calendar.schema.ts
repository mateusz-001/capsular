import { z } from 'zod';

export const createCalendarEntrySchema = z.object({
  outfitId: z.uuid(),
  plannedDate: z.coerce.date().default(() => new Date()),
  contextLabel: z.string().trim().max(120).optional(),
  note: z.string().optional(),
});

export const calendarQuerySchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
});

export type CalendarQuery = z.infer<typeof calendarQuerySchema>;

export type CreateCalendarEntryInput = z.infer<
  typeof createCalendarEntrySchema
>;
export type UpdateCalendarEntryInput = Partial<CreateCalendarEntryInput>;
