import { z } from 'zod';

export const FacultyCodeSchema = z.enum(['SCIENCE']);

export const AcademicDepartmentCodeSchema = z.enum([
  'BOTANY',
  'CHEMISTRY',
  'ENVIRONMENTAL_AND_INDUSTRIAL_SCIENCES',
  'GEOLOGY',
  'MATHEMATICS',
  'MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY',
  'PHYSICS',
  'STATISTICS_AND_COMPUTER_SCIENCE',
  'ZOOLOGY',
]);

export const AcademicUnitCodeSchema = z.enum([
  'COMPUTER_UNIT',
  'SCIENCE_EDUCATION_UNIT',
]);

export const HonoursProgrammeCodeSchema = z.enum([
  'APPLIED_SCIENCES',
  'BIOMEDICAL_SCIENCE',
  'BOTANY',
  'CHEMISTRY',
  'COMPUTER_SCIENCE',
  'DATA_SCIENCE',
  'ENVIRONMENTAL_SCIENCE',
  'GEOLOGY',
  'MATHEMATICS',
  'MICROBIOLOGY',
  'MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY',
  'PHYSICS',
  'STATISTICS',
  'STATISTICS_AND_OPERATIONS_RESEARCH',
  'ZOOLOGY',
]);

export const AcademicSubjectCodeSchema = z.enum([
  'APPLIED_SCIENCES',
  'BIOLOGY_DOUBLE',
  'BIOLOGY_SINGLE',
  'BIOMEDICAL_SCIENCE',
  'BOTANY',
  'CHEMISTRY',
  'COMPUTER_SCIENCE',
  'DATA_SCIENCE',
  'ENVIRONMENTAL_SCIENCE',
  'GEOLOGY',
  'MATHEMATICS',
  'MATHEMATICS_DOUBLE',
  'MATHEMATICS_SINGLE',
  'MICROBIOLOGY',
  'MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY',
  'PHYSICS',
  'STATISTICS',
  'ZOOLOGY',
]);

const Faculty = FacultyCodeSchema.enum;
const Department = AcademicDepartmentCodeSchema.enum;
const Unit = AcademicUnitCodeSchema.enum;
const HonoursProgramme = HonoursProgrammeCodeSchema.enum;
const Subject = AcademicSubjectCodeSchema.enum;

export const PrincipalSubjectArea1000LevelCodes = [
  Subject.BIOLOGY_SINGLE,
  Subject.BIOLOGY_DOUBLE,
  Subject.CHEMISTRY,
  Subject.COMPUTER_SCIENCE,
  Subject.GEOLOGY,
  Subject.MATHEMATICS_SINGLE,
  Subject.MATHEMATICS_DOUBLE,
  Subject.PHYSICS,
  Subject.STATISTICS,
] as const satisfies readonly AcademicSubjectCode[];

export const UpperLevelSubjectCodes = [
  Subject.BOTANY,
  Subject.CHEMISTRY,
  Subject.COMPUTER_SCIENCE,
  Subject.GEOLOGY,
  Subject.MATHEMATICS,
  Subject.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY,
  Subject.PHYSICS,
  Subject.STATISTICS,
  Subject.ZOOLOGY,
] as const satisfies readonly AcademicSubjectCode[];

export const SpecialDegreeSubjectCodes = [
  Subject.APPLIED_SCIENCES,
  Subject.BIOMEDICAL_SCIENCE,
  Subject.DATA_SCIENCE,
  Subject.ENVIRONMENTAL_SCIENCE,
  Subject.MICROBIOLOGY,
] as const satisfies readonly AcademicSubjectCode[];

export const AcademicSubjectSelectionSchema = z
  .array(AcademicSubjectCodeSchema)
  .min(2)
  .max(3)
  .refine(
    (subjects) => new Set(subjects).size === subjects.length,
    'subjects must not contain duplicates'
  );

