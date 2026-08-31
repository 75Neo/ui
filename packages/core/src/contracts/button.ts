import type { ButtonVariants } from "@75neo/themes";

export interface ButtonProps<F> extends ButtonVariants {
  disabled?: boolean;
  loading?: boolean;
  loadingIcon?: F;
  leading?: boolean;
  trailing?: boolean;
  leadingIcon?: F;
  trailingIcon?: F;
}

export const ButtonKey = Symbol("button");
