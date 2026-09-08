import React from "react";
import { ScrollArea as Ark } from "@ark-ui/react/scroll-area";
import { cn } from "cn";
import { scrollAreaStyles as styles } from "@/registry/shared/lib/scroll-area.styles";

export interface ScrollAreaContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function ScrollAreaContent({
  className,
  children,
  ...props
}: ScrollAreaContentProps) {
  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
