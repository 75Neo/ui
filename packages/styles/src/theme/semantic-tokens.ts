import { defineSemanticTokens } from "@pandacss/dev";

/**
 * The surface every component styles against. Each value resolves per color mode,
 * so a component never has to branch on `_dark` itself.
 */
export const semanticTokens = defineSemanticTokens({
  colors: {
    bg: {
      canvas: { value: { base: "{colors.gray.50}", _dark: "{colors.gray.950}" } },
      surface: { value: { base: "white", _dark: "{colors.gray.900}" } },
      muted: { value: { base: "{colors.gray.100}", _dark: "{colors.gray.800}" } },
      accent: {
        DEFAULT: { value: { base: "{colors.neo.600}", _dark: "{colors.neo.500}" } },
        hover: { value: { base: "{colors.neo.700}", _dark: "{colors.neo.400}" } },
        subtle: { value: { base: "{colors.neo.50}", _dark: "{colors.neo.950}" } },
      },
      danger: { value: { base: "{colors.red.600}", _dark: "{colors.red.500}" } },
    },
    fg: {
      DEFAULT: { value: { base: "{colors.gray.900}", _dark: "{colors.gray.50}" } },
      muted: { value: { base: "{colors.gray.500}", _dark: "{colors.gray.400}" } },
      onAccent: { value: { base: "white", _dark: "white" } },
      accent: { value: { base: "{colors.neo.700}", _dark: "{colors.neo.300}" } },
    },
    border: {
      DEFAULT: { value: { base: "{colors.gray.200}", _dark: "{colors.gray.800}" } },
      strong: { value: { base: "{colors.gray.300}", _dark: "{colors.gray.700}" } },
      accent: { value: { base: "{colors.neo.500}", _dark: "{colors.neo.400}" } },
    },
  },
});
