# Academic Domain Schemas

Shared data definitions for Faculty of Science academic systems.

This package keeps the main academic data shapes in one place so faculty
portals, APIs, public sites, automation services, and data validators all agree
on the same structure.

## What It Is For

- People, student, and staff profiles.
- Faculty, department, academic unit, subject, and honours programme catalogues.
- Courses and course offerings.
- Project registry records.
- Reusable academic objects such as publications and social links.

## Using It

Install the package and import schemas from the package root:

```sh
bun add @csc3213-2026-group-b/academic-domain-schemas
```

```ts
import {
  ProgramSchema,
  ScienceAcademicDepartments,
  StudentSchema,
} from '@csc3213-2026-group-b/academic-domain-schemas';
```

The Faculty of Science catalogue includes hardcoded department ownership for
honours programmes and subject teaching departments. For example, Computer
Science, Data Science, Statistics, and Statistics and Operations Research are
attached to the Department of Statistics and Computer Science, while Biology
subjects are attached to Botany, Molecular Biology and Biotechnology, and
Zoology.

## Development

```sh
bun install
bun test
bun run build
```

Common maintenance scripts:

- `bun run typecheck`: type-check package source.
- `bun run typecheck:test`: type-check tests.
- `bun run lint`: run ESLint.
- `bun run format:check`: check formatting.
- `bun run build`: build the package output.
- `bun run changeset`: add release notes for the next version.
- `bun run version-packages`: apply pending Changesets to `package.json` and
  `CHANGELOG.md`.

For major breaking releases, add a `major` Changeset, run the full validation
suite, version the package, then publish with Changesets. See
[Release And Publishing](https://github.com/csc3213-2026-group-b/academic-domain-schemas/blob/main/docs/release.md).

## Documentation

Schema maps, Mermaid diagrams, and domain notes live in
[docs](https://github.com/csc3213-2026-group-b/academic-domain-schemas/blob/main/docs/README.md).

Use this repo when a shared academic JSON shape needs to change.
