import { z } from 'zod';

export const PublicationSchema = z.object({
  title: z.string(),
  journal: z.string().optional(),
  publicationDate: z.string().optional(),
  coAuthors: z.array(z.string()).optional(),
  description: z.string().optional(),
  doi: z
    .object({
      doiId: z.string().optional(),
      doiUrl: z.url().optional(),
    })
    .optional(),
  url: z.url().optional(),
  icon: z.url().optional(),
});

export type Publication = z.infer<typeof PublicationSchema>;
