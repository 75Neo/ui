import type React from "react";
import { RatingGroup as Ark } from "@ark-ui/react/rating-group";
import { cva } from "class-variance-authority";
import { cn, ratingGroupDefaults, ratingGroupSizeData } from "@75neo/themes";
import { useRatingGroupVariants } from "./variants";

const ratingGroupItem = cva(
  "relative inline-flex shrink-0 cursor-pointer text-muted transition-colors data-disabled:cursor-not-allowed",
  {
    variants: { size: ratingGroupSizeData.item },
    defaultVariants: ratingGroupDefaults,
  },
);

export interface RatingGroupItemProps extends React.ComponentProps<typeof Ark.Item> {
  /** Which star this is, from one. */
  index: number;
}

export function RatingGroupItem({ index, className, children, ...rest }: RatingGroupItemProps) {
  const variants = useRatingGroupVariants();

  return (
    <Ark.Item
      {...rest}
      index={index}
      data-slot="rating-group-item"
      className={cn(ratingGroupItem(variants), className)}
    >
      {children}
    </Ark.Item>
  );
}
