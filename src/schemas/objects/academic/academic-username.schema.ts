import { z } from 'zod';

export const AcademicUsernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(
    /^[a-z][a-z0-9._]{2,29}$/,
    'Username must start with a letter and contain only lowercase letters, numbers, dots, or underscores (3–30 characters)'
  );

export type AcademicUsername = z.infer<typeof AcademicUsernameSchema>;
