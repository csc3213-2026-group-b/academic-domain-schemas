import { z } from 'zod';
import { CourseCodeSchema } from './course-code.schema.js';

export const CourseIdSchema = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid course id');

export type CourseId = z.infer<typeof CourseIdSchema>;

export const CourseSchema = z
  .object({
    id: CourseIdSchema,
    primaryCode: CourseCodeSchema,
    codes: z.array(CourseCodeSchema).min(1),
    title: z.string().trim().min(1),
    credits: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(6)]),
  })
  .refine(
    (course) => course.codes.includes(course.primaryCode),
    'primaryCode must be listed in codes'
  )
  .refine(
    (course) => new Set(course.codes).size === course.codes.length,
    'codes must not contain duplicates'
  );

export type Course = z.infer<typeof CourseSchema>;
