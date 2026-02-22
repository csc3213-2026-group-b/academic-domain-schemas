import { z } from 'zod';
import { CourseCodeSchema } from './objects/course/course-code.schema';

export const CourseSchema = z.object({
  code: CourseCodeSchema,
  title: z.string(),
  credits: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(6)]),
});

export type Course = z.infer<typeof CourseSchema>;
