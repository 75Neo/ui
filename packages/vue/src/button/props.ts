import type { ButtonSlots, ButtonVariants } from "@75neo/styles";
import type { Component, PropType } from "vue";

export type ButtonProps = ButtonVariants & {
  /** The button's text. Ignored when the default slot is filled. */
  label?: string;
  /** Shown on whichever side `leading`/`trailing` selects — leading by default. */
  icon?: Component;
  /** Forces `icon` to the leading side. */
  leading?: boolean;
  /** Shown before the label, whatever `icon` is doing. */
  leadingIcon?: Component;
  /** Forces `icon` to the trailing side. */
  trailing?: boolean;
  /** Shown after the label, whatever `icon` is doing. */
  trailingIcon?: Component;
  /** Replaces whichever icon is showing with a spinner, and disables the button. */
  loading?: boolean;
  /** The spinner. Defaults to Lucide's `loader-circle`. */
  loadingIcon?: Component;
  /**
   * Per-slot class overrides — `{ label: "font-bold" }`. Merged over the theme and
   * under `class`, which reaches the root element.
   */
  ui?: ButtonSlots;
};

/**
 * Declared as a runtime props object rather than through `defineProps<ButtonProps>()`.
 * `ButtonVariants` is `VariantProps<typeof button>`, a mapped type the SFC compiler
 * cannot reduce to a list of prop names — a type-only declaration would compile to a
 * component with no props at all, and every variant would arrive as an attribute.
 *
 * Every boolean here is `default: undefined` rather than Vue's implicit `false`, because
 * the theme and the icon-side logic both distinguish "not set" from "off": `trailing:
 * false` pins an icon to the leading side, whereas an absent `trailing` lets a
 * `trailingIcon` place itself.
 */
export const buttonProps = {
  label: { type: String, default: undefined },
  icon: { type: [Object, Function] as PropType<Component>, default: undefined },
  leading: { type: Boolean, default: undefined },
  leadingIcon: { type: [Object, Function] as PropType<Component>, default: undefined },
  trailing: { type: Boolean, default: undefined },
  trailingIcon: { type: [Object, Function] as PropType<Component>, default: undefined },
  loading: { type: Boolean, default: undefined },
  loadingIcon: { type: [Object, Function] as PropType<Component>, default: undefined },
  color: { type: String as PropType<ButtonProps["color"]>, default: undefined },
  variant: { type: String as PropType<ButtonProps["variant"]>, default: undefined },
  size: { type: String as PropType<ButtonProps["size"]>, default: undefined },
  block: { type: Boolean as PropType<ButtonProps["block"]>, default: undefined },
  square: { type: Boolean as PropType<ButtonProps["square"]>, default: undefined },
  disabled: { type: Boolean, default: undefined },
  ui: { type: Object as PropType<ButtonProps["ui"]>, default: undefined },
};