export const AcademicDepartmentSchema = z.object({
  code: AcademicDepartmentCodeSchema,
  faculty: FacultyCodeSchema,
  name: z.string().trim().min(1),
  honoursProgrammes: z
    .array(HonoursProgrammeCodeSchema)
    .default([])
    .refine(
      (programmes) => new Set(programmes).size === programmes.length,
      'honoursProgrammes must not contain duplicates'
    ),
});

export const AcademicUnitSchema = z.object({
  code: AcademicUnitCodeSchema,
  faculty: FacultyCodeSchema,
  name: z.string().trim().min(1),
});

export const AcademicSubjectSchema = z.object({
  code: AcademicSubjectCodeSchema,
  name: z.string().trim().min(1),
  departments: z
    .array(AcademicDepartmentCodeSchema)
    .default([])
    .refine(
      (departments) => new Set(departments).size === departments.length,
      'departments must not contain duplicates'
    ),
});

export type FacultyCode = z.infer<typeof FacultyCodeSchema>;
export type AcademicDepartmentCode = z.infer<
  typeof AcademicDepartmentCodeSchema
>;
export type AcademicUnitCode = z.infer<typeof AcademicUnitCodeSchema>;
export type HonoursProgrammeCode = z.infer<typeof HonoursProgrammeCodeSchema>;
export type AcademicSubjectCode = z.infer<typeof AcademicSubjectCodeSchema>;
export type AcademicSubjectSelection = z.infer<
  typeof AcademicSubjectSelectionSchema
>;
export type AcademicDepartment = z.infer<typeof AcademicDepartmentSchema>;
export type AcademicUnit = z.infer<typeof AcademicUnitSchema>;
export type AcademicSubject = z.infer<typeof AcademicSubjectSchema>;

export const HonoursProgrammeDepartmentMap = {
  [HonoursProgramme.APPLIED_SCIENCES]:
    Department.ENVIRONMENTAL_AND_INDUSTRIAL_SCIENCES,
  [HonoursProgramme.BIOMEDICAL_SCIENCE]: Department.ZOOLOGY,
  [HonoursProgramme.BOTANY]: Department.BOTANY,
  [HonoursProgramme.CHEMISTRY]: Department.CHEMISTRY,
  [HonoursProgramme.COMPUTER_SCIENCE]:
    Department.STATISTICS_AND_COMPUTER_SCIENCE,
  [HonoursProgramme.DATA_SCIENCE]: Department.STATISTICS_AND_COMPUTER_SCIENCE,
  [HonoursProgramme.ENVIRONMENTAL_SCIENCE]:
    Department.ENVIRONMENTAL_AND_INDUSTRIAL_SCIENCES,
  [HonoursProgramme.GEOLOGY]: Department.GEOLOGY,
  [HonoursProgramme.MATHEMATICS]: Department.MATHEMATICS,
  [HonoursProgramme.MICROBIOLOGY]: Department.BOTANY,
  [HonoursProgramme.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY]:
    Department.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY,
  [HonoursProgramme.PHYSICS]: Department.PHYSICS,
  [HonoursProgramme.STATISTICS]: Department.STATISTICS_AND_COMPUTER_SCIENCE,
  [HonoursProgramme.STATISTICS_AND_OPERATIONS_RESEARCH]:
    Department.STATISTICS_AND_COMPUTER_SCIENCE,
  [HonoursProgramme.ZOOLOGY]: Department.ZOOLOGY,
} satisfies Record<HonoursProgrammeCode, AcademicDepartmentCode>;

