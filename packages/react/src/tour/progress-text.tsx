import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cva } from "class-variance-authority";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourProgressText = cva("text-dimmed", {
  variants: { size: tourSizeData.progressText },
  defaultVariants: tourDefaults,
});

export interface TourProgressTextProps extends React.ComponentProps<typeof Ark.ProgressText> {
  children?: React.ReactNode;
}

export function TourProgressText({ className, children, ...rest }: TourProgressTextProps) {
  const variants = useTourVariants();

  return (
    <Ark.ProgressText
      {...rest}
      data-slot="tour-progress-text"
      className={cn(tourProgressText(variants), className)}
    >
      {children}
    </Ark.ProgressText>
  );
}
