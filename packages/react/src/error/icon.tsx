import type React from "react";
import { cva } from "class-variance-authority";
import { cn, errorColorData, errorDefaults } from "@75neo/themes";
import { useErrorVariants } from "./variants";

const errorIcon = cva("size-10 shrink-0 [&>svg]:size-full", {
  variants: { color: errorColorData.icon },
  defaultVariants: errorDefaults,
});

export interface ErrorIconProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function ErrorIcon({ className, children, ...rest }: ErrorIconProps) {
  const variants = useErrorVariants();

  return (
    <div data-slot="error-leading" className="mb-4 flex items-center justify-center">
      <span {...rest} data-slot="error-icon" className={cn(errorIcon(variants), className)}>
        {children}
      </span>
    </div>
  );
}
