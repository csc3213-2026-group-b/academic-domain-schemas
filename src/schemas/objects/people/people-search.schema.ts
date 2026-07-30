import { z } from 'zod';

export const PeopleSearchEntryTypeSchema = z.enum(['STAFF', 'STUDENT']);

export const PeopleSearchEntrySchema = z.object({
  id: z.string().trim().min(1),
  type: PeopleSearchEntryTypeSchema,
  identity: z.string().trim().toLowerCase().min(1),
  href: z
    .string()
    .trim()
    .regex(/^\/people\/[A-Za-z0-9._-]+$/),
  name: z.string().trim().min(1),
  subtitle: z.string().trim().min(1),
  email: z.string().trim().toLowerCase().email().optional(),
  keywords: z.array(z.string().trim().toLowerCase().min(1)).min(1),
});

export const PeopleSearchIndexSchema = z.array(PeopleSearchEntrySchema);

export type PeopleSearchEntryType = z.infer<typeof PeopleSearchEntryTypeSchema>;
export type PeopleSearchEntry = z.infer<typeof PeopleSearchEntrySchema>;
export type PeopleSearchIndex = z.infer<typeof PeopleSearchIndexSchema>;
