import { z } from 'zod';
import { StaffSchema } from './staff.schema';

export const CourseStaffSchema = z.object({
  staff: StaffSchema,
  role: z.enum([
    'COURSE_COORDINATOR',
    'LECTURER',
    'INSTRUCTOR',
    'TEACHING_ASSISTANT',
  ]),
});
