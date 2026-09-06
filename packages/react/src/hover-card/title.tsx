import type React from "react";
import { cva } from "class-variance-authority";
import { cn, hoverCardDefaults, hoverCardSizeData } from "@75neo/themes";
import { useHoverCardVariants } from "./variants";

const hoverCardTitle = cva("font-semibold text-highlighted", {
  variants: { size: hoverCardSizeData.title },
  defaultVariants: hoverCardDefaults,
});

export interface HoverCardTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HoverCardTitle({ className, children, ...rest }: HoverCardTitleProps) {
  const variants = useHoverCardVariants();

  return (
    <div {...rest} data-slot="hover-card-title" className={cn(hoverCardTitle(variants), className)}>
      {children}
    </div>
  );
}
