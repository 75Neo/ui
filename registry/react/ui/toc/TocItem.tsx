import React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cn } from "cn";
import { tocStyles as styles } from "@/registry/shared/lib/toc.styles";

export interface TocItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function TocItem({ className, children, ...props }: TocItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
