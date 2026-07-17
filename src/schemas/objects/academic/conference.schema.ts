import { z } from 'zod';

export const ConferenceSchema = z.object({
  name: z.string(),
  date: z.string(),
  location: z.string().optional(),
  description: z.string().optional(),
  icon: z.url().optional(),
});

export type Conference = z.infer<typeof ConferenceSchema>;
