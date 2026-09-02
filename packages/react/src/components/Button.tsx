import type React from "react";
import { Loader2 } from "lucide-react";
import { type ButtonProps as ButtonContract, button, showButtonSlots } from "@75neo/themes";
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
  const theme = useResolvedTheme(button, "button", { ui, variant, size, color }, className);
  const show = showButtonSlots({
    loading: isLoading,
    leading,
    trailing,
    hasLeading: leadingIcon != null,
    hasTrailing: trailingIcon != null,
  });

  return (
    <button
      {...rest}
      type={type}
      data-slot="base"
      className={theme.class.base}
      disabled={Boolean(disabled) || isLoading}
      aria-busy={isLoading || undefined}
    >
      {show.leading && (
        <span data-slot="leading" className={theme.class.leading}>
          {isLoading ? (loadingIcon ?? <Loader2 className="animate-spin" />) : leadingIcon}
        </span>
      )}
      {children != null && (
        <span data-slot="label" className={theme.class.label}>
          {children}
        </span>
      )}
      {show.trailing && (
        <span data-slot="trailing" className={theme.class.trailing}>
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
