import { describe, expect, test } from 'bun:test';

import {
  PeopleSearchEntrySchema,
  PeopleSearchIndexSchema,
} from '@/schemas/people/people-search.schema';

const validEntry = {
  id: 'student:s21513',
  type: 'STUDENT',
  identity: 's21513',
  href: '/people/s21513',
  name: 'Mr Jane Student',
  subtitle: 'Student',
  email: 's21513@sci.pdn.ac.lk',
  keywords: ['s21513', 'jane student', 's21513@sci.pdn.ac.lk'],
};

describe('PeopleSearchEntrySchema', () => {
  test('accepts a lightweight people search entry', () => {
    expect(() => PeopleSearchEntrySchema.parse(validEntry)).not.toThrow();
  });

  test('normalizes identity, email, and keywords', () => {
    const entry = PeopleSearchEntrySchema.parse({
      ...validEntry,
      identity: 'S21513',
      email: 'S21513@SCI.PDN.AC.LK',
      keywords: ['Jane Student'],
    });

    expect(entry.identity).toBe('s21513');
    expect(entry.email).toBe('s21513@sci.pdn.ac.lk');
    expect(entry.keywords).toEqual(['jane student']);
  });

  test('rejects entries without searchable keywords', () => {
    expect(() =>
      PeopleSearchEntrySchema.parse({ ...validEntry, keywords: [] })
    ).toThrow();
  });

  test('rejects links outside the public people profile route', () => {
    expect(() =>
      PeopleSearchEntrySchema.parse({ ...validEntry, href: '/staff/academic' })
    ).toThrow();
  });
});

describe('PeopleSearchIndexSchema', () => {
  test('accepts an array of search entries', () => {
    expect(() => PeopleSearchIndexSchema.parse([validEntry])).not.toThrow();
  });
});
