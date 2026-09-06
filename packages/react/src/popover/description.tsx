import type React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cva } from "class-variance-authority";
import { cn, popoverDefaults, popoverSizeData } from "@75neo/themes";
import { usePopoverVariants } from "./variants";

const popoverDescription = cva("text-muted", {
  variants: {
    size: popoverSizeData.description,
    close: { true: "pe-6", false: "" },
  },
  defaultVariants: popoverDefaults,
});

export interface PopoverDescriptionProps extends React.ComponentProps<typeof Ark.Description> {}

export function PopoverDescription({ className, children, ...rest }: PopoverDescriptionProps) {
  const variants = usePopoverVariants();

  return (
    <Ark.Description
      {...rest}
      data-slot="popover-description"
      className={cn(popoverDescription(variants), className)}
    >
      {children}
    </Ark.Description>
  );
}
