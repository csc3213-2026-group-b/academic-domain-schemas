import { z } from 'zod';
import { PersonSchema } from './person.schema';
import { PublicationSchema } from './objects/academic/research-publication.schema';
import { SocialLinksSchema } from './objects/academic/social-links.schema';
import { SNumberSchema } from './objects/student/s-number.schema';

export const StudentSchema = PersonSchema.extend({
  registrationNo: SNumberSchema,
  level: z.enum(['UNDERGRADUATE', 'POSTGRADUATE', 'ALUMINI']),
  personalEmail: z.email().optional(),
  research_interests: z.array(z.string()).optional(),
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

export type Student = z.infer<typeof StudentSchema>;
