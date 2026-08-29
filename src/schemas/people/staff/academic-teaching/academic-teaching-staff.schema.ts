import { z } from 'zod';

import {
  AcademicDepartmentCodeSchema,
  AcademicUnitCodeSchema,
} from '@/schemas/academics/academic-organization.schema';
import { CourseCodeSchema } from '@/schemas/courses/course-code.schema';
import { PersonSchema } from '@/schemas/people/person.schema';
import { SocialLinksSchema } from '@/schemas/people/social-links.schema';
import { AcademicRankSchema } from '@/schemas/people/staff/academic-teaching/academic-rank.schema';
import { ConferenceSchema } from '@/schemas/research/conference.schema';
import { ResearchSchema } from '@/schemas/research/research.schema';
import { PublicationSchema } from '@/schemas/research/research-publication.schema';

export const AcademicTeachingStaffSchema = PersonSchema.extend({
  staffType: z.literal('ACADEMIC_TEACHING'),
  academicRank: AcademicRankSchema,
  department: AcademicDepartmentCodeSchema.optional(),
  unit: AcademicUnitCodeSchema.optional(),
  qualifications: z
    .array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        graduationYear: z.string(),
        description: z.string().optional(),
        icon: z.url().optional(),
      })
    )
    .optional(),
  officePhone: z.string().optional(),
  officeLocation: z.string().optional(),
  positionsHeld: z
    .array(
      z.object({
        name: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        icon: z.url().optional(),
      })
    )
    .optional(),
  awards: z
    .array(
      z.object({
        name: z.string(),
        date: z.string(),
        description: z.string().optional(),
        icon: z.url().optional(),
      })
    )
    .optional(),
  website: z.url().optional(),
  researchInterests: z
    .array(
      z.object({
        primaryFocus: z.array(z.string()).optional(),
        otherInterests: z.array(z.string()).optional(),
      })
    )
    .optional(),
  researchOngoing: z.array(ResearchSchema).optional(),
  publications: z.array(PublicationSchema).optional(),
  keyPublications: z.array(PublicationSchema).optional(),
  conferencesAttended: z.array(ConferenceSchema).optional(),
  teachings: z.array(CourseCodeSchema).optional(),
  cvUrl: z.url().optional(),
  socialLinks: SocialLinksSchema.optional(),
});

export type AcademicTeachingStaff = z.infer<typeof AcademicTeachingStaffSchema>;
