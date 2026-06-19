import { z } from 'zod';
import { AcademicTeachingStaffSchema } from './academic-teaching/academic-teaching-staff.schema.js';
import { AcademicSupportStaffSchema } from './academic-support/academic-support-staff.schema.js';
import { NonAcademicStaffSchema } from './non-academic/non-academic-staff.schema.js';

export const StaffSchema = z.discriminatedUnion('staffType', [
  AcademicTeachingStaffSchema,
  AcademicSupportStaffSchema,
  NonAcademicStaffSchema,
]);

export type Staff = z.infer<typeof StaffSchema>;
