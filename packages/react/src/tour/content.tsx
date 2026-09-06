import type React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cva } from "class-variance-authority";
import { cn, tourDefaults, tourSizeData } from "@75neo/themes";
import { useTourVariants } from "./variants";

const tourContent = cva(
  "relative flex origin-(--transform-origin) flex-col rounded-xl bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: { size: tourSizeData.base },
    defaultVariants: tourDefaults,
  },
);

export interface TourContentProps extends React.ComponentProps<typeof Ark.Content> {
  children?: React.ReactNode;
}

export function TourContent({ className, children, ...rest }: TourContentProps) {
  const variants = useTourVariants();

  return (
    <Ark.Content
      {...rest}
      data-slot="tour-content"
      className={cn(tourContent(variants), className)}
    >
      {children}
    </Ark.Content>
  );
}
