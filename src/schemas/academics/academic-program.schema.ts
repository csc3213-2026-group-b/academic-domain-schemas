import { z } from 'zod';

export const HonoursStreamSchema = z.enum([
  'COMPUTER_SCIENCE',
  'DATA_SCIENCE',
  'STATISTICS',
  'OTHER',
]);

export const ProgramSchema = z.discriminatedUnion('code', [
  z.object({
    code: z.literal('GENERAL'),
    title: z.literal('BSc'),
    durationYears: z.literal(3),
  }),

  z.object({
    code: z.literal('HONOURS'),
    title: z.literal('BSc(Hons)'),
    durationYears: z.literal(4),
    honoursStream: HonoursStreamSchema,
  }),

  z.object({
    code: z.literal('SOR'),
    title: z.literal('BSc(Hons) SOR'),
    durationYears: z.literal(4),
  }),
]);

export type Program = z.infer<typeof ProgramSchema>;
