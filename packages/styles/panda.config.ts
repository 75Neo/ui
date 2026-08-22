import { defineConfig } from "@pandacss/dev";
import { preset } from "./src/preset";

/**
 * This config only runs `panda codegen`: it emits the runtime (`css`, `cva`, recipes,
 * patterns, tokens) that every 75NeoUI package imports from `@75neo/styles/*`.
 *
 * No CSS is extracted here — that happens in the consuming app, which loads the same
 * `preset` so the class names emitted at runtime match the CSS it generates.
 */
export default defineConfig({
  presets: ["@pandacss/preset-base", preset],
  include: [],
  outdir: "styled-system",
  outExtension: "mjs",
  importMap: "@75neo/styles",
  jsxFramework: undefined,
  preflight: false,

  // Token values only — a raw `padding: "13px"` or `color: "#eee"` is a type error.
  // These are the types every package consumes via `@75neo/styles/css`, so this is the
  // one config that actually enforces it; `pnpm check` is what surfaces a violation.
  strictTokens: true,
});
