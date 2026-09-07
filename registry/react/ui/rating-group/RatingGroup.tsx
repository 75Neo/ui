import React from "react";
import { RatingGroup as Ark } from "@ark-ui/react/rating-group";
import { cn } from "cn";
import { ratingGroup } from "@/registry/shared/lib/rating-group.styles";

export interface RatingGroupProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function RatingGroup({ className, children, ...props }: RatingGroupProps) {
  const styles = ratingGroup();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
