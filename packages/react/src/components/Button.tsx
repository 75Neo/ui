import type React from "react";
import { LoaderCircle } from "lucide-react";
import { type ButtonProps as ButtonContract, button, resolveButtonIcons } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Button.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name.
 */
export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonContract<React.ReactNode> {}

export function Button({
  ui,
  variant,
  size,
  color,
  block,
  square,
  disabled,
  loading,
  leading,
  trailing,
  leadingIcon,
  trailingIcon,
  loadingIcon,
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  const isLoading = Boolean(loading);
  const icons = resolveButtonIcons({
    loading: isLoading,
    leading,
    trailing,
    hasLeading: leadingIcon != null,
    hasTrailing: trailingIcon != null,
  });
  const theme = useResolvedTheme(
    button,
    "button",
    {
      ui,
      variant,
      size,
      color,
      block,
      // An icon with no label wants equal padding, which is worth not having to say.
      square: square ?? children == null,
      loading: isLoading,
      leading: icons.leading,
      trailing: icons.trailing,
    },
    className,
  );

  // The recipe puts `animate-spin` on whichever icon slot is showing, so the spinner
  // only has to be placed in the same one.
  const spinner = loadingIcon ?? <LoaderCircle />;

  return (
    <button
      {...rest}
      type={type}
      data-slot="base"
      className={theme.class.base}
      disabled={Boolean(disabled) || isLoading}
      aria-busy={isLoading || undefined}
    >
      {icons.leading && (
        <span data-slot="leadingIcon" className={theme.class.leadingIcon}>
          {isLoading ? spinner : leadingIcon}
        </span>
      )}
      {children != null && (
        <span data-slot="label" className={theme.class.label}>
          {children}
        </span>
      )}
      {icons.trailing && (
        <span data-slot="trailingIcon" className={theme.class.trailingIcon}>
          {isLoading && !icons.leading ? spinner : trailingIcon}
        </span>
      )}
    </button>
  );
}
