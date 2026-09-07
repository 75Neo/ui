import React from "react";
import { cn } from "cn";
import { button, type ButtonVariants } from "@components/shared/button.styles";

export interface ButtonProps
  extends Omit<React.ComponentPropsWithRef<"button">, "color">, ButtonVariants {
  /** Rendered before the label, wrapped in the leading icon slot. */
  leading?: React.ReactNode;
  /** Rendered after the label, wrapped in the trailing icon slot. */
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
  const { base, leadingIcon, trailingIcon } = button({ variant, color, size, disabled });

  return (
    <button className={cn(base(), className)} disabled={disabled} {...props}>
      {leading ? <span className={leadingIcon()}>{leading}</span> : null}
      {children}
      {trailing ? <span className={trailingIcon()}>{trailing}</span> : null}
    </button>
  );
}
