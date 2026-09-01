import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  semi: true,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "all",
  sortTailwindcss: {
    functions: ["tv"],
    attributes: ["ui"],
    stylesheet: "packages/themes/src/tokens/lint.css",
  },
  ignorePatterns: [".agents/**", ".claude/**"],
});
