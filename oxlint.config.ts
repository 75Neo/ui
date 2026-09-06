import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "oxc", "import", "unicorn", "eslint", "promise"],
  jsPlugins: ["oxlint-tailwindcss"],
  settings: {
    tailwindcss: {
      entryPoint: "src/styles/global.css",
    },
  },
  rules: {
    "tailwindcss/no-unknown-classes": "error",
  },
  overrides: [
    {
      files: ["src/components/react/**"],
      plugins: ["react", "react-perf"],
    },
    {
      files: ["src/components/vue/**"],
      plugins: ["vue"],
    },
  ],
});
