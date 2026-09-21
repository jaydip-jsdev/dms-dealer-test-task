import { config as baseConfig } from "@repo/eslint-config/base";

/**
 * Root ESLint configuration for the monorepo.
 * This is used when ESLint is run from the root directory (e.g., by lint-staged).
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  ...baseConfig,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/coverage/**",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.ts",
      "pnpm-lock.yaml",
    ],
  },
];