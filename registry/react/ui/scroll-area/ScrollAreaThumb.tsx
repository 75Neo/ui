import React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cn } from "cn";
import { scrollAreaStyles as styles } from "@/registry/shared/lib/scroll-area.styles";

export interface ScrollAreaThumbProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Thumb>,
  "children"
> {}

export default function ScrollAreaThumb({ className, ...props }: ScrollAreaThumbProps) {
  return <Ark.Thumb className={cn(styles.thumb(), className)} {...props} />;
}
