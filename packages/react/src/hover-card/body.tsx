import type React from "react";
import { cva } from "class-variance-authority";
import { cn, hoverCardDefaults, hoverCardSizeData } from "@75neo/themes";
import { useHoverCardVariants } from "./variants";

const hoverCardBody = cva("min-w-0 text-toned", {
  variants: { size: hoverCardSizeData.body },
  defaultVariants: hoverCardDefaults,
});

export interface HoverCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HoverCardBody({ className, children, ...rest }: HoverCardBodyProps) {
  const variants = useHoverCardVariants();

  return (
    <div {...rest} data-slot="hover-card-body" className={cn(hoverCardBody(variants), className)}>
      {children}
    </div>
  );
}
