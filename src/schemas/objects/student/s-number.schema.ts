import { z } from 'zod';

export const SNumberSchema = z
  .string()
  .regex(
    /^S\d{2}(SP)?\d{3}$/,
    'Invalid S-Number format. Expected format: SYYXXX or SYYSPXXX where YY is a two-digit year and XXX is a three-digit sequence number.'
  );

export type SNumber = z.infer<typeof SNumberSchema>;
