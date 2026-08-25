import type { OxfmtConfig } from "oxfmt";
import { ignorePatterns } from "./oxlint.ts";

export const oxfmtConfig: OxfmtConfig = {
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  ignorePatterns,
  sortTailwindcss: {
    functions: ["tv"],
  },
};
