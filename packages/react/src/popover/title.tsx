import type React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cva } from "class-variance-authority";
import { cn, popoverDefaults, popoverSizeData } from "@75neo/themes";
import { usePopoverVariants } from "./variants";

const popoverTitle = cva("font-semibold text-highlighted", {
  variants: {
    size: popoverSizeData.title,
    close: { true: "pe-6", false: "" },
  },
  defaultVariants: popoverDefaults,
});

export interface PopoverTitleProps extends React.ComponentProps<typeof Ark.Title> {}

export function PopoverTitle({ className, children, ...rest }: PopoverTitleProps) {
  const variants = usePopoverVariants();

  return (
    <Ark.Title
      {...rest}
      data-slot="popover-title"
      className={cn(popoverTitle(variants), className)}
    >
      {children}
    </Ark.Title>
  );
}
