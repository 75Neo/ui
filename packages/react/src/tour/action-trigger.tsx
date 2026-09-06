import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cva } from "class-variance-authority";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourActionTrigger = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-elevated font-medium text-default outline-primary/25 transition-colors hover:bg-accented/75 focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-50 [&:last-child]:bg-inverted [&:last-child]:text-inverted [&:last-child]:hover:bg-inverted/90",
  {
    variants: { size: tourSizeData.actionTrigger },
    defaultVariants: tourDefaults,
  },
);

export interface TourActionTriggerProps extends React.ComponentProps<typeof Ark.ActionTrigger> {
  children?: React.ReactNode;
}

export function TourActionTrigger({
  action,
  className,
  children,
  ...rest
}: TourActionTriggerProps) {
  const variants = useTourVariants();

  return (
    <Ark.ActionTrigger
      {...rest}
      action={action}
      data-slot="tour-action-trigger"
      className={cn(tourActionTrigger(variants), className)}
    >
      {children}
    </Ark.ActionTrigger>
  );
}
