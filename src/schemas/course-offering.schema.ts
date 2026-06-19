import { z } from 'zod';
import { CourseStaffSchema } from './course-staff.schema.js';
import { AcademicPeriodSchema } from './academic-period.schema.js';
import { CourseCodeSchema } from './objects/course/course-code.schema.js';

export const CourseOfferingSchema = z.object({
  course: CourseCodeSchema,
  year: z.number().int().positive(),
  period: AcademicPeriodSchema,
  staff: z.array(CourseStaffSchema),
});

export type CourseOffering = z.infer<typeof CourseOfferingSchema>;
