import { describe, it, expect } from 'bun:test';
import { PersonSchema } from '../../src/schemas/person.schema.js';
import { StaffSchema } from '../../src/schemas/staff.schema.js';
import {
  AlumniBatchListSchema,
  PostgraduateProgrammeDefinitionListSchema,
  StudentPlacementListSchema,
  StudentStreamDefinitionListSchema,
  StudentSchema,
} from '../../src/schemas/student.schema.js';

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
    studentType: 'UNDERGRADUATE' as const,
    studentTrack: 'HONOURS' as const,
    level: '4000' as const,
    status: 'CURRENT' as const,
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
        researchInterests: ['AI', 'ML'],
        publications: [{ title: 'My Paper' }],
        positions: [
          {
            name: 'Class Rep',
            startDate: '2025-01-01',
          },
        ],
        socialLinks: {
          urls: { github: 'janestudent' },
        },
      })
    ).not.toThrow();
  });

  it('rejects missing registrationNo', () => {
    expect(() =>
      StudentSchema.parse({ ...validStudent, registrationNo: undefined })
    ).toThrow();
  });

  it('rejects missing student type', () => {
    expect(() =>
      StudentSchema.parse({ ...validStudent, studentType: undefined })
    ).toThrow();
  });

  it('rejects missing status', () => {
    expect(() =>
      StudentSchema.parse({ ...validStudent, status: undefined })
    ).toThrow();
  });

  it('rejects the old category values as level', () => {
    expect(() =>
      StudentSchema.parse({ ...validStudent, level: 'UNDERGRADUATE' })
    ).toThrow();
  });

  it('accepts all valid student type enum values', () => {
    const studentTypes = ['UNDERGRADUATE', 'POSTGRADUATE'] as const;
    for (const studentType of studentTypes) {
      expect(() =>
        StudentSchema.parse({ ...validStudent, studentType })
      ).not.toThrow();
    }
  });

  it('accepts all valid student track enum values', () => {
    const studentTracks = ['GENERAL', 'HONOURS'] as const;
    for (const studentTrack of studentTracks) {
      expect(() =>
        StudentSchema.parse({ ...validStudent, studentTrack })
      ).not.toThrow();
    }
  });

  it('accepts all valid level enum values', () => {
    const levels = ['1000', '2000', '3000', '4000'] as const;
    for (const level of levels) {
      expect(() =>
        StudentSchema.parse({ ...validStudent, level })
      ).not.toThrow();
    }
  });

  it('accepts all valid status enum values', () => {
    const statuses = ['CURRENT', 'ALUMNI'] as const;
    for (const status of statuses) {
      expect(() =>
        StudentSchema.parse({ ...validStudent, status })
      ).not.toThrow();
    }
  });

  it('accepts postgraduate programme and SLQF level fields', () => {
    expect(() =>
      StudentSchema.parse({
        ...validStudent,
        studentType: 'POSTGRADUATE',
        studentTrack: undefined,
        level: undefined,
        postgraduateProgramme: 'MSC',
        slqfLevel: 'L10',
      })
    ).not.toThrow();
  });

  it('validates trusted undergraduate placement data', () => {
    expect(() =>
      StudentPlacementListSchema.parse([
        { batch: 's21', studentTrack: 'GENERAL', level: '3000' },
        { batch: 's21', studentTrack: 'HONOURS', level: '4000' },
      ])
    ).not.toThrow();
  });

  it('rejects general undergraduate placement at 4000 level', () => {
    expect(() =>
      StudentPlacementListSchema.parse([
        { batch: 's21', studentTrack: 'GENERAL', level: '4000' },
      ])
    ).toThrow('General students cannot be assigned to 4000 level');
  });

  it('validates compact alumni batch data', () => {
    expect(() =>
      AlumniBatchListSchema.parse([
        { batch: 's21', studentTracks: ['GENERAL'] },
        { batch: 's20', studentTracks: ['GENERAL', 'HONOURS'] },
      ])
    ).not.toThrow();
  });

  it('validates postgraduate programme definitions', () => {
    expect(() =>
      PostgraduateProgrammeDefinitionListSchema.parse([
        {
          programme: 'POSTGRADUATE_CERTIFICATE',
          label: 'Postgraduate Certificate',
          slqfLevel: 'L7',
        },
        {
          programme: 'PHD',
          label: 'Doctor of Philosophy (PhD)',
          slqfLevel: 'L12',
        },
      ])
    ).not.toThrow();
  });

  it('validates honours stream definitions', () => {
    expect(() =>
      StudentStreamDefinitionListSchema.parse([
        {
          stream: 'cs',
          label: 'Computer Science',
          directory: 'cs',
          publicDirectory: true,
        },
        {
          stream: 'sor',
          label: 'Statistics and Operations Research',
          publicDirectory: false,
        },
      ])
    ).not.toThrow();
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