export const AcademicSubjectDepartmentMap = {
  [Subject.APPLIED_SCIENCES]: [
    Department.ENVIRONMENTAL_AND_INDUSTRIAL_SCIENCES,
  ],
  [Subject.BIOLOGY_DOUBLE]: [
    Department.BOTANY,
    Department.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY,
    Department.ZOOLOGY,
  ],
  [Subject.BIOLOGY_SINGLE]: [
    Department.BOTANY,
    Department.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY,
    Department.ZOOLOGY,
  ],
  [Subject.BIOMEDICAL_SCIENCE]: [Department.ZOOLOGY],
  [Subject.BOTANY]: [Department.BOTANY],
  [Subject.CHEMISTRY]: [Department.CHEMISTRY],
  [Subject.COMPUTER_SCIENCE]: [Department.STATISTICS_AND_COMPUTER_SCIENCE],
  [Subject.DATA_SCIENCE]: [Department.STATISTICS_AND_COMPUTER_SCIENCE],
  [Subject.ENVIRONMENTAL_SCIENCE]: [
    Department.ENVIRONMENTAL_AND_INDUSTRIAL_SCIENCES,
  ],
  [Subject.GEOLOGY]: [Department.GEOLOGY],
  [Subject.MATHEMATICS]: [Department.MATHEMATICS],
  [Subject.MATHEMATICS_DOUBLE]: [Department.MATHEMATICS],
  [Subject.MATHEMATICS_SINGLE]: [Department.MATHEMATICS],
  [Subject.MICROBIOLOGY]: [Department.BOTANY],
  [Subject.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY]: [
    Department.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY,
  ],
  [Subject.PHYSICS]: [Department.PHYSICS],
  [Subject.STATISTICS]: [Department.STATISTICS_AND_COMPUTER_SCIENCE],
  [Subject.ZOOLOGY]: [Department.ZOOLOGY],
} satisfies Record<AcademicSubjectCode, AcademicDepartmentCode[]>;

export const ScienceAcademicDepartments = [
  {
    code: Department.BOTANY,
    faculty: Faculty.SCIENCE,
    name: 'Department of Botany',
    honoursProgrammes: [HonoursProgramme.BOTANY, HonoursProgramme.MICROBIOLOGY],
  },
  {
    code: Department.CHEMISTRY,
    faculty: Faculty.SCIENCE,
    name: 'Department of Chemistry',
    honoursProgrammes: [HonoursProgramme.CHEMISTRY],
  },
  {
    code: Department.ENVIRONMENTAL_AND_INDUSTRIAL_SCIENCES,
    faculty: Faculty.SCIENCE,
    name: 'Department of Environmental and Industrial Sciences',
    honoursProgrammes: [
      HonoursProgramme.ENVIRONMENTAL_SCIENCE,
      HonoursProgramme.APPLIED_SCIENCES,
    ],
  },
  {
    code: Department.GEOLOGY,
    faculty: Faculty.SCIENCE,
    name: 'Department of Geology',
    honoursProgrammes: [HonoursProgramme.GEOLOGY],
  },
  {
    code: Department.MATHEMATICS,
    faculty: Faculty.SCIENCE,
    name: 'Department of Mathematics',
    honoursProgrammes: [HonoursProgramme.MATHEMATICS],
  },
  {
    code: Department.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY,
    faculty: Faculty.SCIENCE,
    name: 'Department of Molecular Biology and Biotechnology',
    honoursProgrammes: [HonoursProgramme.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY],
  },
  {
    code: Department.PHYSICS,
    faculty: Faculty.SCIENCE,
    name: 'Department of Physics',
    honoursProgrammes: [HonoursProgramme.PHYSICS],
  },
  {
    code: Department.STATISTICS_AND_COMPUTER_SCIENCE,
    faculty: Faculty.SCIENCE,
    name: 'Department of Statistics and Computer Science',
    honoursProgrammes: [
      HonoursProgramme.COMPUTER_SCIENCE,
      HonoursProgramme.DATA_SCIENCE,
      HonoursProgramme.STATISTICS,
      HonoursProgramme.STATISTICS_AND_OPERATIONS_RESEARCH,
    ],
  },
  {
    code: Department.ZOOLOGY,
    faculty: Faculty.SCIENCE,
    name: 'Department of Zoology',
    honoursProgrammes: [
      HonoursProgramme.ZOOLOGY,
      HonoursProgramme.BIOMEDICAL_SCIENCE,
    ],
  },
] satisfies AcademicDepartment[];

