import { definePreset } from "@pandacss/dev";
import { recipes, slotRecipes } from "./recipes";
import { breakpoints, keyframes, semanticTokens, textStyles, tokens } from "./theme";

/**
 * The 75NeoUI design system as a Panda preset.
 *
 * Apps consume it through `@75neo/styles` so the CSS they generate lines up with the
 * class names the component packages emit at runtime.
 *
 * Layers, outermost first:
 *
 * 1. `theme/colors.ts` — raw palettes. Eleven steps, six hues, no meaning attached.
 * 2. `theme/semantic-tokens.ts` — what those palettes *mean* (`accent.default`,
 *    `fg.muted`), resolved per colour mode.
 * 3. `recipes/` — components, styled entirely against layer 2.
 *
 * Components only ever touch layer 3 and the non-colour scales. That is the rule that
 * keeps a single recipe driving React, Vue and Svelte at once.
 */
export const preset = definePreset({
  name: "@75neo/styles",

  /**
   * Colour mode is opt-in via a class or `data-theme`, with no `prefers-color-scheme`
   * fallback — the host app decides, so a user's saved choice can't be overridden by
   * their OS.
   *
   * Each condition matches the marked element *and* its descendants (`&.dark` as well as
   * `.dark &`). Without the first half, marking `<html>` would leave `<html>` itself on
   * the light values while everything inside it flipped.
   */
  conditions: {
    extend: {
      dark: '&.dark, .dark &, &[data-theme="dark"], [data-theme="dark"] &',
      light: '&.light, .light &, &[data-theme="light"], [data-theme="light"] &',
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
      breakpoints,
      tokens,
      semanticTokens,
      textStyles,
      keyframes,
      recipes,
      slotRecipes,
    },
  },

  globalCss: {
    extend: {
      html: {
        // Tells the browser which way to render native UI — scrollbars, form controls,
        // spellcheck underlines. Without it those stay light-themed in dark mode.
        colorScheme: "light",
        _dark: { colorScheme: "dark" },
      },
      "html, body": {
        bg: "bg.canvas",
        color: "fg.default",
        fontFamily: "sans",
        textStyle: "body.md",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      "::selection": {
        bg: "accent.muted",
        color: "accent.text",
      },
      // One focus ring for the whole system. Components override it only to change the
      // offset; they should never restyle its colour.
      ":focus-visible": {
        outline: "2px solid",
        outlineColor: "border.outline",
        outlineOffset: "2px",
      },
    },
  },
});

export default preset;
