import { z } from 'zod';

export const NonAcademicPositionSchema = z.enum([
  'STAFF_TECHNICAL_OFFICER',
  'TECHNICAL_OFFICER_GRADE_I',
  'TECHNICAL_OFFICER_GRADE_II',
  'TECHNICAL_OFFICER_GRADE_III',
  'SENIOR_STAFF_ASSISTANT',
  'STAFF_ASSISTANT',
  'COMPUTER_APPLICATION_ASSISTANT',
  'LAB_ATTENDANT',
  'WORKS_AIDE',
  'OFFICE_ASSISTANT',
  'CLERK',
]);

export type NonAcademicPosition = z.infer<typeof NonAcademicPositionSchema>;
