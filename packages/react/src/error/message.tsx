import type React from "react";
import { cn } from "@75neo/themes";

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ className, children, ...rest }: ErrorMessageProps) {
  return (
    <p
      {...rest}
      data-slot="error-message"
      className={cn("mt-4 text-lg text-pretty text-muted", className)}
    >
      {children}
    </p>
  );
}
