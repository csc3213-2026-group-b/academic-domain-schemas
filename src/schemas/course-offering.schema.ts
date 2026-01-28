import { z } from 'zod';
import { CourseSchema } from './course.schema';
import { CourseStaffSchema } from './course-staff.schema';
import { AcademicPeriodSchema } from './academic-period.schema';

export const CourseOfferingSchema = z.object({
  course: CourseSchema,
  period: AcademicPeriodSchema,
  staff: z.array(CourseStaffSchema),
});

export type CourseOffering = z.infer<typeof CourseOfferingSchema>;
