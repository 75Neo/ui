import React from "react";
import { Tour as Ark } from "@ark-ui/react/tour";
import { cn } from "cn";
import { tour } from "@/registry/shared/lib/tour.styles";

export interface TourContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function TourContent({ className, children, ...props }: TourContentProps) {
  const styles = tour();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
