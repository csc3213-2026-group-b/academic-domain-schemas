import { describe, expect, it } from 'bun:test';

import { CourseSchema } from '@/schemas/courses/course.schema';
import { CourseOfferingSchema } from '@/schemas/courses/course-offering.schema';
import { CourseStaffSchema } from '@/schemas/courses/course-staff.schema';

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
