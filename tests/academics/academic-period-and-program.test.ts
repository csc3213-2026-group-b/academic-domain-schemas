import { describe, expect, it } from 'bun:test';

import { AcademicPeriodSchema } from '@/schemas/academics/academic-period.schema';
import {
  HonoursStreamSchema,
  ProgramSchema,
} from '@/schemas/academics/academic-program.schema';

describe('AcademicPeriodSchema', () => {
  it('accepts SEM1', () => {
    expect(() =>
      AcademicPeriodSchema.parse({ year: 2026, semester: 'SEM1' })
    ).not.toThrow();
  });

  it('accepts SEM2', () => {
    expect(() =>
      AcademicPeriodSchema.parse({ year: 2026, semester: 'SEM2' })
    ).not.toThrow();
  });

  it('rejects an invalid semester', () => {
    expect(() =>
      AcademicPeriodSchema.parse({ year: 2026, semester: 'SEM3' })
    ).toThrow();
  });

  it('rejects a non-integer year', () => {
    expect(() =>
      AcademicPeriodSchema.parse({ year: 2026.5, semester: 'SEM1' })
    ).toThrow();
  });

  it('rejects missing year', () => {
    expect(() => AcademicPeriodSchema.parse({ semester: 'SEM1' })).toThrow();
  });
});

describe('ProgramSchema', () => {
  it('accepts GENERAL program', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'GENERAL',
        title: 'BSc',
        durationYears: 3,
      })
    ).not.toThrow();
  });

  it('accepts HONOURS program with stream', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'HONOURS',
        title: 'BSc(Hons)',
        durationYears: 4,
        honoursStream: 'COMPUTER_SCIENCE',
      })
    ).not.toThrow();
  });

  it('accepts SOR program', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'SOR',
        title: 'BSc(Hons) SOR',
        durationYears: 4,
      })
    ).not.toThrow();
  });

  it('rejects GENERAL with wrong title', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'GENERAL',
        title: 'Wrong',
        durationYears: 3,
      })
    ).toThrow();
  });

  it('rejects HONOURS without honoursStream', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'HONOURS',
        title: 'BSc(Hons)',
        durationYears: 4,
      })
    ).toThrow();
  });

  it('rejects an unknown program code', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'PHD',
        title: 'PhD',
        durationYears: 5,
      })
    ).toThrow();
  });
});

describe('HonoursStreamSchema', () => {
  it('accepts COMPUTER_SCIENCE', () => {
    expect(() => HonoursStreamSchema.parse('COMPUTER_SCIENCE')).not.toThrow();
  });

  it('accepts DATA_SCIENCE', () => {
    expect(() => HonoursStreamSchema.parse('DATA_SCIENCE')).not.toThrow();
  });

  it('accepts STATISTICS', () => {
    expect(() => HonoursStreamSchema.parse('STATISTICS')).not.toThrow();
  });

  it('accepts OTHER', () => {
    expect(() => HonoursStreamSchema.parse('OTHER')).not.toThrow();
  });

  it('rejects an unknown stream', () => {
    expect(() => HonoursStreamSchema.parse('BIOLOGY')).toThrow();
  });
});
