import type React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, popoverDefaults, popoverSizeData } from "@75neo/themes";
import { usePopoverVariants } from "./variants";

const popoverCloseTrigger = cva(
  "absolute inset-e-2 top-2 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  {
    variants: { size: popoverSizeData.closeTrigger },
    defaultVariants: popoverDefaults,
  },
);

export interface PopoverCloseTriggerProps extends React.ComponentProps<typeof Ark.CloseTrigger> {}

export function PopoverCloseTrigger({ className, children, ...rest }: PopoverCloseTriggerProps) {
  const variants = usePopoverVariants();

  return (
    <Ark.CloseTrigger
      {...rest}
      aria-label="Close popover"
      data-slot="popover-close-trigger"
      className={cn(popoverCloseTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.CloseTrigger>
  );
}
