import { describe, expect, it } from 'bun:test';
import { z } from 'zod';

import {
  AcademicDepartmentSchema,
  AcademicSubjectDepartmentMap,
  AcademicSubjectSchema,
  AcademicUnitSchema,
  HonoursProgrammeDepartmentMap,
  ScienceAcademicDepartments,
  ScienceAcademicSubjects,
  ScienceAcademicUnits,
} from '@/schemas/academics/academic-organization.schema';
import { AcademicPeriodSchema } from '@/schemas/academics/academic-period.schema';
import {
  HonoursStreamSchema,
  ProgramSchema,
} from '@/schemas/academics/academic-program.schema';

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

describe('ProgramSchema', () => {
  it('accepts GENERAL program', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'GENERAL',
        title: 'BSc',
        durationYears: 3,
        subjects: ['BIOLOGY_DOUBLE', 'MATHEMATICS_DOUBLE', 'STATISTICS'],
      })
    ).not.toThrow();
  });

  it('accepts GENERAL program with two subjects', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'GENERAL',
        title: 'BSc',
        durationYears: 3,
        subjects: ['BIOLOGY_DOUBLE', 'CHEMISTRY'],
      })
    ).not.toThrow();
  });

  it('accepts HONOURS program with stream', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'HONOURS',
        title: 'BSc(Hons)',
        durationYears: 4,
        subjects: ['COMPUTER_SCIENCE', 'STATISTICS', 'MATHEMATICS'],
        honoursProgramme: 'COMPUTER_SCIENCE',
      })
    ).not.toThrow();
  });

  it('accepts SOR program', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'SOR',
        title: 'BSc(Hons) Statistics and Operations Research',
        durationYears: 4,
        subjects: ['STATISTICS', 'MATHEMATICS'],
      })
    ).not.toThrow();
  });

  it('accepts SOR program with Computer Science as the third subject', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'SOR',
        title: 'BSc(Hons) Statistics and Operations Research',
        durationYears: 4,
        subjects: ['STATISTICS', 'MATHEMATICS', 'COMPUTER_SCIENCE'],
      })
    ).not.toThrow();
  });

  it('accepts applied sciences honours program', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'APPLIED_SCIENCES',
        title: 'BSc(Hons) Applied Sciences',
        durationYears: 4,
        subjects: ['CHEMISTRY', 'PHYSICS', 'MATHEMATICS'],
      })
    ).not.toThrow();
  });

  it('rejects GENERAL with wrong title', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'GENERAL',
        title: 'Wrong',
        durationYears: 3,
        subjects: ['COMPUTER_SCIENCE', 'STATISTICS'],
      })
    ).toThrow();
  });

  it('rejects GENERAL with fewer than two subjects', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'GENERAL',
        title: 'BSc',
        durationYears: 3,
        subjects: ['COMPUTER_SCIENCE'],
      })
    ).toThrow();
  });

  it('rejects GENERAL with more than three subjects', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'GENERAL',
        title: 'BSc',
        durationYears: 3,
        subjects: ['COMPUTER_SCIENCE', 'STATISTICS', 'MATHEMATICS', 'PHYSICS'],
      })
    ).toThrow();
  });

  it('rejects duplicate programme subjects', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'GENERAL',
        title: 'BSc',
        durationYears: 3,
        subjects: ['STATISTICS', 'STATISTICS'],
      })
    ).toThrow();
  });

  it('rejects HONOURS without honoursProgramme', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'HONOURS',
        title: 'BSc(Hons)',
        durationYears: 4,
        subjects: ['COMPUTER_SCIENCE', 'STATISTICS'],
      })
    ).toThrow();
  });

  it('rejects SOR without Statistics', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'SOR',
        title: 'BSc(Hons) Statistics and Operations Research',
        durationYears: 4,
        subjects: ['MATHEMATICS', 'COMPUTER_SCIENCE'],
      })
    ).toThrow();
  });

  it('rejects SOR without Mathematics', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'SOR',
        title: 'BSc(Hons) Statistics and Operations Research',
        durationYears: 4,
        subjects: ['STATISTICS', 'COMPUTER_SCIENCE'],
      })
    ).toThrow();
  });

  it('rejects SOR with non-SOR subjects', () => {
    expect(() =>
      ProgramSchema.parse({
        code: 'SOR',
        title: 'BSc(Hons) Statistics and Operations Research',
        durationYears: 4,
        subjects: ['STATISTICS', 'MATHEMATICS', 'PHYSICS'],
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

  it('accepts BIOMEDICAL_SCIENCE', () => {
    expect(() => HonoursStreamSchema.parse('BIOMEDICAL_SCIENCE')).not.toThrow();
  });

  it('accepts DATA_SCIENCE', () => {
    expect(() => HonoursStreamSchema.parse('DATA_SCIENCE')).not.toThrow();
  });

  it('accepts MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY', () => {
    expect(() =>
      HonoursStreamSchema.parse('MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY')
    ).not.toThrow();
  });

  it('accepts STATISTICS', () => {
    expect(() => HonoursStreamSchema.parse('STATISTICS')).not.toThrow();
  });

  it('rejects a general subject as an honours stream when it is not an honours programme', () => {
    expect(() => HonoursStreamSchema.parse('BIOLOGY')).toThrow();
  });
});

describe('Academic organization schemas', () => {
  it('exports hardcoded science departments, units, and subjects', () => {
    expect(() =>
      z.array(AcademicDepartmentSchema).parse(ScienceAcademicDepartments)
    ).not.toThrow();
    expect(() =>
      z.array(AcademicUnitSchema).parse(ScienceAcademicUnits)
    ).not.toThrow();
    expect(() =>
      z.array(AcademicSubjectSchema).parse(ScienceAcademicSubjects)
    ).not.toThrow();
  });

  it('accepts science departments', () => {
    expect(() =>
      AcademicDepartmentSchema.parse({
        code: 'ENVIRONMENTAL_AND_INDUSTRIAL_SCIENCES',
        faculty: 'SCIENCE',
        name: 'Department of Environmental and Industrial Sciences',
      })
    ).not.toThrow();
  });

  it('accepts science units', () => {
    expect(() =>
      AcademicUnitSchema.parse({
        code: 'SCIENCE_EDUCATION_UNIT',
        faculty: 'SCIENCE',
        name: 'Science Education Unit',
      })
    ).not.toThrow();
  });

  it('accepts selectable general subjects linked to departments', () => {
    expect(() =>
      AcademicSubjectSchema.parse({
        code: 'MATHEMATICS_DOUBLE',
        name: 'Mathematics**',
        departments: ['MATHEMATICS'],
      })
    ).not.toThrow();
  });

  it('accepts selectable subjects linked to multiple departments', () => {
    expect(() =>
      AcademicSubjectSchema.parse({
        code: 'BIOLOGY_DOUBLE',
        name: 'Biology**',
        departments: [
          'BOTANY',
          'MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY',
          'ZOOLOGY',
        ],
      })
    ).not.toThrow();
  });

  it('accepts honours programmes attached to departments', () => {
    expect(() =>
      AcademicDepartmentSchema.parse({
        code: 'STATISTICS_AND_COMPUTER_SCIENCE',
        faculty: 'SCIENCE',
        name: 'Department of Statistics and Computer Science',
        honoursProgrammes: ['COMPUTER_SCIENCE', 'DATA_SCIENCE', 'STATISTICS'],
      })
    ).not.toThrow();
  });

  it('rejects supplementary subjects as academic subject codes', () => {
    expect(() =>
      AcademicSubjectSchema.parse({
        code: 'BASIC_COMPUTING',
        name: 'Basic Computing',
        departments: ['STATISTICS_AND_COMPUTER_SCIENCE'],
      })
    ).toThrow();
  });

  it('rejects duplicate subject departments', () => {
    expect(() =>
      AcademicSubjectSchema.parse({
        code: 'MATHEMATICS_SINGLE',
        name: 'Mathematics*',
        departments: ['MATHEMATICS', 'MATHEMATICS'],
      })
    ).toThrow();
  });

  it('couples SCS honours programmes to the SCS department', () => {
    expect(HonoursProgrammeDepartmentMap.COMPUTER_SCIENCE).toBe(
      'STATISTICS_AND_COMPUTER_SCIENCE'
    );
    expect(HonoursProgrammeDepartmentMap.DATA_SCIENCE).toBe(
      'STATISTICS_AND_COMPUTER_SCIENCE'
    );
    expect(HonoursProgrammeDepartmentMap.STATISTICS).toBe(
      'STATISTICS_AND_COMPUTER_SCIENCE'
    );
    expect(
      HonoursProgrammeDepartmentMap.STATISTICS_AND_OPERATIONS_RESEARCH
    ).toBe('STATISTICS_AND_COMPUTER_SCIENCE');
  });

  it('couples mathematics subjects to the Mathematics department', () => {
    expect(AcademicSubjectDepartmentMap.MATHEMATICS).toEqual(['MATHEMATICS']);
    expect(AcademicSubjectDepartmentMap.MATHEMATICS_SINGLE).toEqual([
      'MATHEMATICS',
    ]);
    expect(AcademicSubjectDepartmentMap.MATHEMATICS_DOUBLE).toEqual([
      'MATHEMATICS',
    ]);
  });

  it('couples biology subjects to Botany, MBB, and Zoology', () => {
    expect(AcademicSubjectDepartmentMap.BIOLOGY_SINGLE).toEqual([
      'BOTANY',
      'MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY',
      'ZOOLOGY',
    ]);
    expect(AcademicSubjectDepartmentMap.BIOLOGY_DOUBLE).toEqual([
      'BOTANY',
      'MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY',
      'ZOOLOGY',
    ]);
  });
});
