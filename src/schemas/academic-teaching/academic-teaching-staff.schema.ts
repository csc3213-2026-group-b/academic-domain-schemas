import { z } from 'zod';
import { PersonSchema } from '../person.schema';
import { AcademicRankSchema } from './academic-rank.schema';

export const AcademicTeachingStaffSchema = PersonSchema.extend({
  staffType: z.literal('ACADEMIC_TEACHING'),
  academicRank: AcademicRankSchema,
  qualifications: z.array(z.string()).optional(),
});

export type AcademicTeachingStaff = z.infer<typeof AcademicTeachingStaffSchema>;
