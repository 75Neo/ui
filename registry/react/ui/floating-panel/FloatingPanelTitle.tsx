import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelTitleProps extends React.ComponentPropsWithRef<typeof Ark.Title> {}

export default function FloatingPanelTitle({
  className,
  children,
  ...props
}: FloatingPanelTitleProps) {
  const styles = floatingPanel();

  return (
    <Ark.Title className={cn(styles.title(), className)} {...props}>
      {children}
    </Ark.Title>
  );
}
