import type React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cva } from "class-variance-authority";
import { cn, floatingPanelDefaults, floatingPanelSizeData } from "@75neo/themes";
import { useFloatingPanelVariants } from "./variants";

const floatingPanelHeader = cva(
  "flex cursor-grab items-center gap-2 border-b border-default active:cursor-grabbing",
  {
    variants: { size: floatingPanelSizeData.header },
    defaultVariants: floatingPanelDefaults,
  },
);

export interface FloatingPanelHeaderProps extends React.ComponentProps<typeof Ark.Header> {
  children?: React.ReactNode;
}

export function FloatingPanelHeader({ className, children, ...rest }: FloatingPanelHeaderProps) {
  const variants = useFloatingPanelVariants();

  return (
    <Ark.Header
      {...rest}
      data-slot="floating-panel-header"
      className={cn(floatingPanelHeader(variants), className)}
    >
      {children}
    </Ark.Header>
  );
}
