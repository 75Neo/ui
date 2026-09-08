import React from "react";
import { Pagination as Ark } from "@ark-ui/react/pagination";
import { cn } from "cn";
import { paginationStyles as styles } from "@/registry/shared/lib/pagination.styles";

export interface PaginationNextTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.NextTrigger
> {}

export default function PaginationNextTrigger({
  className,
  children,
  ...props
}: PaginationNextTriggerProps) {
  return (
    <Ark.NextTrigger className={cn(styles.nextTrigger(), className)} {...props}>
      {children}
    </Ark.NextTrigger>
  );
}
