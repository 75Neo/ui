import { button, type ButtonVariants } from "@75neo/styles";
import { Loader2 } from "lucide-react";
import type React from "react";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, ButtonVariants {
  ui?: string;
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
  const {
    base,
    leadingIcon: leadingIconSlot,
    label,
    trailingIcon: trailingIconSlot,
  } = button({
    variant,
    size,
    color,
    compact,
  });

  return (
    <button
      type={type}
      className={base({ className: ui ?? className })}
      disabled={disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {(leadingIcon || loading) && (
        <span className={leadingIconSlot()}>
          {loading ? (loadingIcon ?? <Loader2 className="animate-spin" />) : leadingIcon}
        </span>
      )}
      {children && <span className={label()}>{children}</span>}
      {trailingIcon && <span className={trailingIconSlot()}>{trailingIcon}</span>}
    </button>
  );
}

export { Button, type ButtonProps };
