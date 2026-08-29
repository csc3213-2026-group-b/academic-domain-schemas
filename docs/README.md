# Academic Domain Schemas Docs

Shared schema contracts for Faculty of Science academic data. These docs
explain the shape of the package the way maintainers need it: what each domain
owns, how schemas depend on each other, and where to make the next change.

## Start Here

| Need                                                        | Open                          |
| ----------------------------------------------------------- | ----------------------------- |
| Check what the package exports                              | [Public API](./public-api.md) |
| Change faculty, departments, units, subjects, or programmes | [Academics](./academics.md)   |
| Change course catalog or offerings                          | [Courses](./courses.md)       |
| Change students, staff, search, or social links             | [People](./people.md)         |
| Change project registry records                             | [Projects](./projects.md)     |
| Change publications, conferences, or research entries       | [Research](./research.md)     |
| Prepare a versioned package release                         | [Release](./release.md)       |

## Schema Landscape

```mermaid
%%{init: {"theme": "base", "themeVariables": {"primaryColor": "#f8fafc", "primaryTextColor": "#0f172a", "primaryBorderColor": "#64748b", "lineColor": "#475569", "tertiaryColor": "#e0f2fe"}}}%%
flowchart LR
  public["Public API<br/><code>src/index.ts</code>"]

  academics["Academics<br/>faculty, departments, subjects, programs"]
  courses["Courses<br/>catalog, staff, offerings"]
  people["People<br/>identity, profiles, search"]
  research["Research<br/>publications, conferences, activity"]
  projects["Projects<br/>registry records"]

  public --> academics
  public --> courses
  public --> people
  public --> research
  public --> projects

  academics --> courses
  academics --> projects
  people --> courses
  people --> projects
  research --> people
  courses --> projects

  classDef root fill:#0f172a,color:#ffffff,stroke:#0f172a
  classDef domain fill:#f8fafc,color:#0f172a,stroke:#64748b
  class public root
  class academics,courses,people,research,projects domain

  click public "./public-api.md" "Open public API docs"
  click academics "./academics.md" "Open academics docs"
  click courses "./courses.md" "Open courses docs"
  click people "./people.md" "Open people docs"
  click research "./research.md" "Open research docs"
  click projects "./projects.md" "Open projects docs"
```

## Domain Cards

| Domain                      | Owns                                                            | Depends On                    | Used By                        |
| --------------------------- | --------------------------------------------------------------- | ----------------------------- | ------------------------------ |
| [Academics](./academics.md) | Faculty, departments, units, subjects, years, periods, programs | None                          | Courses, people, projects      |
| [Courses](./courses.md)     | Course codes, catalog records, offerings                        | Academics, people identifiers | Projects, course data          |
| [People](./people.md)       | Persons, students, staff, search, social links                  | Research for profile content  | Courses, projects              |
| [Projects](./projects.md)   | Project registry records and project metadata                   | Academics, courses, people    | Public project registry        |
| [Research](./research.md)   | Publications, conferences, research activity                    | None                          | People profiles, project links |

## Change Workflow

1. Open the domain page for the schema you are changing.
2. Follow the diagram to see direct consumers.
3. Update [Public API](./public-api.md) when an exported schema, type, catalogue, or helper
   changes.
4. Keep the contract test aligned:
   [`tests/contract/public-api.test.ts`](../tests/contract/public-api.test.ts).
5. Run the package checks before delivery.

```sh
bun run lint
bun run format:check
bun run typecheck
bun run typecheck:test
bun test --coverage
bun run build
bun run knip
```

See [Release And Publishing](./release.md) before publishing a package version.

## Documentation Standard

Each domain page should stay short, navigable, and source-grounded:

- link every source file it describes,
- show relationships with Mermaid,
- call out validation rules that affect consumers,
- keep future notes about ownership and migration risk.
