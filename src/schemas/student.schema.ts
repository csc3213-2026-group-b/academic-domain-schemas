import { z } from 'zod';
import { PersonSchema } from './person.schema.js';
import { PublicationSchema } from './objects/academic/research-publication.schema.js';
import { SocialLinksSchema } from './objects/academic/social-links.schema.js';
import { SNumberSchema } from './objects/student/s-number.schema.js';

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
