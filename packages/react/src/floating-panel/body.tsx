import type React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cva } from "class-variance-authority";
import { cn, floatingPanelDefaults, floatingPanelSizeData } from "@75neo/themes";
import { useFloatingPanelVariants } from "./variants";

const floatingPanelBody = cva("min-w-0 flex-1 overflow-auto text-toned", {
  variants: { size: floatingPanelSizeData.body },
  defaultVariants: floatingPanelDefaults,
});

export interface FloatingPanelBodyProps extends React.ComponentProps<typeof Ark.Body> {
  children?: React.ReactNode;
}

export function FloatingPanelBody({ className, children, ...rest }: FloatingPanelBodyProps) {
  const variants = useFloatingPanelVariants();

  return (
    <Ark.Body
      {...rest}
      data-slot="floating-panel-body"
      className={cn(floatingPanelBody(variants), className)}
    >
      {children}
    </Ark.Body>
  );
}
