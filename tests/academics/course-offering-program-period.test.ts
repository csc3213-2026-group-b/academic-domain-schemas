import { describe, it, expect } from 'bun:test';
import { CourseSchema } from '../../src/schemas/course.schema.js';
import { CourseOfferingSchema } from '../../src/schemas/course-offering.schema.js';
import { CourseStaffSchema } from '../../src/schemas/course-staff.schema.js';
import { AcademicPeriodSchema } from '../../src/schemas/academic-period.schema.js';
import {
  ProgramSchema,
  HonoursStreamSchema,
} from '../../src/schemas/academic-program.schema.js';

// ─── Course ────────────────────────────────────────────────────────

describe('CourseSchema', () => {
  const validCourse = {
    code: 'CSC3213' as const,
    title: 'Software Engineering',
    credits: 3 as const,
  };

  it('accepts a valid course', () => {
    expect(() => CourseSchema.parse(validCourse)).not.toThrow();
  });

  it('accepts a course with alternative code', () => {
    expect(() =>
      CourseSchema.parse({
        ...validCourse,
        alternativeCode: 'CSC3112',
      })
    ).not.toThrow();
  });

  it('accepts all valid credit values', () => {
    const credits = [1, 2, 3, 6] as const;
    for (const c of credits) {
      expect(() =>
        CourseSchema.parse({ ...validCourse, credits: c })
      ).not.toThrow();
    }
  });

  it('rejects invalid credit values', () => {
    expect(() => CourseSchema.parse({ ...validCourse, credits: 4 })).toThrow();
  });

  it('rejects an unknown course code', () => {
    expect(() =>
      CourseSchema.parse({ ...validCourse, code: 'XYZ9999' })
    ).toThrow();
  });

  it('rejects missing title', () => {
    expect(() => CourseSchema.parse({ code: 'CSC3213', credits: 3 })).toThrow();
  });
});

// ─── Course Staff ──────────────────────────────────────────────────

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

// ─── Academic Period ───────────────────────────────────────────────

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

// ─── Course Offering ───────────────────────────────────────────────

describe('CourseOfferingSchema', () => {
  const validOffering = {
    course: 'CSC3213' as const,
    period: { year: 2026, semester: 'SEM1' as const },
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

  it('rejects missing course', () => {
    expect(() =>
      CourseOfferingSchema.parse({
        year: 2026,
        period: { year: 2026, semester: 'SEM1' },
        staff: [],
      })
    ).toThrow();
  });

  it('accepts an academic-year range', () => {
    expect(() =>
      CourseOfferingSchema.parse({
        ...validOffering,
        period: {
          year: '2025/2026',
          semester: 'SEM1',
        },
      })
    ).not.toThrow();
  });

  it('rejects an invalid academic-year range', () => {
    expect(() =>
      CourseOfferingSchema.parse({
        ...validOffering,
        period: {
          year: '2025/2027',
          semester: 'SEM1',
        },
      })
    ).toThrow();
  });
});

// ─── Program ───────────────────────────────────────────────────────

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

// ─── Honours Stream ───────────────────────────────────────────────

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
