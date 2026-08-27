import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const importSortRules = {
  'simple-import-sort/exports': 'error',
  'simple-import-sort/imports': [
    'error',
    {
      groups: [
        ['^\\u0000'],
        ['^node:'],
        ['^bun:test$', '^zod$', '^@?\\w'],
        ['^@/'],
        ['^\\.'],
      ],
    },
  ],
};

export default [
  {
    ignores: ['dist/**', 'coverage/**'],
  },
  {
    files: ['*.config.{js,ts}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: importSortRules,
  },
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: importSortRules,
  },
];
