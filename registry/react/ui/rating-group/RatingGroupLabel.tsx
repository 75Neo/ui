import React from "react";
import { RatingGroup as Ark } from "@ark-ui/react/rating-group";
import { cn } from "cn";
import { ratingGroup } from "@/registry/shared/lib/rating-group.styles";

export interface RatingGroupLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function RatingGroupLabel({ className, children, ...props }: RatingGroupLabelProps) {
  const styles = ratingGroup();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
