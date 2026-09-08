import React from "react";
import { RatingGroup as Ark } from "@ark-ui/react/rating-group";
import { cn } from "cn";
import { ratingGroupStyles as styles } from "@/registry/shared/lib/rating-group.styles";

export interface RatingGroupItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function RatingGroupItem({ className, children, ...props }: RatingGroupItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
