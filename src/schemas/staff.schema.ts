import { z } from 'zod';
import { AcademicTeachingStaffSchema } from './academic-teaching/academic-teaching-staff.schema';
import { AcademicSupportStaffSchema } from './academic-support/academic-support-staff.schema';
import { NonAcademicStaffSchema } from './non-academic/non-academic-staff.schema';

export const StaffSchema = z.discriminatedUnion('staffType', [
  AcademicTeachingStaffSchema,
  AcademicSupportStaffSchema,
  NonAcademicStaffSchema,
]);

export type Staff = z.infer<typeof StaffSchema>;
