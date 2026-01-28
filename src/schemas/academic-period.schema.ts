import { z } from 'zod';

export const AcademicPeriodSchema = z.object({
  year: z.number().int(),
  semester: z.enum(['SEM1', 'SEM2']),
});

export type AcademicPeriod = z.infer<typeof AcademicPeriodSchema>;
