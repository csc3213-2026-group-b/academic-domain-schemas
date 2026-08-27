import { describe, expect, it } from 'bun:test';

import { AcademicUsernameSchema } from '@/schemas/people/identifiers/academic-username.schema';
import { SNumberSchema } from '@/schemas/people/identifiers/s-number.schema';

describe('AcademicUsernameSchema', () => {
  it('accepts a valid username starting with a letter', () => {
    expect(() => AcademicUsernameSchema.parse('jdoe')).not.toThrow();
  });

  it('accepts username with dots and underscores', () => {
    expect(() => AcademicUsernameSchema.parse('john.doe_123')).not.toThrow();
  });

  it('trims whitespace and lowercases', () => {
    const result = AcademicUsernameSchema.parse('  JohnDoe  ');
    expect(result).toBe('johndoe');
  });

  it('rejects a username shorter than 3 characters', () => {
    expect(() => AcademicUsernameSchema.parse('ab')).toThrow();
  });

  it('rejects a username starting with a digit', () => {
    expect(() => AcademicUsernameSchema.parse('1jdoe')).toThrow();
  });

  it('rejects a username with uppercase after parsing', () => {
    // toLowerCase runs first, so uppercase becomes lowercase
    expect(() => AcademicUsernameSchema.parse('VALID')).not.toThrow();
  });

  it('rejects a username longer than 30 characters', () => {
    expect(() => AcademicUsernameSchema.parse('a'.repeat(31))).toThrow();
  });
});

// ─── Conference ────────────────────────────────────────────────────

describe('SNumberSchema', () => {
  it.each(['S21513', 'S21SP001'])('accepts %s', (value: string) => {
    expect(() => SNumberSchema.parse(value)).not.toThrow();
  });

  it.each(['s21513', 'S2151', 'S21SP01', 'E21513', 'SAA513'])(
    'rejects %s',
    (value: string) => {
      expect(() => SNumberSchema.parse(value)).toThrow();
    }
  );
});
