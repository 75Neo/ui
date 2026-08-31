import type { ButtonSlots, ButtonVariants } from "@75neo/themes";
import type { ComponentContract, ThemeOverride } from "../types/theme";
import type { TVSlot } from "../types/tv";

export type ButtonUI = TVSlot<ButtonSlots>;

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

export type ButtonTheme = ThemeOverride<ButtonSlots, ButtonVariants>;

export const ButtonKey: unique symbol = Symbol("75neo.button");

declare global {
  interface Neo75ComponentThemes {
    [ButtonKey]: ComponentContract<ButtonSlots, ButtonVariants>;
  }
}
