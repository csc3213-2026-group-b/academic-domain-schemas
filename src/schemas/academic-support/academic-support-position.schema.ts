import { z } from 'zod';

export const AcademicSupportPositionSchema = z.enum([
  'PROGRAMMER_SYSTEMS_ANALYST',
  'SYSTEMS_ANALYST',
  'PROGRAMMER',
  'IT_SUPPORT_OFFICER',
  'NETWORK_ADMINISTRATOR',
  'DATABASE_ADMINISTRATOR',
]);

export type AcademicSupportPosition = z.infer<
  typeof AcademicSupportPositionSchema
>;
