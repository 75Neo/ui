import type { OxlintConfig } from "oxlint";

export const ignorePatterns = [
  "**/dist/**",
  "**/storybook-static/**",
  ".agents/skills/**",
  ".claude/skills/**",
];

export const oxlintConfig: OxlintConfig = {
  plugins: ["react", "react-perf", "jsdoc", "vue", "typescript", "oxc", "import", "unicorn"],
  jsPlugins: ["oxlint-tailwindcss"],
  categories: {
    correctness: "error",
    suspicious: "warn",
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
  },
  overrides: [
    {
      files: ["packages/react/**", "apps/playground-react/**"],
      rules: {
        "react/rules-of-hooks": "error",
        "react/react-in-jsx-scope": "off",
      },
    },
    {
      files: ["packages/vue/**", "apps/playground-vue/**"],
      plugins: ["vue"],
      rules: {},
    },
  ],
};
