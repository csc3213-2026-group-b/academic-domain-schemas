import { describe, expect, it } from 'bun:test';

import { AcademicYearSchema } from '@/schemas/academics/academic-year.schema';

describe('Academic Year', () => {
  it.each(['2024/2025', '2025/2026', '1999/2000', '2099/2100'])(
    'accepts %s',
    (value: string) => {
      expect(() => AcademicYearSchema.parse(value)).not.toThrow();
    }
  );

  it.each([
    '2025/2025',
    '2025/2027',
    '2026/2025',
    '25/26',
    '2025-2026',
    '2025//2026',
    '',
    'abcd/efgh',
    '2025',
    '/2026',
    '2025/',
  ])('rejects %s', (value: string) => {
    expect(() => AcademicYearSchema.parse(value)).toThrow();
  });
});
