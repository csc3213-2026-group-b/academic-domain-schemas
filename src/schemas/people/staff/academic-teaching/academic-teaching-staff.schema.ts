import { z } from 'zod';
import { PersonSchema } from '../../person.schema.js';
import { AcademicRankSchema } from './academic-rank.schema.js';
import { PublicationSchema } from '../../../research/research-publication.schema.js';
import { ConferenceSchema } from '../../../research/conference.schema.js';
import { ResearchSchema } from '../../../research/research.schema.js';
import { SocialLinksSchema } from '../../social-links.schema.js';
import { CourseCodeSchema } from '../../../courses/course-code.schema.js';

export const AcademicTeachingStaffSchema = PersonSchema.extend({
  staffType: z.literal('ACADEMIC_TEACHING'),
  academicRank: AcademicRankSchema,
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
