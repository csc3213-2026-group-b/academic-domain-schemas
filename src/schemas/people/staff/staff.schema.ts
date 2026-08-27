import { z } from 'zod';

import { AcademicSupportStaffSchema } from '@/schemas/people/staff/academic-support/academic-support-staff.schema';
import { AcademicTeachingStaffSchema } from '@/schemas/people/staff/academic-teaching/academic-teaching-staff.schema';
import { NonAcademicStaffSchema } from '@/schemas/people/staff/non-academic/non-academic-staff.schema';

export const StaffSchema = z.discriminatedUnion('staffType', [
  AcademicTeachingStaffSchema,
  AcademicSupportStaffSchema,
  NonAcademicStaffSchema,
]);

export type Staff = z.infer<typeof StaffSchema>;
