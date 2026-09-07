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
  const { base, leadingIcon, trailingIcon } = button({ variant, color, size, disabled });

  return (
    <button className={cn(base(), className)} disabled={disabled} {...props}>
      {leading ? <span className={leadingIcon()}>{leading}</span> : null}
      {children}
      {trailing ? <span className={trailingIcon()}>{trailing}</span> : null}
    </button>
  );
}
