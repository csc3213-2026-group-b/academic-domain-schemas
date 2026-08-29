import { z } from 'zod';

export const CourseCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z]{2,4}[0-9]{4}$/, 'Invalid course code');

export type CourseCode = z.infer<typeof CourseCodeSchema>;
