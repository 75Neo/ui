import React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "cn";
import { button, type ButtonVariants } from "@/registry/shared/lib/button.styles";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithRef<"button">, "color">, ButtonVariants {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  loading?: boolean;
}

export default function Button({
  variant,
  color,
  size,
  block,
  square,
  disabled,
  loading,
  leading,
  trailing,
  className,
  children,
  ...props
}: ButtonProps) {
  const inactive = disabled || loading;
  const styles = button({ variant, color, size, block, square, disabled: inactive });

  return (
    <button
      className={cn(styles.base(), className)}
      disabled={inactive}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <LoaderCircle className={styles.spinner()} aria-hidden="true" />
      ) : leading ? (
        <span className={styles.leading()}>{leading}</span>
      ) : null}

      {children}

      {trailing ? <span className={styles.trailing()}>{trailing}</span> : null}
    </button>
  );
}
