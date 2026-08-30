import { useMemo } from "react";
import type React from "react";
import { Loader2 } from "lucide-react";
import { button, type ButtonVariants } from "@75neo/styles";
import { buttonKey, type ButtonUI } from "@75neo/core";
import { useComponentUI } from "../hooks/useComponentUI";
import { renderSlot, type Slot } from "../utils/renderSlot";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, ButtonVariants {
  ui?: ButtonUI;
  /** Mirrors Vue's `#leading` slot. */
  leading?: Slot;
  /** Mirrors Vue's `#trailing` slot. */
  trailing?: Slot;
  loading?: boolean;
  /** Mirrors Vue's `#loadingIcon` slot; replaces the default spinner. */
  loadingIcon?: Slot;
}

function Button({
  variant,
  size,
  color,
  compact,
  ui,
  className,
  leading,
  trailing,
  loading = false,
  loadingIcon,
  disabled = false,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const tvSlots = useMemo(
    () => button({ variant, size, color, compact }),
    [variant, size, color, compact],
  );

  const resolved = useComponentUI(buttonKey, tvSlots, ui);

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      data-slot="base"
      className={resolved.base({ className })}
      disabled={isDisabled}
      aria-busy={loading ? true : undefined}
      aria-disabled={isDisabled ? true : undefined}
      {...props}
    >
      {(leading != null || loading) && (
        <span data-slot="leading" className={resolved.leading()}>
          {loading
            ? renderSlot(loadingIcon, undefined, <Loader2 className="animate-spin" />)
            : renderSlot(leading)}
        </span>
      )}
      {children != null && (
        <span data-slot="label" className={resolved.label()}>
          {children}
        </span>
      )}
      {trailing != null && (
        <span data-slot="trailing" className={resolved.trailing()}>
          {renderSlot(trailing)}
        </span>
      )}
    </button>
  );
}

export { Button, type ButtonProps };
