import { describe, it, expect } from 'bun:test';
import { AcademicRankSchema } from '../../src/schemas/academic-teaching/academic-rank.schema.js';
import { AcademicTeachingStaffSchema } from '../../src/schemas/academic-teaching/academic-teaching-staff.schema.js';
import { AcademicSupportPositionSchema } from '../../src/schemas/academic-support/academic-support-position.schema.js';
import { AcademicSupportStaffSchema } from '../../src/schemas/academic-support/academic-support-staff.schema.js';
import { NonAcademicPositionSchema } from '../../src/schemas/non-academic/non-academic-position.schema.js';
import { NonAcademicStaffSchema } from '../../src/schemas/non-academic/non-academic-staff.schema.js';

// ─── Academic Rank ─────────────────────────────────────────────────

describe('AcademicRankSchema', () => {
  it('accepts all valid ranks', () => {
    const ranks = [
      'ASSISTANT_DEMONSTRATOR',
      'TEMPORARY_DEMONSTRATOR',
      'DEMONSTRATOR',
      'TEMPORARY_LECTURER',
      'PROBATIONARY_LECTURER',
      'LECTURER',
      'SENIOR_LECTURER',
      'PROFESSOR',
      'SENIOR_PROFESSOR',
      'EMERITUS_PROFESSOR',
    ] as const;
    for (const rank of ranks) {
      expect(() => AcademicRankSchema.parse(rank)).not.toThrow();
    }
  });

  it('rejects an invalid rank', () => {
    expect(() => AcademicRankSchema.parse('ASSOCIATE_PROFESSOR')).toThrow();
  });

  it('rejects an empty string', () => {
    expect(() => AcademicRankSchema.parse('')).toThrow();
  });
});

// ─── Academic Teaching Staff ──────────────────────────────────────

describe('AcademicTeachingStaffSchema', () => {
  const base = {
    title: 'Prof' as const,
    fullName: 'Dr. Alice Smith',
    staffType: 'ACADEMIC_TEACHING' as const,
    academicRank: 'PROFESSOR' as const,
  };

  it('accepts minimal valid teaching staff', () => {
    expect(() => AcademicTeachingStaffSchema.parse(base)).not.toThrow();
  });

  it('accepts teaching staff with all optional fields', () => {
    expect(() =>
      AcademicTeachingStaffSchema.parse({
        ...base,
        email: 'alice@example.com',
        qualifications: [
          {
            degree: 'PhD Computer Science',
            institution: 'MIT',
            graduationYear: '2010',
          },
        ],
        officePhone: '+94123456789',
        officeLocation: 'Room 301',
        positionsHeld: [{ name: 'Dean', startDate: '2022-01-01' }],
        awards: [{ name: 'Best Researcher', date: '2023' }],
        website: 'https://alice.example.com',
        researchInterests: [
          {
            primaryFocus: ['AI', 'ML'],
            otherInterests: ['HCI'],
          },
        ],
        researchOngoing: [{ title: 'AI Ethics', startDate: '2025-01-01' }],
        publications: [{ title: 'A Groundbreaking Paper' }],
        keyPublications: [{ title: 'Key Paper' }],
        conferences_attended: [{ name: 'ICSE', date: '2025-05-15' }],
        teachings: ['CSC3213'],
        cvUrl: 'https://alice.example.com/cv.pdf',
        profileImageUrl: 'https://example.com/alice.jpg',
        mobilePhone: '+94123456789',
      })
    ).not.toThrow();
  });

  it('rejects missing academicRank', () => {
    expect(() =>
      AcademicTeachingStaffSchema.parse({
        title: 'Prof',
        fullName: 'Dr. Alice',
        staffType: 'ACADEMIC_TEACHING',
      })
    ).toThrow();
  });

  it('rejects invalid academicRank', () => {
    expect(() =>
      AcademicTeachingStaffSchema.parse({
        ...base,
        academicRank: 'INVALID_RANK',
      })
    ).toThrow();
  });

  it('rejects invalid email', () => {
    expect(() =>
      AcademicTeachingStaffSchema.parse({
        ...base,
        email: 'not-an-email',
      })
    ).toThrow();
  });
});

// ─── Academic Support Position ─────────────────────────────────────

