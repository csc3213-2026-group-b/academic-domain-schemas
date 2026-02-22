import { z } from 'zod';
import { PersonSchema } from '../person.schema';
import { NonAcademicPositionSchema } from './non-academic-position.schema';

export const NonAcademicStaffSchema = PersonSchema.extend({
  staffType: z.literal('NON_ACADEMIC'),
  designation: NonAcademicPositionSchema,
  officePhone: z.string().optional(),
});

export type NonAcademicStaff = z.infer<typeof NonAcademicStaffSchema>;
