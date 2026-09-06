import type React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cn } from "@75neo/themes";

export interface ScrollAreaContentProps extends React.ComponentProps<typeof Ark.Content> {}

export function ScrollAreaContent({ className, children, ...rest }: ScrollAreaContentProps) {
  return (
    <Ark.Content {...rest} data-slot="scroll-area-content" className={cn("min-w-0", className)}>
      {children}
    </Ark.Content>
  );
}
