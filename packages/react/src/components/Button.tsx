import { button, type ButtonVariants, type SlotClass } from "@75neo/styles";
import { useComponentUI } from "../hooks/useComponentUI";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import type React from "react";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, ButtonVariants {
  ui?: {
    base?: SlotClass;
    leadingIcon?: SlotClass;
    label?: SlotClass;
    trailingIcon?: SlotClass;
  };
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  loading?: boolean;
  loadingIcon?: React.ReactNode;
}

function Button({
  variant,
  size,
  color,
  compact,
  ui,
  className,
  leadingIcon,
  trailingIcon,
  loading = false,
  loadingIcon,
  disabled = false,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const tvSlots = useMemo(
    () =>
      button({
        variant,
        size,
        color,
        compact,
      }),
    [variant, size, color, compact],
  );

  const resolved = useComponentUI("button", tvSlots, ui);

  return (
    <button
      type={type}
      className={resolved.base({ className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      {...props}
    >
      {(leadingIcon || loading) && (
        <span className={resolved.leadingIcon()}>
          {loading ? (loadingIcon ?? <Loader2 className="animate-spin" />) : leadingIcon}
        </span>
      )}
      {children && <span className={resolved.label()}>{children}</span>}
      {trailingIcon && <span className={resolved.trailingIcon()}>{trailingIcon}</span>}
    </button>
  );
}

export { Button, type ButtonProps };
