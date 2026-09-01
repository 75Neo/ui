import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "oxc", "import", "unicorn", "eslint", "promise"],
  overrides: [
    /** React */
    {
      files: ["packages/react/**"],
      plugins: ["react", "react-perf"],
      rules: {
        "react/rules-of-hooks": "error",
        "react/react-in-jsx-scope": "error",
      },
    },
    /** Vue */
    {
      files: ["packages/vue/**"],
      plugins: ["vue"],
    },
    /** Playground previews — the automatic JSX runtime is on here, so no `react-in-jsx-scope`. */
    {
      files: ["apps/playground/**"],
      plugins: ["react", "vue"],
      rules: {
        "react/rules-of-hooks": "error",
      },
    },
  ],
});
