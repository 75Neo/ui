import type React from "react";
import { cn } from "@75neo/themes";

export interface ErrorLinksProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ErrorLinks({ className, children, ...rest }: ErrorLinksProps) {
  return (
    <div
      {...rest}
      data-slot="error-links"
      className={cn("mt-8 flex flex-wrap items-center justify-center gap-3", className)}
    >
      {children}
    </div>
  );
}
