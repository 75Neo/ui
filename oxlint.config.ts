import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "oxc", "import", "unicorn", "eslint", "promise"],
  jsPlugins: ["oxlint-tailwindcss"],
  settings: {
    tailwindcss: {
      entryPoint: [
        { files: "apps/docs/**", use: "apps/docs/src/assets/css/main.css" },
        { files: "apps/playground/**", use: "apps/playground/src/assets/css/main.css" },
        { files: "**", use: "packages/themes/src/tokens/lint.css" },
      ],
      attributes: ["ui"],
    },
  },
  rules: {
    "tailwindcss/no-unknown-classes": "error",
    "tailwindcss/no-duplicate-classes": "error",
    "tailwindcss/no-conflicting-classes": "error",
    "tailwindcss/no-contradicting-variants": "error",
    "tailwindcss/no-deprecated-classes": "error",
    "tailwindcss/no-unnecessary-whitespace": "error",
    "tailwindcss/no-hardcoded-colors": "error",
    "tailwindcss/prefer-theme-tokens": "warn",
    "tailwindcss/no-dark-without-light": "warn",
    "tailwindcss/enforce-sort-order": "warn",
    "tailwindcss/enforce-canonical": "warn",
    "tailwindcss/enforce-shorthand": "warn",
    "tailwindcss/consistent-variant-order": "warn",
    "tailwindcss/enforce-consistent-important-position": "warn",
    "tailwindcss/enforce-consistent-variable-syntax": "warn",
    "tailwindcss/enforce-negative-arbitrary-values": "warn",
  },
  overrides: [
    {
      files: ["packages/react/**"],
      plugins: ["react", "react-perf"],
      rules: {
        "react/rules-of-hooks": "error",
        "react/react-in-jsx-scope": "error",
      },
    },
    {
      files: ["packages/vue/**"],
      plugins: ["vue"],
    },
    {
      files: ["apps/playground/**"],
      plugins: ["react", "vue"],
      rules: {
        "react/rules-of-hooks": "error",
      },
    },
  ],
  ignorePatterns: [".agents/**/*.md"],
});
