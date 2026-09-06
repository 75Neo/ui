import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cva } from "class-variance-authority";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourDescription = cva("text-muted", {
  variants: { size: tourSizeData.description },
  defaultVariants: tourDefaults,
});

export interface TourDescriptionProps extends React.ComponentProps<typeof Ark.Description> {
  children?: React.ReactNode;
}

export function TourDescription({ className, children, ...rest }: TourDescriptionProps) {
  const variants = useTourVariants();

  return (
    <Ark.Description
      {...rest}
      data-slot="tour-description"
      className={cn(tourDescription(variants), className)}
    >
      {children}
    </Ark.Description>
  );
}
