import { describe, it, expect } from 'bun:test';
import { PersonSchema } from '../../src/schemas/person.schema.js';
import { StaffSchema } from '../../src/schemas/staff.schema.js';
import { StudentSchema } from '../../src/schemas/student.schema.js';

// ─── Person ────────────────────────────────────────────────────────

describe('PersonSchema', () => {
  const validPerson = {
    title: 'Dr' as const,
    fullName: 'John Doe',
  };

  it('accepts a minimal valid person', () => {
    expect(() => PersonSchema.parse(validPerson)).not.toThrow();
  });

  it('accepts a person with all optional fields', () => {
    expect(() =>
      PersonSchema.parse({
        ...validPerson,
        email: 'john@example.com',
        profileImageUrl: 'https://example.com/img.jpg',
        mobilePhone: '+94123456789',
      })
    ).not.toThrow();
  });

  it('rejects a person with invalid email', () => {
    expect(() =>
      PersonSchema.parse({ ...validPerson, email: 'not-an-email' })
    ).toThrow();
  });

  it('rejects a person with invalid profileImageUrl', () => {
    expect(() =>
      PersonSchema.parse({ ...validPerson, profileImageUrl: 'not-a-url' })
    ).toThrow();
  });

  it('rejects a person with invalid title', () => {
    expect(() =>
      PersonSchema.parse({ ...validPerson, title: 'King' })
    ).toThrow();
  });

  it('rejects missing fullName', () => {
    expect(() => PersonSchema.parse({ title: 'Dr' })).toThrow();
  });

  it('rejects missing title', () => {
    expect(() => PersonSchema.parse({ fullName: 'John Doe' })).toThrow();
  });

  it('accepts all valid title enum values', () => {
    const titles = ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'] as const;
    for (const title of titles) {
      expect(() =>
        PersonSchema.parse({ title, fullName: 'Test Person' })
      ).not.toThrow();
    }
  });
});

// ─── Student ───────────────────────────────────────────────────────

describe('StudentSchema', () => {
  const validStudent = {
    title: 'Mr' as const,
    fullName: 'Jane Student',
    registrationNo: 'S22SP123',
    level: 'UNDERGRADUATE' as const,
  };

  it('accepts a minimal valid student', () => {
    expect(() => StudentSchema.parse(validStudent)).not.toThrow();
  });

  it('accepts a student with optional fields', () => {
    expect(() =>
      StudentSchema.parse({
        ...validStudent,
        email: 'student@example.com',
        personalEmail: 'personal@example.com',
        profileImageUrl: 'https://example.com/img.jpg',
        mobilePhone: '+94123456789',
        research_interests: ['AI', 'ML'],
        publications: [{ title: 'My Paper' }],
        positions: [
          {
            name: 'Class Rep',
            startDate: '2025-01-01',
          },
        ],
        socialLinks: {
          usernames: [{ github: 'janestudent' }],
        },
      })
    ).not.toThrow();
  });

  it('rejects missing registrationNo', () => {
    expect(() =>
      StudentSchema.parse({ ...validStudent, registrationNo: undefined })
    ).toThrow();
  });

  it('rejects missing level', () => {
    expect(() =>
      StudentSchema.parse({ ...validStudent, level: undefined })
    ).toThrow();
  });

  it('rejects an invalid level', () => {
    expect(() =>
      StudentSchema.parse({ ...validStudent, level: 'PHD' })
    ).toThrow();
  });

  it('accepts all valid level enum values', () => {
    const levels = ['UNDERGRADUATE', 'POSTGRADUATE', 'ALUMNI'] as const;
    for (const level of levels) {
      expect(() =>
        StudentSchema.parse({ ...validStudent, level })
      ).not.toThrow();
    }
  });

  it('rejects an invalid registration number', () => {
    expect(() =>
      StudentSchema.parse({ ...validStudent, registrationNo: 'BAD' })
    ).toThrow();
  });
});

// ─── Staff (discriminated union) ───────────────────────────────────

describe('StaffSchema', () => {
  it('accepts Academic Teaching staff', () => {
    expect(() =>
      StaffSchema.parse({
        title: 'Prof',
        fullName: 'Dr. Smith',
        staffType: 'ACADEMIC_TEACHING',
        academicRank: 'PROFESSOR',
      })
    ).not.toThrow();
  });

  it('accepts Academic Support staff', () => {
    expect(() =>
      StaffSchema.parse({
        title: 'Mr',
        fullName: 'Tech Support',
        staffType: 'ACADEMIC_SUPPORT',
        designation: 'SYSTEMS_ANALYST',
      })
    ).not.toThrow();
  });

  it('accepts Non-Academic staff', () => {
    expect(() =>
      StaffSchema.parse({
        title: 'Mrs',
        fullName: 'Office Admin',
        staffType: 'NON_ACADEMIC',
        designation: 'STAFF_ASSISTANT',
      })
    ).not.toThrow();
  });

  it('rejects an unknown staffType', () => {
    expect(() =>
      StaffSchema.parse({
        title: 'Dr',
        fullName: 'Unknown',
        staffType: 'UNKNOWN_TYPE',
      })
    ).toThrow();
  });

  it('rejects Academic Teaching without academicRank', () => {
    expect(() =>
      StaffSchema.parse({
        title: 'Prof',
        fullName: 'Dr. Smith',
        staffType: 'ACADEMIC_TEACHING',
      })
    ).toThrow();
  });
});
