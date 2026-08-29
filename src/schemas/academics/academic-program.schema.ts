import { z } from 'zod';

import {
  type AcademicSubjectCode,
  AcademicSubjectCodeSchema,
  AcademicSubjectSelectionSchema,
  HonoursProgrammeCodeSchema,
  SpecialDegreeSubjectCodes,
} from '@/schemas/academics/academic-organization.schema';

export const HonoursStreamSchema = HonoursProgrammeCodeSchema;

const Subject = AcademicSubjectCodeSchema.enum;
const SorSubjectCodes: AcademicSubjectCode[] = [
  Subject.STATISTICS,
  Subject.MATHEMATICS,
  Subject.COMPUTER_SCIENCE,
];
const SpecialDegreeSubjects = new Set<AcademicSubjectCode>(
  SpecialDegreeSubjectCodes
);

function includesSpecialDegreeSubject(subjects: AcademicSubjectCode[]) {
  return subjects.some((subject) => SpecialDegreeSubjects.has(subject));
}

function includesAppliedSciencesSubject(subjects: AcademicSubjectCode[]) {
  return subjects.includes(Subject.APPLIED_SCIENCES);
}

const SorSubjectSelectionSchema = AcademicSubjectSelectionSchema.refine(
  (subjects) =>
    subjects.includes(Subject.STATISTICS) &&
    subjects.includes(Subject.MATHEMATICS),
  'SOR subjects must include STATISTICS and MATHEMATICS'
).refine(
  (subjects) => subjects.every((subject) => SorSubjectCodes.includes(subject)),
  'SOR subjects can only include STATISTICS, MATHEMATICS, and COMPUTER_SCIENCE'
);

const GeneralSubjectSelectionSchema = AcademicSubjectSelectionSchema.refine(
  (subjects) => !includesSpecialDegreeSubject(subjects),
  'GENERAL subjects cannot include special degree subjects'
);

const HonoursSubjectSelectionSchema = AcademicSubjectSelectionSchema;

export const ProgramSchema = z.discriminatedUnion('code', [
  z.object({
    code: z.literal('GENERAL'),
    title: z.literal('BSc'),
    durationYears: z.literal(3),
    subjects: GeneralSubjectSelectionSchema,
  }),

  z
    .object({
      code: z.literal('HONOURS'),
      title: z.literal('BSc(Hons)'),
      durationYears: z.literal(4),
      subjects: HonoursSubjectSelectionSchema,
      honoursProgramme: HonoursProgrammeCodeSchema,
    })
    .refine(
      (programme) =>
        programme.honoursProgramme === 'APPLIED_SCIENCES' ||
        !includesAppliedSciencesSubject(programme.subjects),
      {
        message:
          'APPLIED_SCIENCES subject is only available for Applied Sciences honours',
        path: ['subjects'],
      }
    ),

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
