import React from "react";
import { cn } from "cn";
import { button, type ButtonVariants } from "@/registry/shared/lib/button.styles";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithRef<"button">, "color">, ButtonVariants {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export default function Button({
  variant,
  color,
  size,
  disabled,
  leading,
  trailing,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = button({ variant, color, size, disabled });

  return (
    <button className={cn(styles.base(), className)} disabled={disabled} {...props}>
      {leading ? <span className={styles.leading()}>{leading}</span> : null}
      {children}
      {trailing ? <span className={styles.trailing()}>{trailing}</span> : null}
    </button>
  );
}
