import type React from "react";
import { Loader2 } from "lucide-react";
import { button } from "@75neo/themes";
import type { ButtonProps as ButtonContract } from "@75neo/themes";
import { useComponentTheme } from "../hooks/useComponentTheme";

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
  const theme = useComponentTheme("button", ui);
  const defaults = theme.props ?? {};
  const slots = theme.ui;

  const isLoading = loading ?? false;
  const isDisabled = (disabled ?? false) || isLoading;

  const tv = button({
    variant: variant ?? defaults.variant,
    size: size ?? defaults.size,
    color: color ?? defaults.color,
  });

  const showLeading = isLoading || (leading ?? false) || leadingIcon != null;
  const showTrailing = (trailing ?? false) || trailingIcon != null;

  return (
    <button
      {...rest}
      type={type}
      data-slot="base"
      className={tv.base({ class: [className, slots?.base] })}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
    >
      {showLeading && (
        <span data-slot="leading" className={tv.leading({ class: slots?.leading })}>
          {isLoading ? (loadingIcon ?? <Loader2 className="animate-spin" />) : leadingIcon}
        </span>
      )}
      {children != null && (
        <span data-slot="label" className={tv.label({ class: slots?.label })}>
          {children}
        </span>
      )}
      {showTrailing && (
        <span data-slot="trailing" className={tv.trailing({ class: slots?.trailing })}>
          {trailingIcon}
        </span>
      )}
    </button>
  );
}
