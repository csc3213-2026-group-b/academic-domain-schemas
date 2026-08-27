import { z } from 'zod';
import { PersonSchema } from '../../person.schema.js';
import { AcademicSupportPositionSchema } from './academic-support-position.schema.js';

export const AcademicSupportStaffSchema = PersonSchema.extend({
  staffType: z.literal('ACADEMIC_SUPPORT'),
  designation: AcademicSupportPositionSchema,
  qualifications: z.array(z.string()).optional(),
  officePhone: z.string().optional(),
});

export type AcademicSupportStaff = z.infer<typeof AcademicSupportStaffSchema>;
