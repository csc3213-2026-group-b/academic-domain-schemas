import { z } from 'zod';
import { CourseSchema } from './course.schema';
import { CourseStaffSchema } from './course-staff.schema';
import { AcademicPeriodSchema } from './academic-period.schema';
import { CourseCodeSchema } from './objects/course/course-code.schema';

export const CourseOfferingSchema = z.object({
  course: CourseCodeSchema,
  year: z.number().int().positive(),
  period: AcademicPeriodSchema,
  staff: z.array(CourseStaffSchema),
});

export type CourseOffering = z.infer<typeof CourseOfferingSchema>;