describe('AcademicSupportPositionSchema', () => {
  it('accepts all valid positions', () => {
    const positions = [
      'PROGRAMMER_SYSTEMS_ANALYST',
      'SYSTEMS_ANALYST',
      'PROGRAMMER',
      'IT_SUPPORT_OFFICER',
      'NETWORK_ADMINISTRATOR',
      'DATABASE_ADMINISTRATOR',
    ] as const;
    for (const pos of positions) {
      expect(() => AcademicSupportPositionSchema.parse(pos)).not.toThrow();
    }
  });

  it('rejects an invalid position', () => {
    expect(() => AcademicSupportPositionSchema.parse('CEO')).toThrow();
  });
});

// ─── Academic Support Staff ───────────────────────────────────────

describe('AcademicSupportStaffSchema', () => {
  const base = {
    title: 'Mr' as const,
    fullName: 'Bob Support',
    staffType: 'ACADEMIC_SUPPORT' as const,
    designation: 'SYSTEMS_ANALYST' as const,
  };

  it('accepts minimal valid support staff', () => {
    expect(() => AcademicSupportStaffSchema.parse(base)).not.toThrow();
  });

  it('accepts support staff with optional fields', () => {
    expect(() =>
      AcademicSupportStaffSchema.parse({
        ...base,
        email: 'bob@example.com',
        qualifications: ['BSc IT', 'MSc CS'],
        officePhone: '+94123456789',
        profileImageUrl: 'https://example.com/bob.jpg',
        mobilePhone: '+94123456789',
      })
    ).not.toThrow();
  });

  it('rejects missing designation', () => {
    expect(() =>
      AcademicSupportStaffSchema.parse({
        title: 'Mr',
        fullName: 'Bob',
        staffType: 'ACADEMIC_SUPPORT',
      })
    ).toThrow();
  });

  it('rejects invalid designation', () => {
    expect(() =>
      AcademicSupportStaffSchema.parse({
        ...base,
        designation: 'INVALID',
      })
    ).toThrow();
  });
});

// ─── Non-Academic Position ─────────────────────────────────────────

describe('NonAcademicPositionSchema', () => {
  it('accepts all valid positions', () => {
    const positions = [
      'STAFF_TECHNICAL_OFFICER',
      'TECHNICAL_OFFICER_GRADE_I',
      'TECHNICAL_OFFICER_GRADE_II',
      'TECHNICAL_OFFICER_GRADE_III',
      'SENIOR_STAFF_ASSISTANT',
      'STAFF_ASSISTANT',
      'COMPUTER_APPLICATION_ASSISTANT',
      'LAB_ATTENDANT',
      'WORKS_AIDE',
      'OFFICE_ASSISTANT',
      'CLERK',
    ] as const;
    for (const pos of positions) {
      expect(() => NonAcademicPositionSchema.parse(pos)).not.toThrow();
    }
  });

  it('rejects an invalid position', () => {
    expect(() => NonAcademicPositionSchema.parse('DIRECTOR')).toThrow();
  });
});

// ─── Non-Academic Staff ───────────────────────────────────────────

describe('NonAcademicStaffSchema', () => {
  const base = {
    title: 'Mrs' as const,
    fullName: 'Carol Admin',
    staffType: 'NON_ACADEMIC' as const,
    designation: 'STAFF_ASSISTANT' as const,
  };

  it('accepts minimal valid non-academic staff', () => {
    expect(() => NonAcademicStaffSchema.parse(base)).not.toThrow();
  });

  it('accepts non-academic staff with optional fields', () => {
    expect(() =>
      NonAcademicStaffSchema.parse({
        ...base,
        email: 'carol@example.com',
        officePhone: '+94123456789',
        profileImageUrl: 'https://example.com/carol.jpg',
        mobilePhone: '+94123456789',
      })
    ).not.toThrow();
  });

  it('rejects missing designation', () => {
    expect(() =>
      NonAcademicStaffSchema.parse({
        title: 'Mrs',
        fullName: 'Carol',
        staffType: 'NON_ACADEMIC',
      })
    ).toThrow();
  });

  it('rejects invalid designation', () => {
    expect(() =>
      NonAcademicStaffSchema.parse({
        ...base,
        designation: 'INVALID',
      })
    ).toThrow();
  });
});
