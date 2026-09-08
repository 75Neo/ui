import React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cn } from "cn";
import { scrollArea } from "@/registry/shared/lib/scroll-area.styles";

export interface ScrollAreaCornerProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Corner>,
  "children"
> {}

export default function ScrollAreaCorner({ className, ...props }: ScrollAreaCornerProps) {
  const styles = scrollArea();

  return <Ark.Corner className={cn(styles.corner(), className)} {...props} />;
}
