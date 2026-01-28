import { z } from 'zod';

export const AcademicRankSchema = z.enum([
  'ASSISTANT_DEMONSTRATOR',
  'TEMPORARY_DEMONSTRATOR',
  'DEMONSTRATOR',
  'TEMPORARY_LECTURER',
  'PROBATIONARY_LECTURER',
  'LECTURER',
  'SENIOR_LECTURER',
  'PROFESSOR',
  'SENIOR_PROFESSOR',
  'EMERITUS_PROFESSOR',
]);

export type AcademicRank = z.infer<typeof AcademicRankSchema>;
