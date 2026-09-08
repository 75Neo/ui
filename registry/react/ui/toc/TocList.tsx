import React from "react";
import { Toc as Ark } from "@ark-ui/react/toc";
import { cn } from "cn";
import { tocStyles as styles } from "@/registry/shared/lib/toc.styles";

export interface TocListProps extends React.ComponentPropsWithRef<typeof Ark.List> {}

export default function TocList({ className, children, ...props }: TocListProps) {
  return (
    <Ark.List className={cn(styles.list(), className)} {...props}>
      {children}
    </Ark.List>
  );
}
