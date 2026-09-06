import type React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cva } from "class-variance-authority";
import { cn, floatingPanelDefaults, floatingPanelSizeData } from "@75neo/themes";
import { useFloatingPanelVariants } from "./variants";

const floatingPanelTitle = cva(
  "flex min-w-0 flex-1 items-center gap-2 font-semibold text-highlighted [&>svg]:shrink-0",
  {
    variants: { size: floatingPanelSizeData.title },
    defaultVariants: floatingPanelDefaults,
  },
);

export interface FloatingPanelTitleProps extends React.ComponentProps<typeof Ark.Title> {
  children?: React.ReactNode;
}

export function FloatingPanelTitle({ className, children, ...rest }: FloatingPanelTitleProps) {
  const variants = useFloatingPanelVariants();

  return (
    <Ark.Title
      {...rest}
      data-slot="floating-panel-title"
      className={cn(floatingPanelTitle(variants), className)}
    >
      {children}
    </Ark.Title>
  );
}
