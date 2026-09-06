import type React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cva } from "class-variance-authority";
import {
  cn,
  scrollAreaDefaults,
  scrollAreaSizeData,
  type ScrollAreaScrollbarProps as ScrollAreaScrollbarContract,
} from "@75neo/themes";
import { useScrollAreaVariants } from "./variants";
import { ScrollAreaThumb } from "./thumb";

const scrollAreaScrollbar = cva(
  "absolute touch-none rounded-full opacity-0 transition-opacity duration-150 select-none group-focus-within/scroll-area:opacity-100 group-hover/scroll-area:opacity-100 data-scrolling:opacity-100 data-[orientation=horizontal]:inset-x-2 data-[orientation=horizontal]:bottom-1 data-[orientation=horizontal]:flex-row data-[orientation=vertical]:inset-y-2 data-[orientation=vertical]:right-1 data-[orientation=vertical]:flex-col",
  {
    variants: { size: scrollAreaSizeData.scrollbar },
    defaultVariants: scrollAreaDefaults,
  },
);

export interface ScrollAreaScrollbarProps
  extends
    Omit<React.ComponentProps<typeof Ark.Scrollbar>, "orientation">,
    ScrollAreaScrollbarContract {}

export function ScrollAreaScrollbar({
  orientation,
  className,
  children,
  ...rest
}: ScrollAreaScrollbarProps) {
  const variants = useScrollAreaVariants();

  return (
    <Ark.Scrollbar
      {...rest}
      orientation={orientation}
      data-slot="scroll-area-scrollbar"
      className={cn(scrollAreaScrollbar(variants), className)}
    >
      {children ?? <ScrollAreaThumb />}
    </Ark.Scrollbar>
  );
}
