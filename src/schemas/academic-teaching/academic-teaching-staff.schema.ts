import { url, z } from 'zod';
import { PersonSchema } from '../person.schema';
import { AcademicRankSchema } from './academic-rank.schema';
import { CourseSchema } from '../course.schema';
import { PublicationSchema } from '../objects/academic/research-publication.schema';
import { ConfrenceSchema } from '../objects/academic/confrence.schema';
import { ResearchSchema } from '../objects/academic/research.schema';
import { SocialLinksSchema } from '../objects/academic/social-links.schema';

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
  positions_held: z
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
  research_interests: z
    .array(
      z.object({
        primary_focus: z.array(z.string()).optional(),
        other_interests: z.array(z.string()).optional(),
      })
    )
    .optional(),
  research_ongoing: z.array(ResearchSchema).optional(),
  publications: z.array(PublicationSchema).optional(),
  key_publications: z.array(PublicationSchema).optional(),
  conferences_attended: z.array(ConfrenceSchema).optional(),
  teachings: z.array(z.object(CourseSchema)).optional(),
  cv_url: z.url().optional(),
  socialLinks: SocialLinksSchema.optional(),
});

export type AcademicTeachingStaff = z.infer<typeof AcademicTeachingStaffSchema>;
