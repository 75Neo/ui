import React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cn } from "cn";
import { scrollArea } from "@/registry/shared/lib/scroll-area.styles";

export interface ScrollAreaViewportProps extends React.ComponentPropsWithRef<typeof Ark.Viewport> {}

export default function ScrollAreaViewport({
  className,
  children,
  ...props
}: ScrollAreaViewportProps) {
  const styles = scrollArea();

  return (
    <Ark.Viewport className={cn(styles.viewport(), className)} {...props}>
      {children}
    </Ark.Viewport>
  );
}
