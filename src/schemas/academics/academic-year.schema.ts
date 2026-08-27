import { z } from 'zod';

const AcademicYearRangeSchema = z
  .string()
  .trim()
  .regex(/^\d{4}\/\d{4}$/, 'Academic year must be YYYY/YYYY, such as 2025/2026')
  .refine((value) => {
    const [startYear, endYear] = value.split('/').map(Number);
    return endYear === startYear + 1;
  }, 'The ending year must immediately follow the starting year');

export const AcademicYearSchema = z.union([
  z.number().int().min(1900).max(2200),
  AcademicYearRangeSchema,
]);

export type AcademicYear = z.infer<typeof AcademicYearSchema>;
