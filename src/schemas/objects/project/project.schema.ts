import { z } from 'zod';
import { AcademicUsernameSchema } from '../academic/academic-username.schema.js';
import { AcademicYearSchema } from '../academic/academic-year.schema.js';
import { CourseCodeSchema } from '../course/course-code.schema.js';
import { SNumberSchema } from '../student/s-number.schema.js';

export const ProjectTypeSchema = z.enum([
  'COURSE_PROJECT',
  'RESEARCH_PROJECT',
  'STUDENT_INNOVATION',
  'OPEN_SOURCE',
  'DEPARTMENT_SYSTEM',
  'DATASET',
  'PUBLICATION_ARTIFACT',
  'INDUSTRY_COLLABORATION',
  'FACULTY_COLLABORATION',
  'HACKATHON',
  'OTHER',
]);

export type ProjectType = z.infer<typeof ProjectTypeSchema>;

export const ProjectStatusSchema = z.enum([
  'PLANNED',
  'ACTIVE',
  'COMPLETED',
  'ARCHIVED',
]);

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const ProjectPersonRoleSchema = z.enum([
  'student',
  'supervisor',
  'instructor',
  'maintainer',
  'collaborator',
  'contributor',
]);

export type ProjectPersonRole = z.infer<typeof ProjectPersonRoleSchema>;

export const ProjectPersonSchema = z.object({
  name: z.string().trim().min(1),
  role: ProjectPersonRoleSchema,
  username: AcademicUsernameSchema.optional(),
  email: z.email().optional(),
  sNumber: SNumberSchema.optional(),
});

export type ProjectPerson = z.infer<typeof ProjectPersonSchema>;

export const ProjectLinksSchema = z.object({
  repository: z.url().optional(),
  website: z.url().optional(),
  documentation: z.url().optional(),
  demo: z.url().optional(),
  dataset: z.url().optional(),
  publication: z.url().optional(),
  video: z.url().optional(),
});

export type ProjectLinks = z.infer<typeof ProjectLinksSchema>;

export const ProjectSourceSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('TEMPLATE_INDEX_JSON'),
    repositoryName: z.string().trim().min(1),
    repositoryOwner: z.string().trim().min(1),
    metadataPath: z.string().trim().min(1),
  }),
  z.object({
    kind: z.literal('MANUAL'),
    curator: z.string().trim().min(1),
  }),
  z.object({
    kind: z.literal('GITHUB_REPO'),
    repositoryName: z.string().trim().min(1),
    repositoryOwner: z.string().trim().min(1),
  }),
]);

export type ProjectSource = z.infer<typeof ProjectSourceSchema>;

export const ProjectMediaSchema = z.object({
  icon: z.string().trim().min(1),
  coverImage: z.string().trim().min(1).optional(),
});

export type ProjectMedia = z.infer<typeof ProjectMediaSchema>;

export const ProjectDatesSchema = z
  .object({
    startedAt: z.iso.date().optional(),
    completedAt: z.iso.date().optional(),
    lastUpdatedAt: z.iso.date(),
  })
  .refine(
    (dates) =>
      !dates.completedAt ||
      !dates.startedAt ||
      dates.completedAt >= dates.startedAt,
    'completedAt must be the same as or after startedAt'
  );

export type ProjectDates = z.infer<typeof ProjectDatesSchema>;

export const ProjectCourseSchema = z.object({
  code: CourseCodeSchema,
  title: z.string().trim().min(1),
});

export type ProjectCourse = z.infer<typeof ProjectCourseSchema>;

export const ProjectSchema = z
  .object({
    id: z.string().trim().min(1),
    slug: z
      .string()
      .trim()
      .min(1)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid project slug'),
    title: z.string().trim().min(1),
    shortDescription: z.string().trim().min(1),
    description: z.string().trim().min(1),
    projectType: ProjectTypeSchema,
    status: ProjectStatusSchema,
    categories: z.array(z.string().trim().min(1)).min(1),
    tags: z.array(z.string().trim().min(1)).default([]),
    academicYear: AcademicYearSchema.optional(),
    course: ProjectCourseSchema.optional(),
    batch: z.string().trim().min(1).optional(),
    groupNumber: z.string().trim().min(1).optional(),
    people: z.array(ProjectPersonSchema).min(1),
    links: ProjectLinksSchema.default({}),
    source: ProjectSourceSchema,
    media: ProjectMediaSchema,
    dates: ProjectDatesSchema,
  })
  .refine(
    (project) => project.projectType !== 'COURSE_PROJECT' || !!project.course,
    'course is required for COURSE_PROJECT'
  );

export type Project = z.infer<typeof ProjectSchema>;
