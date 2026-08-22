import type { ButtonSlots, ButtonVariants } from "@75neo/styles";
import type { PropType } from "vue";

export type ButtonProps = ButtonVariants & {
  /**
   * Per-slot class overrides. A button is one element, so `ui.base` and `class` do the
   * same thing — `ui` exists so every component in the library takes the same two props.
   */
  ui?: ButtonSlots;
};

/**
 * Declared as a runtime props object rather than through `defineProps<ButtonProps>()`.
 * `ButtonVariants` is `VariantProps<typeof button>`, a mapped type the SFC compiler
 * cannot reduce to a list of prop names — a type-only declaration would compile to a
 * component with no props at all, and every variant would arrive as an attribute.
 */
export const buttonProps = {
  variant: { type: String as PropType<ButtonProps["variant"]>, default: undefined },
  size: { type: String as PropType<ButtonProps["size"]>, default: undefined },
  colorPalette: {
    type: String as PropType<ButtonProps["colorPalette"]>,
    default: undefined,
  },
  fullWidth: { type: Boolean as PropType<ButtonProps["fullWidth"]>, default: undefined },
  ui: { type: Object as PropType<ButtonProps["ui"]>, default: undefined },
};
