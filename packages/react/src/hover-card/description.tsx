import type React from "react";
import { cva } from "class-variance-authority";
import { cn, hoverCardDefaults, hoverCardSizeData } from "@75neo/themes";
import { useHoverCardVariants } from "./variants";

const hoverCardDescription = cva("text-muted", {
  variants: { size: hoverCardSizeData.description },
  defaultVariants: hoverCardDefaults,
});

export interface HoverCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function HoverCardDescription({ className, children, ...rest }: HoverCardDescriptionProps) {
  const variants = useHoverCardVariants();

  return (
    <p
      {...rest}
      data-slot="hover-card-description"
      className={cn(hoverCardDescription(variants), className)}
    >
      {children}
    </p>
  );
}
