import React from "react";
import { RatingGroup as Ark } from "@ark-ui/react/rating-group";
import { cn } from "cn";
import { ratingGroup } from "@/registry/shared/lib/rating-group.styles";

export interface RatingGroupControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function RatingGroupControl({
  className,
  children,
  ...props
}: RatingGroupControlProps) {
  const styles = ratingGroup();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
