# Research Schemas

[Docs home](./README.md) | [Public API](./public-api.md) | [Academics](./academics.md) | [Courses](./courses.md) | [People](./people.md) | [Projects](./projects.md)

The research domain contains reusable research activity shapes used mostly by
people profiles. It is deliberately lightweight: richer research systems can
compose these records without forcing every public profile to carry a large
research model.

## Quick Read

| Schema              | Purpose                             | Main Consumers                                   |
| ------------------- | ----------------------------------- | ------------------------------------------------ |
| `ConferenceSchema`  | Conference attendance/profile entry | Academic teaching staff                          |
| `ResearchSchema`    | Ongoing or past research activity   | Academic teaching staff                          |
| `PublicationSchema` | Publication metadata                | Students, academic teaching staff, project links |

## Source Files

- [`conference.schema.ts`](../src/schemas/research/conference.schema.ts)
- [`research.schema.ts`](../src/schemas/research/research.schema.ts)
- [`research-publication.schema.ts`](../src/schemas/research/research-publication.schema.ts)

## Relationship Diagram

```mermaid
%%{init: {"theme": "base", "themeVariables": {"primaryColor": "#f8fafc", "primaryTextColor": "#0f172a", "primaryBorderColor": "#64748b", "lineColor": "#475569"}}}%%
flowchart TD
  ConferenceSchema["ConferenceSchema"]
  ResearchSchema["ResearchSchema"]
  PublicationSchema["PublicationSchema"]
  AcademicTeachingStaffSchema["AcademicTeachingStaffSchema"]
  StudentSchema["StudentSchema"]
  ProjectLinksSchema["ProjectLinksSchema<br/>publication URL"]

  ConferenceSchema --> AcademicTeachingStaffSchema
  ResearchSchema --> AcademicTeachingStaffSchema
  PublicationSchema --> AcademicTeachingStaffSchema
  PublicationSchema --> StudentSchema
  PublicationSchema --> ProjectLinksSchema

  click AcademicTeachingStaffSchema "./people.md" "Academic teaching staff docs"
  click StudentSchema "./people.md" "Student docs"
  click ProjectLinksSchema "./projects.md" "Project links docs"

  classDef research fill:#0f172a,color:#ffffff,stroke:#0f172a
  classDef consumer fill:#f8fafc,color:#0f172a,stroke:#64748b
  class ConferenceSchema,ResearchSchema,PublicationSchema research
  class AcademicTeachingStaffSchema,StudentSchema,ProjectLinksSchema consumer
```

## Schemas

### ConferenceSchema

Conference profile entry:

- `name`: required.
- `date`: required string.
- `location`: optional.
- `description`: optional.
- `icon`: optional URL.

### ResearchSchema

Research activity entry:

- `title`: required.
- `description`: optional.
- `startDate`: required string.
- `endDate`: optional.
- `icon`: optional URL.
- `website`: optional URL.

### PublicationSchema

Publication entry:

- `title`: required.
- `journal`: optional.
- `publicationDate`: optional.
- `coAuthors`: optional array of strings.
- `description`: optional.
- `doi`: optional object with `doiId` and `doiUrl`.
- `url`: optional URL.
- `icon`: optional URL.

## Future Notes

- Keep dates as strings unless every consumer is ready for stricter ISO date
  validation.
- Keep publications reusable by students and staff.
- If research records become externally managed, introduce a stable identifier
  before adding cross-repository references.
