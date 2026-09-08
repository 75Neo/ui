import React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cn } from "cn";
import { scrollAreaStyles as styles } from "@/registry/shared/lib/scroll-area.styles";

export interface ScrollAreaProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
