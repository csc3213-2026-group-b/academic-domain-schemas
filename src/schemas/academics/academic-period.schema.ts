import { z } from 'zod';

import { AcademicYearSchema } from '@/schemas/academics/academic-year.schema';

export const AcademicPeriodSchema = z.object({
  year: AcademicYearSchema,
  semester: z.enum(['SEM1', 'SEM2']),
});

export type AcademicPeriod = z.infer<typeof AcademicPeriodSchema>;
