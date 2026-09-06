import type React from "react";
import { cva } from "class-variance-authority";
import { cn, popoverDefaults, popoverSizeData } from "@75neo/themes";
import { usePopoverVariants } from "./variants";

const popoverBody = cva("min-w-0 text-toned", {
  variants: { size: popoverSizeData.body },
  defaultVariants: popoverDefaults,
});

export interface PopoverBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PopoverBody({ className, children, ...rest }: PopoverBodyProps) {
  const variants = usePopoverVariants();

  return (
    <div {...rest} data-slot="popover-body" className={cn(popoverBody(variants), className)}>
      {children}
    </div>
  );
}
