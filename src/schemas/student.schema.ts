import { z } from 'zod';
import { PersonSchema } from './person.schema';

export const StudentSchema = PersonSchema.extend({
  registrationNo: z.string(),
  level: z.enum(['UNDERGRADUATE', 'POSTGRADUATE', 'ALUMINI']),
});

export type Student = z.infer<typeof StudentSchema>;
