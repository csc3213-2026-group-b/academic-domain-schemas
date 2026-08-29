import { z } from 'zod';

import {
  type AcademicSubjectCode,
  AcademicSubjectCodeSchema,
  AcademicSubjectSelectionSchema,
  HonoursProgrammeCodeSchema,
} from '@/schemas/academics/academic-organization.schema';

export const HonoursStreamSchema = HonoursProgrammeCodeSchema;

const Subject = AcademicSubjectCodeSchema.enum;
const SorSubjectCodes: AcademicSubjectCode[] = [
  Subject.STATISTICS,
  Subject.MATHEMATICS,
  Subject.COMPUTER_SCIENCE,
];

const SorSubjectSelectionSchema = AcademicSubjectSelectionSchema.refine(
  (subjects) =>
    subjects.includes(Subject.STATISTICS) &&
    subjects.includes(Subject.MATHEMATICS),
  'SOR subjects must include STATISTICS and MATHEMATICS'
).refine(
  (subjects) => subjects.every((subject) => SorSubjectCodes.includes(subject)),
  'SOR subjects can only include STATISTICS, MATHEMATICS, and COMPUTER_SCIENCE'
);

export const ProgramSchema = z.discriminatedUnion('code', [
  z.object({
    code: z.literal('GENERAL'),
    title: z.literal('BSc'),
    durationYears: z.literal(3),
    subjects: AcademicSubjectSelectionSchema,
  }),

  z.object({
    code: z.literal('HONOURS'),
    title: z.literal('BSc(Hons)'),
    durationYears: z.literal(4),
    subjects: AcademicSubjectSelectionSchema,
    honoursProgramme: HonoursProgrammeCodeSchema,
  }),

  z.object({
    code: z.literal('APPLIED_SCIENCES'),
    title: z.literal('BSc(Hons) Applied Sciences'),
    durationYears: z.literal(4),
    subjects: AcademicSubjectSelectionSchema,
  }),

  z.object({
    code: z.literal('SOR'),
    title: z.literal('BSc(Hons) Statistics and Operations Research'),
    durationYears: z.literal(4),
    subjects: SorSubjectSelectionSchema,
    honoursProgramme: z
      .literal('STATISTICS_AND_OPERATIONS_RESEARCH')
      .default('STATISTICS_AND_OPERATIONS_RESEARCH'),
  }),
]);

export type Program = z.infer<typeof ProgramSchema>;
