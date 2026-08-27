import { z } from 'zod';

import { PersonSchema } from '@/schemas/people/person.schema';
import { NonAcademicPositionSchema } from '@/schemas/people/staff/non-academic/non-academic-position.schema';

export const NonAcademicStaffSchema = PersonSchema.extend({
  staffType: z.literal('NON_ACADEMIC'),
  designation: NonAcademicPositionSchema,
  officePhone: z.string().optional(),
});

export type NonAcademicStaff = z.infer<typeof NonAcademicStaffSchema>;
