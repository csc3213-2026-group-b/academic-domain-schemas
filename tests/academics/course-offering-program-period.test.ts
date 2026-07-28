import { describe, expect, it } from 'bun:test';
import { AcademicPeriodSchema } from '../../src/schemas/academic-period.schema.js';
import {
  HonoursStreamSchema,
  ProgramSchema,
} from '../../src/schemas/academic-program.schema.js';
import { CourseOfferingSchema } from '../../src/schemas/course-offering.schema.js';
import { CourseStaffSchema } from '../../src/schemas/course-staff.schema.js';
import { CourseSchema } from '../../src/schemas/course.schema.js';

describe('CourseSchema', () => {
  const validCourse = {
    id: 'software-engineering-project',
    primaryCode: 'CSC3213' as const,
    codes: ['CSC3213' as const],
    title: 'Software Engineering',
    credits: 3 as const,
  };

  it('accepts a valid course', () => {
    expect(() => CourseSchema.parse(validCourse)).not.toThrow();
  });

  it('accepts a course with multiple codes', () => {
    expect(() =>
      CourseSchema.parse({
        ...validCourse,
        codes: ['CSC3213', 'CSC3112'],
      })
    ).not.toThrow();
  });

  it('accepts all valid credit values', () => {
    const credits = [1, 2, 3, 6] as const;
    for (const creditsValue of credits) {
      expect(() =>
        CourseSchema.parse({ ...validCourse, credits: creditsValue })
      ).not.toThrow();
    }
  });

  it('rejects invalid credit values', () => {
    expect(() => CourseSchema.parse({ ...validCourse, credits: 4 })).toThrow();
  });

  it('rejects an unknown course code', () => {
    expect(() =>
      CourseSchema.parse({ ...validCourse, codes: ['XYZ9999'] })
    ).toThrow();
  });

  it('rejects a primary code that is not listed in codes', () => {
    expect(() =>
      CourseSchema.parse({
        ...validCourse,
        primaryCode: 'CSC3112',
      })
    ).toThrow();
  });

  it('rejects duplicate course codes', () => {
    expect(() =>
      CourseSchema.parse({
        ...validCourse,
        codes: ['CSC3213', 'CSC3213'],
      })
    ).toThrow();
  });

  it('rejects missing title', () => {
    expect(() =>
      CourseSchema.parse({
        id: 'software-engineering-project',
        primaryCode: 'CSC3213',
        codes: ['CSC3213'],
        credits: 3,
      })
    ).toThrow();
  });
});

describe('CourseStaffSchema', () => {
  const validStaff = {
    staff: 'jdoe',
    role: 'LECTURER' as const,
  };

  it('accepts valid course staff', () => {
    expect(() => CourseStaffSchema.parse(validStaff)).not.toThrow();
  });

  it('accepts all valid roles', () => {
    const roles = [
      'COURSE_COORDINATOR',
      'LECTURER',
      'INSTRUCTOR',
      'TEACHING_ASSISTANT',
    ] as const;
    for (const role of roles) {
      expect(() =>
        CourseStaffSchema.parse({ staff: 'asmith', role })
      ).not.toThrow();
    }
  });

  it('rejects an invalid role', () => {
    expect(() =>
      CourseStaffSchema.parse({ staff: 'jdoe', role: 'DEAN' })
    ).toThrow();
  });

  it('rejects an invalid username', () => {
    expect(() =>
      CourseStaffSchema.parse({ staff: 'ab', role: 'LECTURER' })
    ).toThrow();
  });

  it('rejects missing staff', () => {
    expect(() => CourseStaffSchema.parse({ role: 'LECTURER' })).toThrow();
  });
});

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

describe('CourseOfferingSchema', () => {
  const validOffering = {
    id: 'csc3213-2025-2026-sem1',
    courseId: 'software-engineering-project',
    academicYear: '2025/2026',
    semester: 'SEM1' as const,
    staff: [],
  };

  it('accepts a valid course offering', () => {
    expect(() => CourseOfferingSchema.parse(validOffering)).not.toThrow();
  });

  it('accepts a course offering with staff', () => {
    expect(() =>
      CourseOfferingSchema.parse({
        ...validOffering,
        staff: [{ staff: 'jdoe', role: 'LECTURER' }],
      })
    ).not.toThrow();
  });

  it('rejects missing course id', () => {
    expect(() =>
      CourseOfferingSchema.parse({
        id: 'csc3213-2025-2026-sem1',
        academicYear: '2025/2026',
        semester: 'SEM1',
        staff: [],
      })
    ).toThrow();
  });

  it('accepts an academic-year range', () => {
    expect(() =>
      CourseOfferingSchema.parse({
        ...validOffering,
        academicYear: '2025/2026',
      })
    ).not.toThrow();
  });

  it('rejects an invalid academic-year range', () => {
    expect(() =>
      CourseOfferingSchema.parse({
        ...validOffering,
        academicYear: '2025/2027',
      })
    ).toThrow();
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
