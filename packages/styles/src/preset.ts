import { definePreset } from "@pandacss/dev";
import { recipes } from "./recipes";
import { semanticTokens, tokens } from "./theme";

/**
 * The 75NeoUI design system as a Panda preset.
 *
 * Apps consume it through `@75neo/styles` so the CSS they generate lines up with the
 * class names the component packages emit at runtime.
 */
export const preset = definePreset({
  name: "@75neo/styles",
  conditions: {
    extend: {
      dark: '.dark &, [data-theme="dark"] &',
      light: ':root &, [data-theme="light"] &',
    },
  },
  // Ship every recipe variant. A consumer that picks a variant at runtime
  // (`<Button variant={someState} />`) can't be statically extracted, so the CSS has
  // to be there already.
  staticCss: {
    recipes: "*",
  },
  theme: {
    extend: {
      tokens,
      semanticTokens,
      recipes,
    },
  },
  globalCss: {
    extend: {
      "html, body": {
        bg: "bg.canvas",
        color: "fg",
        fontFamily: "sans",
      },
    },
  },
});

export default preset;
