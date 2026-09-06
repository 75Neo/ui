import type React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cva } from "class-variance-authority";
import { Minus } from "lucide-react";
import { cn, floatingPanelDefaults, floatingPanelSizeData } from "@75neo/themes";
import { useFloatingPanelVariants } from "./variants";

const floatingPanelStageTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  {
    variants: { size: floatingPanelSizeData.stageTrigger },
    defaultVariants: floatingPanelDefaults,
  },
);

export interface FloatingPanelStageTriggerProps extends React.ComponentProps<
  typeof Ark.StageTrigger
> {
  children?: React.ReactNode;
}

export function FloatingPanelStageTrigger({
  stage,
  className,
  children,
  ...rest
}: FloatingPanelStageTriggerProps) {
  const variants = useFloatingPanelVariants();

  return (
    <Ark.StageTrigger
      {...rest}
      stage={stage}
      data-slot="floating-panel-stage-trigger"
      data-stage={stage}
      className={cn(floatingPanelStageTrigger(variants), className)}
    >
      {children ?? <Minus />}
    </Ark.StageTrigger>
  );
}
