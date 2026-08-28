import { button, type ButtonVariants } from "@75neo/styles";
import { Loader2 } from "lucide-react";
import type React from "react";

interface ButtonProps extends React.PropsWithChildren<ButtonVariants> {
  ui?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  loading?: boolean;
  loadingIcon?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

function Button({
  variant,
  size,
  color,
  compact,
  ui,
  leadingIcon,
  trailingIcon,
  loading = false,
  loadingIcon,
  disabled = false,
  type = "button",
  children,
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
      className={base({ className: ui })}
      disabled={disabled}
      aria-busy={loading || undefined}
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
