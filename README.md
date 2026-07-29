# Academic Domain Schemas

Shared TypeScript and Zod schemas for the SCS PDN academic data model.

This package is the contract layer used by the portal, API, GitHub App, public
data validators, and public sites. It defines the JSON shapes for people,
students, staff, courses, course offerings, projects, research objects, and
other department-owned records.

## What This Package Owns

- People and staff profile schemas.
- Student profile schemas.
- Academic program, course, and course offering schemas.
- Project registry schemas.
- Shared object schemas such as publications, social links, and S-number
  validation.

Consumers should import from the package root only:

```ts
import {
  ProjectSchema,
  StudentSchema,
  type Project,
  type Student,
} from '@csc3213-2026-group-b/academic-domain-schemas';
```

Do not import from internal `src/` or `dist/` subpaths. Those paths are not part
of the public contract.

## Student Profile Model

Student records keep category, track, level, and status separate:

- `studentType`: `UNDERGRADUATE` or `POSTGRADUATE`
- `studentTrack`: optional `GENERAL` or `HONOURS`
- `level`: optional `1000`, `2000`, `3000`, or `4000`
- `status`: `CURRENT` or `ALUMNI`

`level` is only the academic year or level. Do not use old category values such
as `UNDERGRADUATE`, `POSTGRADUATE`, or `ALUMNI` as `level`.

## Local Development

```sh
bun install
bun run typecheck
bun test
bun run build
```

Useful scripts:

- `bun run dev` - watch TypeScript builds.
- `bun run build` - compile the package into `dist/`.
- `bun test` - run schema tests.
- `bun run format:check` - check formatting.
- `bun run lint-staged` - run the same staged-file checks as the pre-commit
  hook.

## Publishing

The package is published as
`@csc3213-2026-group-b/academic-domain-schemas`. Version changes should be made
intentionally because downstream repos use this package as their validation
contract.
