import type React from "react";
import { cva } from "class-variance-authority";
import { cn, errorColorData, errorDefaults } from "@75neo/themes";
import { useErrorVariants } from "./variants";

const errorStatusCode = cva("text-base font-semibold", {
  variants: { color: errorColorData.statusCode },
  defaultVariants: errorDefaults,
});

export interface ErrorStatusCodeProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function ErrorStatusCode({ className, children, ...rest }: ErrorStatusCodeProps) {
  const variants = useErrorVariants();

  return (
    <p {...rest} data-slot="error-status-code" className={cn(errorStatusCode(variants), className)}>
      {children}
    </p>
  );
}
