import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cva } from "class-variance-authority";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourTitle = cva("font-semibold text-highlighted", {
  variants: { size: tourSizeData.title },
  defaultVariants: tourDefaults,
});

export interface TourTitleProps extends React.ComponentProps<typeof Ark.Title> {
  children?: React.ReactNode;
}

export function TourTitle({ className, children, ...rest }: TourTitleProps) {
  const variants = useTourVariants();

  return (
    <Ark.Title {...rest} data-slot="tour-title" className={cn(tourTitle(variants), className)}>
      {children}
    </Ark.Title>
  );
}
