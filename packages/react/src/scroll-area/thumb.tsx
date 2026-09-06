import type React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cn } from "@75neo/themes";

export interface ScrollAreaThumbProps extends React.ComponentProps<typeof Ark.Thumb> {}

export function ScrollAreaThumb({ className, ...rest }: ScrollAreaThumbProps) {
  return (
    <Ark.Thumb
      {...rest}
      data-slot="scroll-area-thumb"
      className={cn(
        "relative flex-1 rounded-full bg-accented transition-colors hover:bg-inverted/30 data-dragging:bg-inverted/40",
        className,
      )}
    />
  );
}
