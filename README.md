# Welcome to the Academic Domain Schemas Repository

This repository contains shared TypeScript domain schemas and Zod validation models for a single academic department system, covering staff, academic programs, courses, students, and year-dependent relationships.

## Usage

This repository provides JSON schemas that can be used to validate data structures related to the academic domain. To use these schemas, follow these steps:

1. Create a file named `.npmrc` in the root directory of your project.
2. Add the following line to the `.npmrc` file to configure the npm registry:

   ```bash
   //npm.pkg.github.com/:_authToken=TOKEN
   @academic-domain-schemas:registry=https://npm.pkg.github.com
   ```

   - Replace `TOKEN` with your GitHub Personal Access Token (PAT) that has the necessary permissions to access the package.
   - Note: Ensure that your PAT has at least the `read:packages` scope.
   - For more information on creating a PAT, refer to the [GitHub documentation](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

3. Install the package using npm:

   ```bash
   // Using npm:
   npm install @csc3213-2026-group-b/academic-domain-schemas@latest
   // or using bun:
   bun install @csc3213-2026-group-b/academic-domain-schemas@latest
   ```

4. Import and use the schemas in your project as needed.

   ```javascript
   import { YourSchema } from '@csc3213-2026-group-b/academic-domain-schemas';
   ```

## Contribution Guidelines

Please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure that they adhere to the project's coding standards.
3. Submit a pull request with a clear description of your changes.
4. Participate in the code review process and make any requested changes.

By following these guidelines, you help maintain the quality and integrity of the project. Thank you for your contributions!
