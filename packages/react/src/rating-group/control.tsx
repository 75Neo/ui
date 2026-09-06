import type React from "react";
import { RatingGroup as Ark } from "@ark-ui/react/rating-group";
import { cva } from "class-variance-authority";
import { cn, ratingGroupDefaults, ratingGroupSizeData } from "@75neo/themes";
import { useRatingGroupVariants } from "./variants";

const ratingGroupControl = cva(
  "flex items-center data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: { size: ratingGroupSizeData.control },
    defaultVariants: ratingGroupDefaults,
  },
);

export interface RatingGroupControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function RatingGroupControl({ className, children, ...rest }: RatingGroupControlProps) {
  const variants = useRatingGroupVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="rating-group-control"
      className={cn(ratingGroupControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
