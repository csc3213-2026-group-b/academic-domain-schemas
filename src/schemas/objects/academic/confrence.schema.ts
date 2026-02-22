import { z } from 'zod';

export const ConfrenceSchema = z.object({
  name: z.string(),
  date: z.string(),
  location: z.string().optional(),
  description: z.string().optional(),
  icon: z.url().optional(),
});

export type Confrence = z.infer<typeof ConfrenceSchema>;
