import { z } from 'zod';
import { CourseStaffSchema } from './course-staff.schema.js';
import { AcademicYearSchema } from './objects/academic/academic-year.schema.js';
import { CourseIdSchema } from './course.schema.js';

export const CourseOfferingIdSchema = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid course offering id');

export type CourseOfferingId = z.infer<typeof CourseOfferingIdSchema>;

export const CourseOfferingSchema = z.object({
  id: CourseOfferingIdSchema,
  courseId: CourseIdSchema,
  academicYear: AcademicYearSchema,
  semester: z.enum(['SEM1', 'SEM2']),
  staff: z.array(CourseStaffSchema),
});

export type CourseOffering = z.infer<typeof CourseOfferingSchema>;
