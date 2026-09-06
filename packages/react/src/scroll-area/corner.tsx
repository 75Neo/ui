import type React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cva } from "class-variance-authority";
import { cn, scrollAreaDefaults, scrollAreaSizeData } from "@75neo/themes";
import { useScrollAreaVariants } from "./variants";

const scrollAreaCorner = cva("absolute right-1 bottom-1 rounded-full", {
  variants: { size: scrollAreaSizeData.corner },
  defaultVariants: scrollAreaDefaults,
});

export interface ScrollAreaCornerProps extends React.ComponentProps<typeof Ark.Corner> {}

export function ScrollAreaCorner({ className, ...rest }: ScrollAreaCornerProps) {
  const variants = useScrollAreaVariants();

  return (
    <Ark.Corner
      {...rest}
      data-slot="scroll-area-corner"
      className={cn(scrollAreaCorner(variants), className)}
    />
  );
}
