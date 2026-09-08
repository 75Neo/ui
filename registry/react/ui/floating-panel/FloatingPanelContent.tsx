import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelContentProps extends React.ComponentPropsWithRef<
  typeof Ark.Content
> {}

export default function FloatingPanelContent({
  className,
  children,
  ...props
}: FloatingPanelContentProps) {
  const styles = floatingPanel();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
