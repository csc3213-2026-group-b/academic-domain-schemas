import { z } from 'zod';
import { PersonSchema } from '../person.schema';
import { AcademicSupportPositionSchema } from './academic-support-position.schema';

export const AcademicSupportStaffSchema = PersonSchema.extend({
  staffType: z.literal('ACADEMIC_SUPPORT'),
  designation: AcademicSupportPositionSchema,
  qualifications: z.array(z.string()).optional(),
  officePhone: z.string().optional(),
});

export type AcademicSupportStaff = z.infer<typeof AcademicSupportStaffSchema>;
