import React from "react";
import { RatingGroup as Ark } from "@ark-ui/react/rating-group";
import { cn } from "cn";
import { ratingGroup, type Intent } from "@/registry/shared/lib/rating-group.styles";

export interface RatingGroupProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Root>,
  "color"
> {
  color?: Intent;
}

export default function RatingGroup({ color, className, children, ...props }: RatingGroupProps) {
  const styles = ratingGroup({ color });

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
