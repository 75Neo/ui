import React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cn } from "cn";
import { scrollAreaStyles as styles } from "@/registry/shared/lib/scroll-area.styles";

export interface ScrollAreaScrollbarProps extends React.ComponentPropsWithRef<
  typeof Ark.Scrollbar
> {}

export default function ScrollAreaScrollbar({
  className,
  children,
  ...props
}: ScrollAreaScrollbarProps) {
  return (
    <Ark.Scrollbar className={cn(styles.scrollbar(), className)} {...props}>
      {children}
    </Ark.Scrollbar>
  );
}
