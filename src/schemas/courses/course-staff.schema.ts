import { z } from 'zod';

import { AcademicUsernameSchema } from '@/schemas/people/identifiers/academic-username.schema';

export const CourseStaffSchema = z.object({
  staff: AcademicUsernameSchema,
  role: z.enum([
    'COURSE_COORDINATOR',
    'LECTURER',
    'INSTRUCTOR',
    'TEACHING_ASSISTANT',
  ]),
});

export type CourseStaff = z.infer<typeof CourseStaffSchema>;
