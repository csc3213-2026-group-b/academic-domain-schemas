import { describe, it, expect } from 'bun:test';
import { CourseCodeSchema } from '../../src/schemas/objects/course/course-code.schema.js';
import { SNumberSchema } from '../../src/schemas/objects/student/s-number.schema.js';
import { ProjectSchema } from '../../src/schemas/objects/project/project.schema.js';
import type {
  IndividualProject,
  GroupProject,
} from '../../src/schemas/objects/project/project.schema.js';

// ─── Course Code ───────────────────────────────────────────────────

describe('CourseCodeSchema', () => {
  it('accepts a known course code', () => {
    expect(() => CourseCodeSchema.parse('CSC3213')).not.toThrow();
  });

  it('accepts another known course code', () => {
    expect(() => CourseCodeSchema.parse('CSC1002')).not.toThrow();
  });

  it('rejects an unknown course code', () => {
    expect(() => CourseCodeSchema.parse('XYZ9999')).toThrow();
  });

  it('rejects an empty string', () => {
    expect(() => CourseCodeSchema.parse('')).toThrow();
  });

  it('rejects a lowercase course code', () => {
    expect(() => CourseCodeSchema.parse('csc3213')).toThrow();
  });
});

// ─── S-Number ──────────────────────────────────────────────────────

describe('SNumberSchema', () => {
  it('accepts a valid S-number without SP', () => {
    expect(() => SNumberSchema.parse('S22123')).not.toThrow();
  });

  it('accepts a valid S-number with SP', () => {
    expect(() => SNumberSchema.parse('S22SP123')).not.toThrow();
  });

  it('rejects a plain number', () => {
    expect(() => SNumberSchema.parse('S22')).toThrow();
  });

  it('rejects an S-number with wrong format', () => {
    expect(() => SNumberSchema.parse('ST22123')).toThrow();
  });

  it('rejects an S-number with letters in sequence', () => {
    expect(() => SNumberSchema.parse('S22ABC123')).toThrow();
  });

  it('rejects an S-number with only two digits in sequence', () => {
    expect(() => SNumberSchema.parse('S2212')).toThrow();
  });

  it('rejects an empty string', () => {
    expect(() => SNumberSchema.parse('')).toThrow();
  });
});

// ─── Project ───────────────────────────────────────────────────────

const base = {
  title: 'Final Year Project',
  startDate: '2026-01-01',
  status: 'ACTIVE' as const,
  course: 'CSC3213' as const,
  academicYear: 2026,
  supervisors: ['jdoe'],
};

describe('ProjectSchema (Individual)', () => {
  it('accepts a valid individual project', () => {
    const proj = ProjectSchema.parse({
      ...base,
      projectType: 'INDIVIDUAL',
      studentId: 'S22SP123',
    }) as IndividualProject;
    expect(proj.projectType).toBe('INDIVIDUAL');
    expect(proj.studentId).toBe('S22SP123');
  });

  it('rejects an individual project without studentId', () => {
    expect(() =>
      ProjectSchema.parse({ ...base, projectType: 'INDIVIDUAL' })
    ).toThrow();
  });

  it('rejects an individual project with studentIds (array)', () => {
    expect(() =>
      ProjectSchema.parse({
        ...base,
        projectType: 'INDIVIDUAL',
        studentIds: ['S22SP123', 'S22SP456'],
      })
    ).toThrow();
  });
});

describe('ProjectSchema (Group)', () => {
  it('accepts a valid group project', () => {
    const proj = ProjectSchema.parse({
      ...base,
      projectType: 'GROUP',
      studentIds: ['S22SP123', 'S22SP456'],
    }) as GroupProject;
    expect(proj.projectType).toBe('GROUP');
    expect(proj.studentIds.length).toBe(2);
  });

  it('rejects a group project with only one student', () => {
    expect(() =>
      ProjectSchema.parse({
        ...base,
        projectType: 'GROUP',
        studentIds: ['S22SP123'],
      })
    ).toThrow();
  });

  it('rejects a group project without studentIds', () => {
    expect(() =>
      ProjectSchema.parse({
        ...base,
        projectType: 'GROUP',
      })
    ).toThrow();
  });
});

describe('ProjectSchema (shared)', () => {
  it('rejects missing title', () => {
    expect(() =>
      ProjectSchema.parse({
        ...base,
        projectType: 'INDIVIDUAL',
        studentId: 'S22SP123',
        title: undefined,
      })
    ).toThrow();
  });

  it('accepts a project with all optional fields', () => {
    expect(() =>
      ProjectSchema.parse({
        ...base,
        projectType: 'INDIVIDUAL',
        studentId: 'S22SP123',
        description: 'A great project',
        endDate: '2026-06-01',
        instructors: ['asmith'],
        icon: 'https://example.com/icon.png',
        repoUrl: 'https://github.com/example/repo',
        documentationUrl: 'https://docs.example.com',
        website: 'https://example.com',
        tags: ['AI', 'ML'],
      })
    ).not.toThrow();
  });

  it('rejects an invalid status', () => {
    expect(() =>
      ProjectSchema.parse({
        ...base,
        projectType: 'INDIVIDUAL',
        studentId: 'S22SP123',
        status: 'UNKNOWN',
      })
    ).toThrow();
  });
});
