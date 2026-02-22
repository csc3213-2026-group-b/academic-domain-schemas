import { z } from 'zod';
import { StaffSchema } from './staff.schema';
import { AcademicUsernameSchema } from './objects/academic/academic-username.schema';

export const CourseStaffSchema = z.object({
  staff: AcademicUsernameSchema,
  role: z.enum([
    'COURSE_COORDINATOR',
    'LECTURER',
    'INSTRUCTOR',
    'TEACHING_ASSISTANT',
  ]),
});
