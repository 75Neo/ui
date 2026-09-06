import type React from "react";
import { cn } from "@75neo/themes";

export interface ErrorStatusMessageProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function ErrorStatusMessage({ className, children, ...rest }: ErrorStatusMessageProps) {
  return (
    <h1
      {...rest}
      data-slot="error-status-message"
      className={cn("mt-2 text-4xl font-bold text-balance text-highlighted sm:text-5xl", className)}
    >
      {children}
    </h1>
  );
}
