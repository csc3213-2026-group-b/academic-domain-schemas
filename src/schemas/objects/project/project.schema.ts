import { z } from 'zod';
import { CourseCodeSchema } from '../course/course-code.schema';
import { SNumberSchema } from '../student/s-number.schema';
import { AcademicUsernameSchema } from '../academic/academic-username.schema';

export const BaseProjectSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  status: z.enum(['PLANNED', 'ACTIVE', 'COMPLETED', 'ARCHIVED']),
  course: CourseCodeSchema,
  academicYear: z.number().int().positive(),
  supervisors: z.array(AcademicUsernameSchema),
  instructors: z.array(AcademicUsernameSchema).optional(),
  icon: z.url().optional(),
  repoUrl: z.url().optional(),
  documentationUrl: z.url().optional(),
  website: z.url().optional(),
  tags: z.array(z.string()).optional(),
});

const IndividualProjectSchema = BaseProjectSchema.extend({
  projectType: z.literal('INDIVIDUAL'),
  student_id: SNumberSchema, // single
});

export type IndividualProject = z.infer<typeof IndividualProjectSchema>;

const GroupProjectSchema = BaseProjectSchema.extend({
  projectType: z.literal('GROUP'),
  student_ids: z.array(SNumberSchema).min(2), // enforce minimum 2
});

export type GroupProject = z.infer<typeof GroupProjectSchema>;

export const ProjectSchema = z.discriminatedUnion('projectType', [
  IndividualProjectSchema,
  GroupProjectSchema,
]);

export type Project = z.infer<typeof ProjectSchema>;
