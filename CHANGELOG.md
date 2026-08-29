# @csc3213-2026-group-b/academic-domain-schemas

## 5.0.0

### Major Changes

- f58f8b0: Add Faculty of Science organization catalogue schemas, hardcoded department ownership for honours programmes and subjects, and faculty-aware department metadata across academic, people, course, and project schemas.

## 4.2.0

### Minor Changes

- 20d6f6c:

## 4.1.1

### Patch Changes

- Reject undergraduate placement rules that assign General students to 4000 level.

## 4.1.0

### Minor Changes

- 4fa942c: Add lightweight public people search index schemas.
- 2a32ae3: Add student placement metadata schemas and postgraduate programme/SLQF student profile fields.
- a7eba37: Add schema support for trusted student stream definitions.

## 4.0.0

### Major Changes

- Split student profile classification into studentType, studentTrack, level, and status.

## 3.1.0

### Minor Changes

- 978e1e4: Add canonical course and course-offering schemas, and require course projects to reference an offering.

## 3.0.0

### Major Changes

- Redesign `ProjectSchema` for the public SCS Projects registry.

  The project schema now models broad registry entries such as course projects,
  research projects, department systems, datasets, publication artifacts,
  open-source tools, collaborations, student innovations, hackathons, and other
  work. The previous `INDIVIDUAL` and `GROUP` course-project-only union has been
  removed.

## 1.0.0

### Major Changes

- 4c45ed0: Ready to production
