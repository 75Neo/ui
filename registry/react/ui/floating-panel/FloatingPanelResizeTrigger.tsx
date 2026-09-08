import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelResizeTriggerProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ResizeTrigger>,
  "children"
> {}

export default function FloatingPanelResizeTrigger({
  className,
  ...props
}: FloatingPanelResizeTriggerProps) {
  const styles = floatingPanel();

  return <Ark.ResizeTrigger className={cn(styles.resizeTrigger(), className)} {...props} />;
}
