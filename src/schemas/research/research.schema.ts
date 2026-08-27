import { z } from 'zod';

export const ResearchSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  icon: z.url().optional(),
  website: z.url().optional(),
});

export type Research = z.infer<typeof ResearchSchema>;
