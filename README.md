# Welcome to the Academic Domain Schemas Package

This package contains shared TypeScript domain schemas and Zod validation models for a single academic department system, covering staff, academic programs, courses, students, and year-dependent relationships.

## Usage

This package provides Zod schemas that can be used to validate data structures related to the academic domain. To use these schemas, follow these steps:

1. Install the package using npm:

   ```bash
   // Using npm:
   npm install @csc3213-2026-group-b/academic-domain-schemas@latest
   // or using bun:
   bun add @csc3213-2026-group-b/academic-domain-schemas@latest
   ```

2. Import and use the schemas in your project as needed.

   ```javascript
   import { YourSchema } from '@csc3213-2026-group-b/academic-domain-schemas';
   ```

   > NOTE: Do not import the schemas from subdirectories within the package, as the destination paths may change in the future. Always import directly from the package root to ensure compatibility with future updates.

## Contribution Guidelines

Please follow these guidelines:

1. Fork the package and create a new branch for your feature or bug fix.
2. Make your changes and ensure that they adhere to the project's coding standards.
3. Submit a pull request with a clear description of your changes.
4. Participate in the code review process and make any requested changes.

By following these guidelines, you help maintain the quality and integrity of the project. Thank you for your contributions!
