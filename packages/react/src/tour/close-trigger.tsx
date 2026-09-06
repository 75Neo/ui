import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourCloseTrigger = cva(
  "absolute inset-e-2 top-2 inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-dimmed outline-primary/25 transition-colors hover:bg-elevated hover:text-default focus-visible:outline-3 [&>svg]:size-full",
  {
    variants: { size: tourSizeData.closeTrigger },
    defaultVariants: tourDefaults,
  },
);

export interface TourCloseTriggerProps extends React.ComponentProps<typeof Ark.CloseTrigger> {
  children?: React.ReactNode;
}

export function TourCloseTrigger({ className, children, ...rest }: TourCloseTriggerProps) {
  const variants = useTourVariants();

  return (
    <Ark.CloseTrigger
      {...rest}
      aria-label="Close tour"
      data-slot="tour-close-trigger"
      className={cn(tourCloseTrigger(variants), className)}
    >
      {children ?? <X />}
    </Ark.CloseTrigger>
  );
}
