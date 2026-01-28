import { z } from 'zod';

export const CourseSchema = z.object({
  code: z.string(),
  title: z.string(),
  credits: z.number().int().positive(),
});

export type Course = z.infer<typeof CourseSchema>;
