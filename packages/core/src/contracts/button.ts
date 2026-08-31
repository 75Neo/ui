import type { ButtonSlots, ButtonVariants } from "@75neo/themes";
import type { ComponentContract, ThemeOverride } from "../types/theme";
import type { TVSlot } from "../types/tv";

/** Class overrides accepted by Button's `ui` prop and by `[ButtonKey].ui` in a theme. */
export type ButtonUI = TVSlot<ButtonSlots>;

/**
 * Button's contract. `F` is the framework's node/component type for the icon props, which is
 * the only part of the contract that cannot be spelled framework-agnostically.
 */
export interface ButtonProps<F> {
  ui?: ButtonUI;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  color?: ButtonVariants["color"];
  disabled?: boolean;
  loading?: boolean;
  loadingIcon?: F;
  leading?: boolean;
  trailing?: boolean;
  leadingIcon?: F;
  trailingIcon?: F;
}

/** The props a theme may default. Icons are excluded: they are framework-specific values. */
export type ButtonThemeProps = Omit<
  ButtonProps<never>,
  "ui" | "loadingIcon" | "leadingIcon" | "trailingIcon"
>;

/** A theme entry for Button, should you want to name the type on its own. */
export type ButtonTheme = ThemeOverride<ButtonSlots, ButtonThemeProps>;

/** Button's theme identity. */
export const ButtonKey: unique symbol = Symbol("75neo.button");

// Button registers its own contract. Nothing in core imports Button to make this happen.
declare global {
  interface Neo75ComponentThemes {
    [ButtonKey]: ComponentContract<ButtonSlots, ButtonThemeProps>;
  }
}
