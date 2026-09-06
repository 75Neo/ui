import type React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, floatingPanelDefaults, floatingPanelSizeData } from "@75neo/themes";
import { useFloatingPanelVariants } from "./variants";

const floatingPanelCloseTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  {
    variants: { size: floatingPanelSizeData.closeTrigger },
    defaultVariants: floatingPanelDefaults,
  },
);

export interface FloatingPanelCloseTriggerProps extends React.ComponentProps<
  typeof Ark.CloseTrigger
> {
  children?: React.ReactNode;
}

export function FloatingPanelCloseTrigger({
  className,
  children,
  ...rest
}: FloatingPanelCloseTriggerProps) {
  const variants = useFloatingPanelVariants();

  return (
    <Ark.CloseTrigger
      {...rest}
      aria-label="Close panel"
      data-slot="floating-panel-close-trigger"
      className={cn(floatingPanelCloseTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.CloseTrigger>
  );
}
