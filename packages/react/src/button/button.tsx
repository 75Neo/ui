import type { ButtonSlots, ButtonVariants } from "@75neo/styles";
import { ark, type HTMLArkProps } from "@ark-ui/react/factory";
import { useComponentTheme } from "../theme";

export interface ButtonProps extends HTMLArkProps<"button">, ButtonVariants {
  /**
   * Per-slot class overrides. A button is one element, so `ui.base` and `className` do
   * the same thing — `ui` exists so every component in the library takes the same two
   * props, and so a global theme and a call site can both reach the slot by name.
   */
  ui?: ButtonSlots;
}

/**
 * Ark's polymorphic `button` (so `asChild` works) wearing the shared `button` theme.
 *
 * The three class sources are merged in ascending priority — theme, then `ui`, then
 * `className` — and `tailwind-merge` drops whichever loses each conflict, so a caller
 * passing `className="px-8"` replaces the size variant's padding without knowing it was
 * there.
 */
export const Button = ({
  variant,
  size,
  colorPalette,
  fullWidth,
  ui,
  className,
  ...rest
}: ButtonProps) => {
  const theme = useComponentTheme("button");
  const slots = theme({ variant, size, colorPalette, fullWidth });

  return <ark.button className={slots.base({ class: [ui?.base, className] })} {...rest} />;
};

Button.displayName = "Button";
