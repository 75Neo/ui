import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelStageTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.StageTrigger
> {}

export default function FloatingPanelStageTrigger({
  className,
  children,
  ...props
}: FloatingPanelStageTriggerProps) {
  const styles = floatingPanel();

  return (
    <Ark.StageTrigger className={cn(styles.stageTrigger(), className)} {...props}>
      {children}
    </Ark.StageTrigger>
  );
}
