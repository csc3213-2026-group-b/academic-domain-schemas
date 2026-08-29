# Release And Publishing

[Docs home](./README.md) | [Public API](./public-api.md)

This package uses Bun for local scripts and Changesets for versioning. Publish a
new package version only after the schema contract, docs, tests, and changeset
all describe the same public API.

## Script Reference

| Script                     | Purpose                                                          |
| -------------------------- | ---------------------------------------------------------------- |
| `bun run typecheck`        | Type-check source files with `tsc --noEmit`.                     |
| `bun run typecheck:test`   | Type-check test files with `tsconfig.test.json`.                 |
| `bun test`                 | Run the Bun test suite.                                          |
| `bun run lint`             | Run ESLint across the repository.                                |
| `bun run format`           | Format the whole repository with Prettier.                       |
| `bun run format:check`     | Check formatting without writing files.                          |
| `bun run build`            | Build `dist` and rewrite path aliases with `tsc-alias`.          |
| `bun run clean`            | Remove `dist`.                                                   |
| `bun run changeset`        | Create a Changeset entry for the next release.                   |
| `bun run version-packages` | Apply pending Changesets to `package.json` and `CHANGELOG.md`.   |
| `bun run knip`             | Check for unused files, exports, and dependencies.               |
| `bun run knip:depcheck`    | Check only dependency usage with Knip.                           |
| `bun run lint-staged`      | Run staged-file checks used by the pre-commit hook.              |
| `bun run prepublishOnly`   | Build before publishing. This runs automatically during publish. |

## Changeset Types

Use SemVer based on the public schema contract:

- `patch`: docs, tests, or compatible validation fixes.
- `minor`: new schemas, optional fields, new enum values, or helpers that do not
  break existing valid data.
- `major`: renamed fields, removed values, stricter required fields, changed
  discriminated union variants, or changed parsing behavior for existing data.

Examples of major changes:

- replacing `honoursStream` with `honoursProgramme`,
- changing singular `department` metadata to `departments`,
- requiring `subjects` on programme variants,
- removing enum values such as `OTHER`.

## Major Release Workflow

1. Confirm `main` is clean and up to date.

   ```sh
   git fetch --prune
   git status --branch --short
   ```

2. Add or update a Changeset with a `major` bump.

   ```sh
   bun run changeset
   ```

   The frontmatter should look like this:

   ```md
   ---
   '@csc3213-2026-group-b/academic-domain-schemas': major
   ---
   ```

3. Run the full pre-release checks.

   ```sh
   bun run typecheck
   bun run typecheck:test
   bun test
   bun run lint
   bun run format:check
   bun run build
   bun run knip
   ```

4. Commit and push the schema/docs/changeset work.

   ```sh
   git add .
   git commit -m "feat!: update academic schema contract"
   git push origin main
   ```

5. Apply the Changeset version bump.

   ```sh
   bun run version-packages
   ```

   For a major release from `4.2.0`, this should update the package to `5.0.0`
   and move the Changeset text into `CHANGELOG.md`.

6. Run the checks again after versioning.

   ```sh
   bun run typecheck
   bun run typecheck:test
   bun test
   bun run lint
   bun run build
   ```

7. Commit and push the version commit.

   ```sh
   git add package.json CHANGELOG.md .changeset
   git commit -m "chore: version packages"
   git push origin main
   ```

8. Publish to npm from a clean checkout with npm access.

   ```sh
   bunx changeset publish
   ```

   `prepublishOnly` runs `bun run build` during publish.

9. Create and push a Git tag if the publish process did not already do it.

   ```sh
   git tag v5.0.0
   git push origin v5.0.0
   ```

## Release Notes Checklist

Before publishing a major version, call out:

- removed or renamed fields,
- required new fields,
- changed enum values,
- migration examples for common records,
- repositories that must update before consuming the new version.
