import type React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cn } from "@75neo/themes";

export interface ScrollAreaViewportProps extends React.ComponentProps<typeof Ark.Viewport> {}

export function ScrollAreaViewport({ className, children, ...rest }: ScrollAreaViewportProps) {
  return (
    <Ark.Viewport
      {...rest}
      data-slot="scroll-area-viewport"
      className={cn(
        "size-full scrollbar-none overflow-auto outline-primary/25 focus-visible:outline-3 [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </Ark.Viewport>
  );
}
