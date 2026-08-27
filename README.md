# Academic Domain Schemas

Shared data definitions for the SCS PDN system.

This package keeps the main academic data shapes in one place so the portal,
API, public sites, automation services, and data validators all agree on the
same structure.

## What It Is For

- People, student, and staff profiles.
- Courses and course offerings.
- Project registry records.
- Reusable academic objects such as publications and social links.

## Using It

Install the package and import schemas from the package root:

```sh
bun add @csc3213-2026-group-b/academic-domain-schemas
```

```ts
import { StudentSchema } from '@csc3213-2026-group-b/academic-domain-schemas';
```

## Development

```sh
bun install
bun test
bun run build
```

## Documentation

Schema maps, Mermaid diagrams, and domain notes live in
[docs](./docs/README.md).

Use this repo when a shared academic JSON shape needs to change.