export const ScienceAcademicUnits = [
  {
    code: Unit.COMPUTER_UNIT,
    faculty: Faculty.SCIENCE,
    name: 'Computer Unit',
  },
  {
    code: Unit.SCIENCE_EDUCATION_UNIT,
    faculty: Faculty.SCIENCE,
    name: 'Science Education Unit',
  },
] satisfies AcademicUnit[];

export const ScienceAcademicSubjects = [
  {
    code: Subject.APPLIED_SCIENCES,
    name: 'Applied Sciences',
    departments: AcademicSubjectDepartmentMap.APPLIED_SCIENCES,
  },
  {
    code: Subject.BIOLOGY_DOUBLE,
    name: 'Biology**',
    departments: AcademicSubjectDepartmentMap.BIOLOGY_DOUBLE,
  },
  {
    code: Subject.BIOLOGY_SINGLE,
    name: 'Biology*',
    departments: AcademicSubjectDepartmentMap.BIOLOGY_SINGLE,
  },
  {
    code: Subject.BIOMEDICAL_SCIENCE,
    name: 'Biomedical Science',
    departments: AcademicSubjectDepartmentMap.BIOMEDICAL_SCIENCE,
  },
  {
    code: Subject.BOTANY,
    name: 'Botany',
    departments: AcademicSubjectDepartmentMap.BOTANY,
  },
  {
    code: Subject.CHEMISTRY,
    name: 'Chemistry',
    departments: AcademicSubjectDepartmentMap.CHEMISTRY,
  },
  {
    code: Subject.COMPUTER_SCIENCE,
    name: 'Computer Science',
    departments: AcademicSubjectDepartmentMap.COMPUTER_SCIENCE,
  },
  {
    code: Subject.DATA_SCIENCE,
    name: 'Data Science',
    departments: AcademicSubjectDepartmentMap.DATA_SCIENCE,
  },
  {
    code: Subject.ENVIRONMENTAL_SCIENCE,
    name: 'Environmental Science',
    departments: AcademicSubjectDepartmentMap.ENVIRONMENTAL_SCIENCE,
  },
  {
    code: Subject.GEOLOGY,
    name: 'Geology',
    departments: AcademicSubjectDepartmentMap.GEOLOGY,
  },
  {
    code: Subject.MATHEMATICS,
    name: 'Mathematics',
    departments: AcademicSubjectDepartmentMap.MATHEMATICS,
  },
  {
    code: Subject.MATHEMATICS_DOUBLE,
    name: 'Mathematics**',
    departments: AcademicSubjectDepartmentMap.MATHEMATICS_DOUBLE,
  },
  {
    code: Subject.MATHEMATICS_SINGLE,
    name: 'Mathematics*',
    departments: AcademicSubjectDepartmentMap.MATHEMATICS_SINGLE,
  },
  {
    code: Subject.MICROBIOLOGY,
    name: 'Microbiology',
    departments: AcademicSubjectDepartmentMap.MICROBIOLOGY,
  },
  {
    code: Subject.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY,
    name: 'Molecular Biology and Biotechnology',
    departments:
      AcademicSubjectDepartmentMap.MOLECULAR_BIOLOGY_AND_BIOTECHNOLOGY,
  },
  {
    code: Subject.PHYSICS,
    name: 'Physics',
    departments: AcademicSubjectDepartmentMap.PHYSICS,
  },
  {
    code: Subject.STATISTICS,
    name: 'Statistics',
    departments: AcademicSubjectDepartmentMap.STATISTICS,
  },
  {
    code: Subject.ZOOLOGY,
    name: 'Zoology',
    departments: AcademicSubjectDepartmentMap.ZOOLOGY,
  },
] satisfies AcademicSubject[];
