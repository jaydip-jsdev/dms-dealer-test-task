import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

import { config as baseConfig } from "./base.js";

/**
 * ESLint configuration for React applications using Vite.
 * Includes React Fast Refresh support and browser environment.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,

      // ============================================
      // React Core Rules
      // ============================================

      // React scope no longer necessary with new JSX transform
      "react/react-in-jsx-scope": "off",

      // React Fast Refresh rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Disable prop-types (using TypeScript instead)
      "react/prop-types": "off",

      // Require display names for debugging
      "react/display-name": "warn",

      // Prevent missing key props in lists
      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
        },
      ],

      // Prevent using array index as key
      "react/no-array-index-key": "warn",

      // Prevent use of dangerouslySetInnerHTML
      "react/no-danger": "warn",

      // Warn about deprecated React APIs
      "react/no-deprecated": "warn",

      // Prevent unescaped entities in JSX
      "react/no-unescaped-entities": "warn",

      // Detect unused prop types
      "react/no-unused-prop-types": "warn",

      // Enforce self-closing tags
      "react/self-closing-comp": "warn",

      // ============================================
      // React JSX Rules
      // ============================================

      // Enforce boolean props without explicit true
      "react/jsx-boolean-value": ["warn", "never"],

      // Prevent unnecessary curly braces
      "react/jsx-curly-brace-presence": [
        "warn",
        {
          props: "never",
          children: "never",
        },
      ],

      // Enforce fragment syntax
      "react/jsx-fragments": ["warn", "syntax"],

      // Prevent unnecessary fragments
      "react/jsx-no-useless-fragment": "warn",

      // Enforce PascalCase for component names
      "react/jsx-pascal-case": "warn",

      // Prevent leaked renders (e.g., {count && <Component />})
      "react/jsx-no-leaked-render": [
        "warn",
        {
          validStrategies: ["ternary", "coerce"],
        },
      ],

      // Prevent duplicate props
      "react/jsx-no-duplicate-props": "error",

      // Enforce consistent spacing in JSX
      "react/jsx-child-element-spacing": "warn",

      // Prevent inline functions in JSX (performance)
      "react/jsx-no-bind": [
        "warn",
        {
          allowArrowFunctions: true, // Allow arrow functions
          allowBind: false,
          allowFunctions: false,
        },
      ],

      // Enforce closing bracket location
      "react/jsx-closing-bracket-location": ["warn", "line-aligned"],

      // Enforce closing tag location
      "react/jsx-closing-tag-location": "warn",

      // Enforce consistent indentation
      "react/jsx-indent": ["warn", 2],
      "react/jsx-indent-props": ["warn", 2],

      // ============================================
      // React Hooks Rules
      // ============================================

      // Must be error - hooks rules are critical
      "react-hooks/rules-of-hooks": "error",

      // Warn about missing dependencies in useEffect, useMemo, etc.
      "react-hooks/exhaustive-deps": "warn",

      // ============================================
      // React Performance Rules
      // ============================================

      // Prevent unnecessary re-renders (requires react/jsx-no-bind)
      "react/no-unstable-nested-components": "warn",

      // ============================================
      // Re-apply critical base rules
      // ============================================

      "no-console": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "*.config.*"],
  },
];
