import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelStageTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.StageTrigger
> {}

export default function FloatingPanelStageTrigger({
  className,
  children,
  ...props
}: FloatingPanelStageTriggerProps) {
  return (
    <Ark.StageTrigger className={cn(styles.stageTrigger(), className)} {...props}>
      {children}
    </Ark.StageTrigger>
  );
}
