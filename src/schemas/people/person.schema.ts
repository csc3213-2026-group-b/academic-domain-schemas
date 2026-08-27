import { z } from 'zod';

export const PersonSchema = z.object({
  title: z.enum(['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']),
  fullName: z.string(),
  email: z.email().optional(),
  profileImageUrl: z.url().optional(),
  mobilePhone: z.string().optional(),
});

export type Person = z.infer<typeof PersonSchema>;
