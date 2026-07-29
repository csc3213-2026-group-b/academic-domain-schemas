# @csc3213-2026-group-b/academic-domain-schemas

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
