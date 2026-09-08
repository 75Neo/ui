import React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cn } from "cn";
import { paginationStyles as styles } from "@/registry/shared/lib/pagination.styles";

export interface PaginationPrevTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.PrevTrigger
> {}

export default function PaginationPrevTrigger({
  className,
  children,
  ...props
}: PaginationPrevTriggerProps) {
  return (
    <Ark.PrevTrigger className={cn(styles.prevTrigger(), className)} {...props}>
      {children}
    </Ark.PrevTrigger>
  );
}
