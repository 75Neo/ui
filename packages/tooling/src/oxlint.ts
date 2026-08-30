import type { OxlintConfig } from "oxlint";

export const ignorePatterns = [
  "**/dist/**",
  "**/node_modules/**",
  ".turbo/**",
  "**/.turbo/**",
  ".agents/skills/**",
  ".claude/skills/**",
];

export const oxlintConfig: OxlintConfig = {
  plugins: ["react", "react-perf", "jsdoc", "vue", "typescript", "oxc", "import", "unicorn"],
  jsPlugins: ["oxlint-tailwindcss"],
  categories: {
    correctness: "error",
    suspicious: "warn",
    pedantic: "off",
    perf: "off",
    style: "off",
    restriction: "off",
  },
  settings: {
    tailwindcss: {
      entryPoint: "packages/styles/src/css/lint.css",
    },
  },
  ignorePatterns,
  rules: {
    "import/no-unassigned-import": "off",
    "tailwindcss/no-unknown-classes": "error",
    "tailwindcss/no-conflicting-classes": "error",
    "tailwindcss/enforce-sort-order": "off",
    "typescript/no-explicit-any": "error",
  },
  overrides: [
    {
      files: ["packages/react/**"],
      rules: {
        "react/rules-of-hooks": "error",
        "react/react-in-jsx-scope": "off",
      },
    },
    {
      files: ["packages/vue/**"],
      rules: {},
    },
    {
      files: ["**/*.test.*", "**/__tests__/**", "**/*.spec.*"],
      rules: {
        "unicorn/consistent-function-scoping": "off",
        "tailwindcss/no-unknown-classes": "off",
      },
    },
  ],
};
