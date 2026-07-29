import { z } from 'zod';
import { PersonSchema } from './person.schema.js';
import { PublicationSchema } from './objects/academic/research-publication.schema.js';
import { SocialLinksSchema } from './objects/academic/social-links.schema.js';
import { SNumberSchema } from './objects/student/s-number.schema.js';

export const StudentTypeSchema = z.enum(['UNDERGRADUATE', 'POSTGRADUATE']);
export const StudentTrackSchema = z.enum(['GENERAL', 'HONOURS']);
export const StudentLevelSchema = z.enum(['1000', '2000', '3000', '4000']);
export const StudentStatusSchema = z.enum(['CURRENT', 'ALUMNI']);

export const StudentSchema = PersonSchema.extend({
  registrationNo: SNumberSchema,
  studentType: StudentTypeSchema,
  studentTrack: StudentTrackSchema.optional(),
  level: StudentLevelSchema.optional(),
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
export type Student = z.infer<typeof StudentSchema>;
