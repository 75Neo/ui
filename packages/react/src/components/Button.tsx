import type React from "react";
import { Loader2 } from "lucide-react";
import { button } from "@75neo/themes";
import { ButtonKey, type ButtonProps as ButtonContract } from "@75neo/core";
import { useComponentTheme } from "../hooks/useComponentTheme";

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonContract<React.ReactNode> {}

/**
 * Every themeable prop is destructured without a default on purpose: `undefined` is what tells
 * the resolver that the theme may fill the value in. Explicit props still win.
 */
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
  const theme = useComponentTheme(ButtonKey, ui);
  const defaults = theme.props;

  const isLoading = loading ?? defaults.loading ?? false;
  const isDisabled = (disabled ?? defaults.disabled ?? false) || isLoading;

  const tv = button({
    variant: variant ?? defaults.variant,
    size: size ?? defaults.size,
    color: color ?? defaults.color,
  });

  const showLeading = isLoading || (leading ?? defaults.leading ?? false) || leadingIcon != null;
  const showTrailing = (trailing ?? defaults.trailing ?? false) || trailingIcon != null;

  return (
    <button
      {...rest}
      type={type}
      data-slot="base"
      className={theme.class("base", tv.base({ class: className }))}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
    >
      {showLeading && (
        <span data-slot="leading" className={theme.class("leading", tv.leading())}>
          {isLoading ? (loadingIcon ?? <Loader2 className="animate-spin" />) : leadingIcon}
        </span>
      )}
      {children != null && (
        <span data-slot="label" className={theme.class("label", tv.label())}>
          {children}
        </span>
      )}
      {showTrailing && (
        <span data-slot="trailing" className={theme.class("trailing", tv.trailing())}>
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
