import { z } from 'zod';

import {
  AcademicSubjectSelectionSchema,
  HonoursProgrammeCodeSchema,
} from '@/schemas/academics/academic-organization.schema';
import { SNumberSchema } from '@/schemas/people/identifiers/s-number.schema';
import { PersonSchema } from '@/schemas/people/person.schema';
import { SocialLinksSchema } from '@/schemas/people/social-links.schema';
import { PublicationSchema } from '@/schemas/research/research-publication.schema';

export const StudentTypeSchema = z.enum(['UNDERGRADUATE', 'POSTGRADUATE']);
export const StudentTrackSchema = z.enum(['GENERAL', 'HONOURS']);
export const StudentLevelSchema = z.enum(['1000', '2000', '3000', '4000']);
export const StudentStatusSchema = z.enum(['CURRENT', 'ALUMNI']);
export const PostgraduateProgrammeSchema = z.enum([
  'POSTGRADUATE_CERTIFICATE',
  'POSTGRADUATE_DIPLOMA',
  'MASTERS_COURSEWORK',
  'MSC',
  'MPHIL',
  'MPHIL_UPGRADE_FROM_MSC',
  'PHD',
  'PHD_UPGRADE_FROM_MSC',
  'PHD_UPGRADE_FROM_MPHIL',
]);
export const SlqfLevelSchema = z.enum(['L7', 'L8', 'L9', 'L10', 'L11', 'L12']);
export const StudentStreamSchema = z.enum(['cs', 'ds', 'stat', 'sor']);

export const StudentPlacementSchema = z
  .object({
    batch: z
      .string()
      .trim()
      .toLowerCase()
      .regex(/^s\d{2}$/),
    studentTrack: StudentTrackSchema,
    level: StudentLevelSchema,
  })
  .refine(
    (placement) =>
      placement.studentTrack !== 'GENERAL' || placement.level !== '4000',
    {
      message: 'General students cannot be assigned to 4000 level',
      path: ['level'],
    }
  );

export const StudentPlacementListSchema = z.array(StudentPlacementSchema);

export const AlumniBatchSchema = z.object({
  batch: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^s\d{2}$/),
  studentTracks: z.array(StudentTrackSchema).min(1).max(2),
});

export const AlumniBatchListSchema = z.array(AlumniBatchSchema);

export const PostgraduateProgrammeDefinitionSchema = z.object({
  programme: PostgraduateProgrammeSchema,
  label: z.string().trim().min(1),
  slqfLevel: SlqfLevelSchema,
});

export const PostgraduateProgrammeDefinitionListSchema = z.array(
  PostgraduateProgrammeDefinitionSchema
);

export const StudentStreamDefinitionSchema = z.object({
  stream: StudentStreamSchema,
  label: z.string().trim().min(1),
  directory: z.string().trim().min(1).optional(),
  publicDirectory: z.boolean().default(true),
});

export const StudentStreamDefinitionListSchema = z.array(
  StudentStreamDefinitionSchema
);

export const StudentSchema = PersonSchema.extend({
  registrationNo: SNumberSchema,
  studentType: StudentTypeSchema,
  studentTrack: StudentTrackSchema.optional(),
  level: StudentLevelSchema.optional(),
  postgraduateProgramme: PostgraduateProgrammeSchema.optional(),
  slqfLevel: SlqfLevelSchema.optional(),
  subjects: AcademicSubjectSelectionSchema.optional(),
  honoursProgramme: HonoursProgrammeCodeSchema.optional(),
  status: StudentStatusSchema,
  personalEmail: z.email().optional(),
  researchInterests: z.array(z.string()).optional(),
  publications: z.array(PublicationSchema).optional(),
  positions: z
    .array(
      z.object({
        name: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        icon: z.url().optional(),
      })
    )
    .optional(),
  socialLinks: SocialLinksSchema.optional(),
});

export type StudentType = z.infer<typeof StudentTypeSchema>;
export type StudentTrack = z.infer<typeof StudentTrackSchema>;
export type StudentLevel = z.infer<typeof StudentLevelSchema>;
export type StudentStatus = z.infer<typeof StudentStatusSchema>;
export type PostgraduateProgramme = z.infer<typeof PostgraduateProgrammeSchema>;
export type SlqfLevel = z.infer<typeof SlqfLevelSchema>;
export type StudentStream = z.infer<typeof StudentStreamSchema>;
export type StudentPlacement = z.infer<typeof StudentPlacementSchema>;
export type AlumniBatch = z.infer<typeof AlumniBatchSchema>;
export type PostgraduateProgrammeDefinition = z.infer<
  typeof PostgraduateProgrammeDefinitionSchema
>;
export type StudentStreamDefinition = z.infer<
  typeof StudentStreamDefinitionSchema
>;
export type Student = z.infer<typeof StudentSchema>;
