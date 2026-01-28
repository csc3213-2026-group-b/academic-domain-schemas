import { z } from 'zod';

export const PersonSchema = z.object({
  title: z.enum(['Mr', 'Mrs', 'Ms', 'Dr', 'Prof']).optional(),
  fullName: z.string(),
  email: z.string().email().optional(),
  profileImageUrl: z.string().url().optional(),
  officePhone: z.string().optional(),
  mobilePhone: z.string().optional(),
});

export type Person = z.infer<typeof PersonSchema>;
