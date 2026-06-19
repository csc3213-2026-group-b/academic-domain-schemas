import { z } from 'zod';
import { PersonSchema } from '../person.schema.js';
import { NonAcademicPositionSchema } from './non-academic-position.schema.js';

export const NonAcademicStaffSchema = PersonSchema.extend({
  staffType: z.literal('NON_ACADEMIC'),
  designation: NonAcademicPositionSchema,
  officePhone: z.string().optional(),
});

export type NonAcademicStaff = z.infer<typeof NonAcademicStaffSchema>;
