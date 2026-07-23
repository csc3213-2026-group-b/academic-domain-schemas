import { describe, expect, it } from 'bun:test';
import {
  ProjectSchema,
  type Project,
} from '../../src/schemas/objects/project/project.schema.js';

const baseProject = {
  id: 'prj-scholarship-system',
  slug: 'scholarship-management-system',
  title: 'Scholarship Management System',
  shortDescription:
    'A workflow platform for scholarship applications and review decisions.',
  description:
    'This department-facing system organizes scholarship applications from intake to review.',
  projectType: 'DEPARTMENT_SYSTEM' as const,
  status: 'ACTIVE' as const,
  categories: ['department-systems', 'student-services'],
  tags: ['Next.js', 'Workflow'],
  academicYear: '2025/2026',
  course: {
    code: 'CSC3213' as const,
    title: 'Software Systems Design Project',
  },
  batch: '2021',
  groupNumber: 'B',
  people: [
    {
      name: 'CSC3213 Group B',
      role: 'student' as const,
      sNumber: 'S21SP001',
    },
    {
      name: 'SCS Academic Staff',
      role: 'supervisor' as const,
      username: 'scs.staff',
    },
  ],
  links: {
    repository: 'https://github.com/csc3213-2026-group-b',
    documentation: 'https://github.com/csc3213-2026-group-b',
  },
  source: {
    kind: 'TEMPLATE_INDEX_JSON' as const,
    repositoryName: 's21-csc3213-group-b',
    repositoryOwner: 'csc3213-2026-group-b',
    metadataPath: '.docs/index.json',
  },
  media: {
    icon: 'GraduationCap',
    coverImage: '/images/science-projects-hero.png',
  },
  dates: {
    startedAt: '2026-05-01',
    lastUpdatedAt: '2026-07-23',
  },
};

describe('ProjectSchema', () => {
  it('accepts a department system with optional course linkage', () => {
    const project = ProjectSchema.parse(baseProject) as Project;

    expect(project.projectType).toBe('DEPARTMENT_SYSTEM');
    expect(project.course?.code).toBe('CSC3213');
    expect(project.people[0].sNumber).toBe('S21SP001');
  });

  it('accepts a research project without a course', () => {
    expect(() =>
      ProjectSchema.parse({
        ...baseProject,
        id: 'prj-rainfall-trends',
        slug: 'rainfall-trend-analysis-sri-lanka',
        title: 'Rainfall Trend Analysis in Sri Lanka',
        projectType: 'RESEARCH_PROJECT',
        categories: ['research', 'statistics'],
        course: undefined,
        batch: undefined,
        groupNumber: undefined,
        source: {
          kind: 'MANUAL',
          curator: 'SCS Project Registry',
        },
      })
    ).not.toThrow();
  });

  it('requires course metadata for course projects', () => {
    expect(() =>
      ProjectSchema.parse({
        ...baseProject,
        projectType: 'COURSE_PROJECT',
        course: undefined,
      })
    ).toThrow();
  });

  it('rejects invalid people, URLs, and date order', () => {
    expect(() =>
      ProjectSchema.parse({
        ...baseProject,
        people: [{ name: 'Bad Student', role: 'student', sNumber: 'S21' }],
      })
    ).toThrow();

    expect(() =>
      ProjectSchema.parse({
        ...baseProject,
        links: { repository: 'not-a-url' },
      })
    ).toThrow();

    expect(() =>
      ProjectSchema.parse({
        ...baseProject,
        dates: {
          startedAt: '2026-07-23',
          completedAt: '2026-05-01',
          lastUpdatedAt: '2026-07-23',
        },
      })
    ).toThrow();
  });
});
